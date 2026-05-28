import { roadmapItems } from '../data/content';

export function RoadmapValley() {
  return (
    <section className="section roadmap-section" id="roadmap" aria-labelledby="roadmap-title">
      <div className="section-kicker">от пилота к сети</div>
      <h2 id="roadmap-title" className="section-title">
        Суздаль - первая точка. Модель должна стать сетью.
      </h2>
      <p className="section-lead">
        Мы начинаем с нескольких участков и домов под Суздалем. Это честная, небольшая стартовая
        точка. Но модель проектируется шире: находить сильные места в регионах, доращивать их до
        рабочих хабов, собирать там людей, запускать проекты и связывать эти точки между собой.
      </p>
      <div className="roadmap-valley">
        {roadmapItems.map((item, index) => (
          <article className={`roadmap-card roadmap-card-${index + 1}`} key={item.time}>
            <span>{item.time}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
