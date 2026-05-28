import { ShieldAlert } from 'lucide-react';
import { investorValueItems } from '../data/content';

export function InvestorValueSection() {
  return (
    <section className="section investor-value-section" aria-labelledby="investor-value-title">
      <div className="section-kicker">что может быть ценно</div>
      <h2 id="investor-value-title" className="section-title">
        Что здесь может быть ценно для инвестора
      </h2>
      <div className="investor-value-grid">
        {investorValueItems.map((item) => (
          <article className="investor-value-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="investor-warning">
        <ShieldAlert size={24} aria-hidden="true" />
        <p>
          Мы не обещаем гарантированную доходность и не маскируем риск красивыми словами. Ранние
          технологические проекты могут не взлететь. Но без таких ставок не появляются новые школы, рынки
          и технологические лидеры.
        </p>
      </div>
    </section>
  );
}
