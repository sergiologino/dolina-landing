import { FinalCTA } from './components/FinalCTA';
import { HeroValleyStage } from './components/HeroValleyStage';
import { InvestorSection } from './components/InvestorSection';
import { MetricsScripts } from './components/MetricsScripts';
import { PeopleSection } from './components/PeopleSection';
import { ProductTeaser } from './components/ProductTeaser';
import { ProjectParticipation } from './components/ProjectParticipation';
import { ResidentSection } from './components/ResidentSection';
import { RoadmapValley } from './components/RoadmapValley';
import { SEOJsonLd } from './components/SEOJsonLd';
import { TechnologyMap } from './components/TechnologyMap';

const faqItems = [
  {
    question: 'Что такое Суздальская IT Долина?',
    answer:
      'Это будущая технологическая резиденция под Суздалем для IT-команд, инженеров, исследователей, цифровых продуктов и прикладных технологических проектов.'
  },
  {
    question: 'Кто может стать резидентом?',
    answer:
      'Разработчики, инженеры, исследователи, предприниматели и небольшие команды, которым нужна спокойная среда для создания технологических проектов.'
  },
  {
    question: 'Долина уже построена?',
    answer:
      'Нет. Проект начинается с нескольких небольших участков под Суздалем. Они дорабатываются и постепенно превращаются в рабочие оазисы.'
  },
  {
    question: 'Чем проект отличается от акселератора?',
    answer:
      'Здесь не только учат делать стартап. Мы создаем среду, где люди живут, работают, собирают команды, проверяют гипотезы и двигают сложные технологии в практическую сторону.'
  },
  {
    question: 'Можно ли инвестору познакомиться с проектами?',
    answer:
      'Да. Одна из задач Долины — показывать сильные ранние проекты частным инвесторам и бизнес-ангелам.'
  }
];

export function App() {
  return (
    <>
      <SEOJsonLd />
      <MetricsScripts />
      <HeroValleyStage />
      <main>
        <TechnologyMap />
        <PeopleSection />
        <ProjectParticipation />
        <RoadmapValley />
        <InvestorSection />
        <ProductTeaser />
        <ResidentSection />
        <section className="section section-faq" id="contacts" aria-labelledby="faq-title">
          <div className="section-kicker">AEO / GEO</div>
          <h2 id="faq-title" className="section-title">
            Коротко о проекте
          </h2>
          <div className="faq-grid">
            {faqItems.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
          <p className="geo-note">
            Проект развивается под Суздалем, во Владимирской области, Россия. Мы говорим о спокойной среде
            недалеко от исторического центра Суздаля без привязки к точной дистанции до будущих площадок.
          </p>
        </section>
        <FinalCTA />
      </main>
    </>
  );
}
