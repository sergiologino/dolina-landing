import { ArrowRight } from 'lucide-react';
import { founders } from '../data/founders';
import { FounderCard } from './FounderCard';

export function FoundersPreviewSection() {
  return (
    <section className="section founders-preview-section" id="team" aria-labelledby="team-title">
      <div className="founders-atmosphere" aria-hidden="true" />
      <div className="section-kicker">команда</div>
      <div className="section-heading-row">
        <div>
          <h2 id="team-title" className="section-title">
            Люди, которые начали Долину
          </h2>
          <p className="section-lead">
            Суздальская IT Долина начинается не с абстрактной презентации, а с команды, которая соединяет
            технологическое проектирование, территориальное развитие, международный опыт и личную веру в
            потенциал Суздальской земли.
          </p>
        </div>
        <a className="button button-ghost" href="/team">
          Подробнее о команде <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
      <div className="founders-preview-grid">
        {founders.map((founder) => (
          <FounderCard founder={founder} key={founder.id} variant="preview" />
        ))}
      </div>
      <div className="founders-union">
        <span>Технологии + территория + инвестиционное развитие</span>
        <p>
          Команда Долины соединяет две необходимые силы: практическую технологическую компетенцию и
          стратегическое видение территории. С одной стороны - цифровые продукты, архитектура систем,
          микросервисы, AI-инструменты и работа с командами. С другой - понимание Суздаля как культурной,
          природной и инвестиционной точки роста.
        </p>
      </div>
    </section>
  );
}

