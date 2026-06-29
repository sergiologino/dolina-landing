// @vitest-environment node

import { describe, expect, it, vi } from 'vitest';
import { createContactMessage, parseContactForm, sendContactToTelegram } from './contact-api.mjs';

function createSubmissionForm({ withAttachment = false } = {}) {
  const formData = new FormData();
  formData.set('name', 'Иван Петров');
  formData.set('contact', '@ivan');
  formData.set('intent', 'предложить проект');
  formData.set('message', 'Разрабатываю автономную теплицу.');
  formData.set('website', '');
  if (withAttachment) {
    formData.set('attachment', new File(['project'], 'project.txt', { type: 'text/plain' }));
  }
  return formData;
}

describe('contact Telegram delivery', () => {
  it('validates and includes every contact field in the Telegram message', () => {
    const submission = parseContactForm(createSubmissionForm({ withAttachment: true }));
    const message = createContactMessage(submission);

    expect(message).toContain('Имя: Иван Петров');
    expect(message).toContain('Контакт: @ivan');
    expect(message).toContain('Я хочу: предложить проект');
    expect(message).toContain('Сообщение: Разрабатываю автономную теплицу.');
    expect(message).toContain('Файл: project.txt');
  });

  it('rejects an incomplete submission', () => {
    const formData = createSubmissionForm();
    formData.delete('contact');

    expect(() => parseContactForm(formData)).toThrow('Заполните все обязательные поля.');
  });

  it('sends the message and attached document through noteapp AI integration', async () => {
    const calls = [];
    const fetchImpl = vi.fn(async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        status: 200,
        json: async () => ({ status: 'success', providerPostId: '42' })
      };
    });
    const submission = parseContactForm(createSubmissionForm({ withAttachment: true }));

    await sendContactToTelegram(submission, {
      env: {
        TELEGRAM_BOT_TOKEN: 'test-token',
        TELEGRAM_CHAT_ID: '-100123',
        AI_INTEGRATION_BASE_URL: 'https://integration.example.com/',
        AI_INTEGRATION_API_KEY: 'aikey_test'
      },
      fetchImpl
    });

    expect(calls).toHaveLength(2);
    expect(calls[0].url).toBe('https://integration.example.com/api/social/posts');
    expect(calls[0].options.headers['X-API-Key']).toBe('aikey_test');
    expect(JSON.parse(calls[0].options.body)).toMatchObject({
      userId: 'suzdal-it-valley-contact',
      platform: 'telegram',
      credentials: {
        botToken: 'test-token',
        chatId: '-100123'
      }
    });
    const documentRequest = JSON.parse(calls[1].options.body);
    expect(documentRequest.text).toBe('');
    expect(documentRequest.attachments).toEqual([
      {
        type: 'document',
        fileName: 'project.txt',
        contentType: 'text/plain',
        base64: 'cHJvamVjdA=='
      }
    ]);
  });

  it('does not attempt delivery without server-only integration configuration', async () => {
    const submission = parseContactForm(createSubmissionForm());

    await expect(
      sendContactToTelegram(submission, {
        env: {},
        fetchImpl: vi.fn()
      })
    ).rejects.toThrow('Форма временно недоступна');
  });

  it('preserves the integration error description for server diagnostics', async () => {
    const submission = parseContactForm(createSubmissionForm());
    const fetchImpl = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        status: 'failed',
        errorMessage: 'Provider returned HTTP 400: Bad Request: chat not found'
      })
    }));

    await expect(
      sendContactToTelegram(submission, {
        env: {
          TELEGRAM_BOT_TOKEN: 'test-token',
          TELEGRAM_CHAT_ID: '-100123',
          AI_INTEGRATION_BASE_URL: 'https://integration.example.com',
          AI_INTEGRATION_API_KEY: 'aikey_test'
        },
        fetchImpl
      })
    ).rejects.toThrow('Bad Request: chat not found');
  });
});
