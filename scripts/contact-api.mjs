const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_REQUEST_BYTES = MAX_FILE_BYTES + 512 * 1024;

const fieldLimits = {
  name: 120,
  contact: 200,
  intent: 120,
  message: 3000
};

class ContactApiError extends Error {
  constructor(statusCode, publicMessage) {
    super(publicMessage);
    this.statusCode = statusCode;
    this.publicMessage = publicMessage;
  }
}

class IntegrationApiError extends Error {
  constructor(operation, statusCode, description) {
    const details = [
      `AI integration ${operation} failed`,
      statusCode ? `HTTP ${statusCode}` : null,
      description || null
    ].filter(Boolean);
    super(details.join(': '));
  }
}

function getRequiredString(formData, fieldName) {
  const value = formData.get(fieldName);
  const normalized = typeof value === 'string' ? value.trim() : '';

  if (!normalized) {
    throw new ContactApiError(400, 'Заполните все обязательные поля.');
  }

  if (normalized.length > fieldLimits[fieldName]) {
    throw new ContactApiError(400, 'Одно из полей превышает допустимую длину.');
  }

  return normalized;
}

function normalizeAttachment(value) {
  if (!value || typeof value === 'string' || typeof value.arrayBuffer !== 'function') return null;
  if (value.size === 0 && !value.name) return null;

  if (value.size > MAX_FILE_BYTES) {
    throw new ContactApiError(413, 'Файл должен быть не больше 10 МБ.');
  }

  return value;
}

export function parseContactForm(formData) {
  return {
    name: getRequiredString(formData, 'name'),
    contact: getRequiredString(formData, 'contact'),
    intent: getRequiredString(formData, 'intent'),
    message: getRequiredString(formData, 'message'),
    attachment: normalizeAttachment(formData.get('attachment')),
    website: typeof formData.get('website') === 'string' ? formData.get('website').trim() : ''
  };
}

export function createContactMessage(submission) {
  const attachmentLine = submission.attachment
    ? `${submission.attachment.name || 'без имени'} (${formatFileSize(submission.attachment.size)})`
    : 'нет';

  return [
    'Новая заявка с сайта «Суздальская IT Долина»',
    '',
    `Имя: ${submission.name}`,
    `Контакт: ${submission.contact}`,
    `Я хочу: ${submission.intent}`,
    `Сообщение: ${submission.message}`,
    `Файл: ${attachmentLine}`
  ].join('\n');
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

function getDeliveryConfig(env) {
  const token = env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = env.TELEGRAM_CHAT_ID?.trim();
  const integrationBaseUrl = env.AI_INTEGRATION_BASE_URL?.trim().replace(/\/+$/, '');
  const integrationApiKey = env.AI_INTEGRATION_API_KEY?.trim();
  const socialPostsPath = env.AI_INTEGRATION_SOCIAL_POSTS_PATH?.trim() || '/api/social/posts';

  if (!token || !chatId || !integrationBaseUrl || !integrationApiKey) {
    throw new ContactApiError(503, 'Форма временно недоступна. Попробуйте позже.');
  }

  return {
    token,
    chatId,
    integrationApiKey,
    integrationUrl: `${integrationBaseUrl}${socialPostsPath.startsWith('/') ? '' : '/'}${socialPostsPath}`
  };
}

async function callIntegration(operation, payload, config, fetchImpl) {
  let response;
  try {
    response = await fetchImpl(config.integrationUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-API-Key': config.integrationApiKey
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    const cause = error instanceof Error && error.cause instanceof Error ? `: ${error.cause.message}` : '';
    throw new IntegrationApiError(
      operation,
      null,
      `${error instanceof Error ? error.message : 'network error'}${cause}`
    );
  }

  const responsePayload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new IntegrationApiError(
      operation,
      response.status,
      responsePayload?.message || responsePayload?.error || 'invalid response'
    );
  }

  if (responsePayload?.status?.toLowerCase() !== 'success') {
    throw new IntegrationApiError(
      operation,
      response.status,
      responsePayload?.errorMessage || 'publication failed'
    );
  }

  return responsePayload;
}

export async function sendContactToTelegram(submission, options = {}) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const config = getDeliveryConfig(options.env ?? process.env);
  const credentials = {
    botToken: config.token,
    chatId: config.chatId
  };

  await callIntegration(
    'text publication',
    {
      userId: 'suzdal-it-valley-contact',
      platform: 'telegram',
      text: createContactMessage(submission),
      credentials,
      options: {
        disableWebPagePreview: true
      }
    },
    config,
    fetchImpl
  );

  if (submission.attachment) {
    const attachmentBytes = Buffer.from(await submission.attachment.arrayBuffer());
    await callIntegration(
      'document publication',
      {
        userId: 'suzdal-it-valley-contact',
        platform: 'telegram',
        text: '',
        credentials,
        attachments: [
          {
            type: 'document',
            fileName: submission.attachment.name || 'attachment',
            contentType: submission.attachment.type || 'application/octet-stream',
            base64: attachmentBytes.toString('base64')
          }
        ]
      },
      config,
      fetchImpl
    );
  }
}

async function readRequestBody(request) {
  const declaredLength = Number(request.headers['content-length'] || 0);
  if (declaredLength > MAX_REQUEST_BYTES) {
    throw new ContactApiError(413, 'Размер заявки превышает допустимый лимит.');
  }

  const chunks = [];
  let receivedBytes = 0;

  for await (const chunk of request) {
    receivedBytes += chunk.length;
    if (receivedBytes > MAX_REQUEST_BYTES) {
      throw new ContactApiError(413, 'Размер заявки превышает допустимый лимит.');
    }
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

export async function handleContactRequest(request, response, options = {}) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    sendJson(response, 405, { message: 'Метод не поддерживается.' });
    return;
  }

  try {
    const contentType = request.headers['content-type'] || '';
    if (!contentType.startsWith('multipart/form-data;')) {
      throw new ContactApiError(415, 'Ожидаются данные формы.');
    }

    const requestBody = await readRequestBody(request);
    const webRequest = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': contentType },
      body: requestBody
    });
    const submission = parseContactForm(await webRequest.formData());

    if (submission.website) {
      sendJson(response, 200, { ok: true });
      return;
    }

    await sendContactToTelegram(submission, options);
    sendJson(response, 200, { ok: true });
  } catch (error) {
    if (error instanceof ContactApiError) {
      sendJson(response, error.statusCode, { message: error.publicMessage });
      return;
    }

    console.error('Contact form delivery failed:', error instanceof Error ? error.message : 'unknown error');
    sendJson(response, 502, { message: 'Не удалось отправить заявку. Попробуйте позже.' });
  }
}
