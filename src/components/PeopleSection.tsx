import { peopleItems } from '../data/content';

export function PeopleSection() {
  return (
    <section className="section people-section" aria-labelledby="people-title">
      <div className="split-layout">
        <div>
          <div className="section-kicker">кому здесь место</div>
          <h2 id="people-title" className="section-title">
            Нам нужны не самые удобные. Нам нужны самые живые.
          </h2>
        </div>
        <div>
          <p className="section-lead compact">
            Долина не рассчитана на тех, кто выбирает место по мягкости кресла и размеру welcome-бонуса.
            Нам ближе люди, которые не могут спокойно смотреть на то, как сильные идеи лежат без движения.
            Те, кто готов работать долго, думать глубоко, спорить по существу и собирать вокруг себя других.
          </p>
          <ul className="alive-list">
            {peopleItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
