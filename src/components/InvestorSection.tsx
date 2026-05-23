import { ArrowRight, ShieldAlert } from 'lucide-react';

export function InvestorSection() {
  return (
    <section className="section investor-section" id="investors" aria-labelledby="investor-title">
      <div className="investor-shell">
        <div>
          <div className="section-kicker">для инвесторов</div>
          <h2 id="investor-title" className="section-title">
            Инвесторам — ранний вход в живую технологическую среду
          </h2>
        </div>
        <div className="investor-copy">
          <p>
            Мы не обещаем безопасную прогулку. Ранние технологические проекты всегда несут риск. Но именно
            на ранней стадии можно увидеть людей, идеи и направления до того, как они станут очевидными для
            рынка.
          </p>
          <div className="risk-note">
            <ShieldAlert size={22} aria-hidden="true" />
            <span>Риск здесь не прячется в мелком шрифте. Он обсуждается до входа.</span>
          </div>
          <div className="section-actions">
            <a className="button button-primary" href="#contacts">
              Обсудить участие <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-ghost" href="#products">
              Посмотреть первые продукты
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
