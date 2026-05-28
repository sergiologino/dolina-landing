import { ArrowRight, ShieldAlert } from 'lucide-react';

export function InvestorSection() {
  return (
    <section className="section investor-section" id="investors" aria-labelledby="investor-title">
      <div className="investor-shell">
        <div>
          <div className="section-kicker">для инвесторов</div>
          <h2 id="investor-title" className="section-title">
            Инвестиции не в быстрые деньги. В людей, которые могут сдвинуть технологическую реальность.
          </h2>
        </div>
        <div className="investor-copy">
          <p>
            Этот проект не нужно продавать как быстрый финансовый аттракцион. Быстрые деньги ищут в других
            местах. Долина - это длинная ставка: на специалистов, команды, инженерную школу, прикладную
            науку и проекты, которые могут стать важными не завтра утром, а через годы.
          </p>
          <p>
            Инвестор здесь входит не только в недвижимость и не только в стартапы. Он входит в среду, где
            появляются люди, связи, компетенции, прототипы, лаборатории и первые продукты. Такой капитал
            возвращается медленнее, но при удачном развитии может вернуться масштабно - деньгами, долями,
            репутацией, доступом к новым направлениям и фундаментальным вкладом в развитие страны.
          </p>
          <div className="risk-note">
            <ShieldAlert size={22} aria-hidden="true" />
            <span>Риск здесь не прячется в мелком шрифте. Он обсуждается до входа.</span>
          </div>
          <div className="section-actions">
            <a className="button button-primary" href="#contact">
              Запросить инвесторский бриф <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-ghost" href="#contact">
              Обсудить участие
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
