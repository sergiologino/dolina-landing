import { ArrowRight, Mail } from 'lucide-react';
import { contactMail, contactOptions, contactTelegram } from '../data/content';

const mailSubject = 'Заявка в Суздальскую IT Долину';
const mailBody = `Имя:%0AКонтакт:%0AЯ хочу:%0AСообщение:%0A`;

export function ContactSection() {
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
        <div className="contact-card" aria-label="Форма заявки">
          <label>
            Имя
            <input type="text" placeholder="Как к вам обращаться" disabled />
          </label>
          <label>
            Контакт
            <input type="text" placeholder="Email, Telegram или телефон" disabled />
          </label>
          <label>
            Я хочу
            <select disabled defaultValue={contactOptions[0]}>
              {contactOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Сообщение
            <textarea placeholder="Что вы умеете, что хотите построить и какой формат участия вам близок" disabled />
          </label>
          <a
            className="button button-primary"
            href={`mailto:${contactMail}?subject=${encodeURIComponent(mailSubject)}&body=${mailBody}`}
          >
            <Mail size={18} aria-hidden="true" />
            Отправить заявку
          </a>
          {contactTelegram ? (
            <a className="button button-ghost" href={contactTelegram} target="_blank" rel="noreferrer">
              Написать в Telegram <ArrowRight size={18} aria-hidden="true" />
            </a>
          ) : null}
          <p className="contact-note">
            Пока это аккуратная заглушка: кнопка открывает письмо. Адрес можно заменить через
            `VITE_CONTACT_EMAIL`, Telegram - через `VITE_CONTACT_TELEGRAM`.
          </p>
        </div>
      </div>
    </section>
  );
}
