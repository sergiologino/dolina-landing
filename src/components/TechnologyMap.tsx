import { technologies } from '../data/content';

export function TechnologyMap() {
  return (
    <section className="section technology-section" id="about" aria-labelledby="technology-title">
      <div className="section-kicker">не формат акселератора</div>
      <h2 id="technology-title" className="section-title">
        Не акселератор. Не офисный парк. Не витрина грантов.
      </h2>
      <p className="section-lead">
        Мы строим сообщество людей, которые хотят не просто писать код по задачам, а создавать новые
        технологические ветви. Здесь могут появляться роботы, медицинские прототипы, биотехнологические
        гипотезы, космические инженерные идеи, AI-продукты и прикладные цифровые сервисы.
      </p>
      <div className="technology-map">
        {technologies.map((item) => {
          const Icon = item.icon;
          return (
            <article className={`tech-card ${item.className}`} key={item.title}>
              <Icon size={28} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
