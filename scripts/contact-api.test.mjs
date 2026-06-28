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

  it('sends the message and attached document to the configured Telegram chat', async () => {
    const calls = [];
    const fetchImpl = vi.fn(async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => ({ ok: true })
      };
    });
    const submission = parseContactForm(createSubmissionForm({ withAttachment: true }));

    await sendContactToTelegram(submission, {
      env: {
        TELEGRAM_BOT_TOKEN: 'test-token',
        TELEGRAM_CHAT_ID: '-100123',
        TELEGRAM_MESSAGE_THREAD_ID: '42'
      },
      fetchImpl
    });

    expect(calls).toHaveLength(2);
    expect(calls[0].url.endsWith('/sendMessage')).toBe(true);
    expect(JSON.parse(calls[0].options.body)).toMatchObject({
      chat_id: '-100123',
      message_thread_id: '42'
    });
    expect(calls[1].url.endsWith('/sendDocument')).toBe(true);
    expect(calls[1].options.body.get('chat_id')).toBe('-100123');
    expect(calls[1].options.body.get('message_thread_id')).toBe('42');
    expect(calls[1].options.body.get('document').name).toBe('project.txt');
  });

  it('does not attempt delivery without server-only Telegram credentials', async () => {
    const submission = parseContactForm(createSubmissionForm());

    await expect(
      sendContactToTelegram(submission, {
        env: {},
        fetchImpl: vi.fn()
      })
    ).rejects.toThrow('Форма временно недоступна');
  });
});
