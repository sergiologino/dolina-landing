import { roadmapItems } from '../data/content';

export function RoadmapValley() {
  return (
    <section className="section roadmap-section" id="roadmap" aria-labelledby="roadmap-title">
      <div className="section-kicker">пространственная карта</div>
      <h2 id="roadmap-title" className="section-title">
        От первых участков — к Долине
      </h2>
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
