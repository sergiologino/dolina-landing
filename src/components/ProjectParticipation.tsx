import { participationItems } from '../data/content';

export function ProjectParticipation() {
  return (
    <section className="section participation-section" aria-labelledby="participation-title">
      <div className="participation-panel">
        <div className="section-kicker">не аренда домиков</div>
        <h2 id="participation-title" className="section-title">
          Мы не просто сдаем домики. Мы входим в работу.
        </h2>
        <p className="section-lead">
          Резидент получает не только место. Мы помогаем собрать проект, найти людей, проверить направление,
          показать его инвесторам и довести до уровня, где разговор идет уже не о мечте, а о конкретном
          продукте, прототипе или исследовательской программе.
        </p>
        <div className="participation-grid">
          {participationItems.map((item) => {
            const Icon = item.icon;
            return (
              <div className="participation-item" key={item.text}>
                <Icon size={24} aria-hidden="true" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
