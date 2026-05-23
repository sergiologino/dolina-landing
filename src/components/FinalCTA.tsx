import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="final-title">
      <div className="final-cta-bg" aria-hidden="true" />
      <div className="final-cta-content">
        <h2 id="final-title">Если вам нужна не вакансия, а территория для рывка — поговорим.</h2>
        <p>
          Суздальская IT Долина начинается не с идеального кампуса. Она начинается с людей, которые готовы
          строить его вместе с нами.
        </p>
        <div className="section-actions">
          <a className="button button-primary" href="#residents">
            Стать резидентом <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button button-ghost" href="#investors">
            Связаться как инвестор
          </a>
        </div>
      </div>
    </section>
  );
}
