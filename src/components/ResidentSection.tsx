import { ArrowRight, Leaf } from 'lucide-react';

export function ResidentSection() {
  return (
    <section className="section resident-section" id="residents" aria-labelledby="resident-title">
      <div className="resident-frame">
        <div className="resident-image" role="img" aria-label="Рабочий оазис под Суздалем с домиками, зеленью и открытым рабочим шатром" />
        <div className="resident-content">
          <div className="section-kicker">для резидентов</div>
          <h2 id="resident-title" className="section-title">
            Резидентам — место, где можно не распыляться
          </h2>
          <p>
            Мы создаем среду для тех, кто умеет работать без внешнего шума. Здесь можно жить рядом с природой,
            собирать команду, делать прототипы, обсуждать идеи с людьми из соседних направлений и не тратить
            силы на имитацию бурной деятельности.
          </p>
          <div className="resident-badge">
            <Leaf size={20} aria-hidden="true" />
            <span>тишина, мастерская, разговор по делу, воздух</span>
          </div>
          <div className="section-actions">
            <a className="button button-primary" href="#contacts">
              Подать заявку <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-ghost" href="mailto:hello@example.com?subject=Проект для Суздальской IT Долины">
              Написать о проекте
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
