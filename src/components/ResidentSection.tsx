import { ArrowRight, Leaf } from 'lucide-react';
import { residentCards } from '../data/content';

export function ResidentSection() {
  return (
    <section className="section resident-section" id="residents" aria-labelledby="resident-title">
      <div className="resident-frame">
        <div className="resident-image" role="img" aria-label="Рабочий оазис под Суздалем с домиками, зеленью и открытым рабочим шатром" />
        <div className="resident-content">
          <div className="section-kicker">для резидентов</div>
          <h2 id="resident-title" className="section-title">
            Не для тех, кто ждет таску. Для тех, кто хочет сдвинуть границу возможного.
          </h2>
          <p>
            Долина не создается как еще одно место, где взрослым людям красиво раскладывают задачи по Jira
            и покупают мотивацию комфортом. Нам интересны те, кто сам ищет трудную тему, долго держит фокус
            и не пугается, когда путь оказывается сложнее презентации.
          </p>
          <p>
            Это место для людей, которым в кайф работать среди природы, думать на длинной дистанции,
            спорить с умными соседями, собирать прототипы, писать код, чертить схемы, выращивать
            лабораторные гипотезы и смотреть на древний Суздаль не как на декорацию, а как на напоминание:
            большие вещи строятся не за квартал.
          </p>
          <div className="resident-badge">
            <Leaf size={20} aria-hidden="true" />
            <span>тишина, мастерская, спор по делу, воздух, длинный фокус</span>
          </div>
        </div>
      </div>
      <div className="resident-card-block" aria-labelledby="resident-close-title">
        <h3 id="resident-close-title">Кто нам близок</h3>
        <div className="resident-card-grid">
          {residentCards.map((card) => (
            <article className="resident-card" key={card.title}>
              <h4>{card.title}</h4>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
        <div className="resident-cta">
          <a className="button button-primary" href="#contact">
            Рассказать о себе и проекте <ArrowRight size={18} aria-hidden="true" />
          </a>
          <p>
            Нам не нужен идеальный pitch deck. Лучше честно расскажите, что вы умеете, что хотите построить
            и почему это для вас важно.
          </p>
        </div>
      </div>
    </section>
  );
}
