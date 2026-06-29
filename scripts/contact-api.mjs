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

class TelegramApiError extends Error {
  constructor(method, statusCode, errorCode, description) {
    const details = [
      `Telegram ${method} failed`,
      statusCode ? `HTTP ${statusCode}` : null,
      errorCode ? `error ${errorCode}` : null,
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

function getTelegramConfig(env) {
  const token = env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = env.TELEGRAM_CHAT_ID?.trim();
  const rawThreadId = env.TELEGRAM_MESSAGE_THREAD_ID?.trim();

  if (!token || !chatId) {
    throw new ContactApiError(503, 'Форма временно недоступна. Попробуйте позже.');
  }

  const threadId = rawThreadId ? Number(rawThreadId) : undefined;
  if (threadId !== undefined && (!Number.isSafeInteger(threadId) || threadId <= 0)) {
    throw new ContactApiError(503, 'Форма временно недоступна. Попробуйте позже.');
  }

  return { token, chatId, threadId };
}

async function callTelegram(method, token, requestOptions, fetchImpl) {
  let response;
  try {
    response = await fetchImpl(`https://api.telegram.org/bot${token}/${method}`, requestOptions);
  } catch (error) {
    throw new TelegramApiError(method, null, null, error instanceof Error ? error.message : 'network error');
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.ok !== true) {
    throw new TelegramApiError(method, response.status, payload?.error_code, payload?.description || 'invalid response');
  }

  return payload.result;
}

export async function sendContactToTelegram(submission, options = {}) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const { token, chatId, threadId } = getTelegramConfig(options.env ?? process.env);
  const threadFields = threadId ? { message_thread_id: threadId } : {};

  await callTelegram(
    'sendMessage',
    token,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: createContactMessage(submission),
        ...threadFields
      })
    },
    fetchImpl
  );

  if (submission.attachment) {
    const documentData = new FormData();
    documentData.set('chat_id', chatId);
    if (threadId) documentData.set('message_thread_id', String(threadId));
    documentData.set('document', submission.attachment, submission.attachment.name || 'attachment');

    await callTelegram(
      'sendDocument',
      token,
      {
        method: 'POST',
        body: documentData
      },
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
