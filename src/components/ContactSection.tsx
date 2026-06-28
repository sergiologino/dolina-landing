import { useState, type FormEvent } from 'react';
import { Paperclip, Send } from 'lucide-react';
import { contactOptions } from '../data/content';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

const maxFileSizeMb = 10;

export function ContactSection() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get('attachment');

    if (file instanceof File && file.size > maxFileSizeMb * 1024 * 1024) {
      setSubmissionState('error');
      setStatusMessage(`Файл должен быть не больше ${maxFileSizeMb} МБ.`);
      return;
    }

    setSubmissionState('sending');
    setStatusMessage('Отправляем заявку…');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(result?.message || 'Не удалось отправить заявку.');
      }

      form.reset();
      setSubmissionState('success');
      setStatusMessage('Заявка отправлена. Мы свяжемся с вами по указанному контакту.');
    } catch (error) {
      setSubmissionState('error');
      setStatusMessage(error instanceof Error ? error.message : 'Не удалось отправить заявку.');
    }
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-shell">
        <div>
          <div className="section-kicker">контакт</div>
          <h2 id="contact-title" className="section-title">
            Если вам нужна не вакансия и не быстрый раунд, а место в длинной истории - поговорим.
          </h2>
          <p className="section-lead">
            Резидентам - расскажите, что вы хотите построить. Инвесторам - напишите, какой формат участия
            вам близок. Нам важны люди, которые понимают: серьезные вещи редко выглядят готовыми в самом
            начале.
          </p>
        </div>
        <form className="contact-card" aria-label="Форма заявки" onSubmit={handleSubmit}>
          <label>
            Имя
            <input name="name" type="text" placeholder="Как к вам обращаться" maxLength={120} required />
          </label>
          <label>
            Контакт
            <input
              name="contact"
              type="text"
              placeholder="Email, Telegram или телефон"
              maxLength={200}
              required
            />
          </label>
          <label>
            Я хочу
            <select name="intent" defaultValue={contactOptions[0]} required>
              {contactOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Сообщение
            <textarea
              name="message"
              placeholder="Что вы умеете, что хотите построить и какой формат участия вам близок"
              maxLength={3000}
              required
            />
          </label>
          <label className="contact-file">
            <span>
              <Paperclip size={18} aria-hidden="true" />
              Прикрепить файл
            </span>
            <input name="attachment" type="file" />
            <small>До {maxFileSizeMb} МБ</small>
          </label>
          <input
            className="contact-honeypot"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <button className="button button-primary" type="submit" disabled={submissionState === 'sending'}>
            <Send size={18} aria-hidden="true" />
            {submissionState === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
          </button>
          {statusMessage ? (
            <p
              className={`contact-status contact-status-${submissionState}`}
              role={submissionState === 'error' ? 'alert' : 'status'}
            >
              {statusMessage}
            </p>
          ) : null}
          <p className="contact-note">Данные заявки и прикреплённый файл будут отправлены команде проекта в Telegram.</p>
        </form>
      </div>
    </section>
  );
}
