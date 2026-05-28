import { ContactSection } from './components/ContactSection';
import { FinalCTA } from './components/FinalCTA';
import { HeroValleyStage } from './components/HeroValleyStage';
import { InvestorSection } from './components/InvestorSection';
import { InvestorValueSection } from './components/InvestorValueSection';
import { MetricsScripts } from './components/MetricsScripts';
import { ProductTeaser } from './components/ProductTeaser';
import { ResidentSection } from './components/ResidentSection';
import { RoadmapValley } from './components/RoadmapValley';
import { RussiaBenefitSection } from './components/RussiaBenefitSection';
import { SEOJsonLd } from './components/SEOJsonLd';
import { TechnologyMap } from './components/TechnologyMap';
import { faqItems } from './data/content';

export function App() {
  return (
    <>
      <SEOJsonLd />
      <MetricsScripts />
      <HeroValleyStage />
      <main>
        <TechnologyMap />
        <ResidentSection />
        <RoadmapValley />
        <InvestorSection />
        <InvestorValueSection />
        <RussiaBenefitSection />
        <ProductTeaser />
        <section className="section section-faq" id="faq" aria-labelledby="faq-title">
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
        <ContactSection />
        <FinalCTA />
      </main>
    </>
  );
}
