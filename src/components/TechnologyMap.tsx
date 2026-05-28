import { technologies } from '../data/content';

export function TechnologyMap() {
  return (
    <section className="section technology-section" id="about" aria-labelledby="technology-title">
      <div className="section-kicker">не только код</div>
      <h2 id="technology-title" className="section-title">
        Долина шире, чем IT
      </h2>
      <p className="section-lead">
        Код - только один из инструментов. Нам интересны люди, которые работают на стыке технологий,
        науки, инженерии и воображения. В Долине могут рождаться цифровые продукты, роботы,
        медицинские прототипы, биотехнологические эксперименты, агротех, образовательные форматы,
        инструменты для промышленности и исследования, которые сначала кажутся странными.
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
