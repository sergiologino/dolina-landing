import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="final-title">
      <div className="final-cta-bg" aria-hidden="true" />
      <div className="final-cta-content">
        <h2 id="final-title">Если вам нужна не вакансия и не быстрый раунд, а место в длинной истории - поговорим.</h2>
        <p>
          Резидентам - расскажите, что вы хотите построить. Инвесторам - напишите, какой формат участия
          вам близок. Нам важны люди, которые понимают: серьезные вещи редко выглядят готовыми в самом
          начале.
        </p>
        <div className="section-actions">
          <a className="button button-primary" href="#residents">
            Стать резидентом <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button button-ghost" href="#investors">
            Инвестировать в Долину
          </a>
        </div>
      </div>
    </section>
  );
}
