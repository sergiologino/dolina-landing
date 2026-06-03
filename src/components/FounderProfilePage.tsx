import { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { founders } from '../data/founders';
import { FounderCard } from './FounderCard';
import { MetricsScripts } from './MetricsScripts';
import { SiteFooter } from './SiteFooter';
import { TeamJsonLd } from './TeamJsonLd';

const teamFaqItems = [
  {
    question: 'Кто основал Суздальскую IT Долину?',
    answer:
      'Проект развивают основатели и идейные вдохновители, соединяющие технологический опыт, территориальное развитие, международные связи и концепцию Suzdal Millennium.'
  },
  {
    question: 'Почему команда Долины важна для инвесторов?',
    answer:
      'Инвесторам важна не только идея, но и способность команды довести проект до работающих продуктов, резидентской среды, партнерств и долгосрочной модели развития.'
  },
  {
    question: 'Почему команда Долины важна для резидентов?',
    answer:
      'Резидентам нужна среда, где их проект понимают не только как набор задач, но и как технологическое направление, которому нужны архитектура, люди, связи, инфраструктура и терпение.'
  }
];

export function FounderProfilePage() {
  useEffect(() => {
    document.title = 'Команда Суздальской IT Долины — основатели и идейные вдохновители';

    const description =
      'Команда Суздальской IT Долины: основатели проекта, соединяющего IT, инженерные продукты, территориальное развитие, Suzdal Millennium, инвестиции и будущую сеть технологических хабов России.';
    const keywords =
      'команда Суздальская IT Долина, основатели Суздальская IT Долина, Сергей Савкин, Вадим Суздальский, Suzdal Millennium, IT резиденция Суздаль, технологические хабы России, инвестиции в технологии, территориальное развитие Суздаль';

    const setMeta = (selector: string, attr: 'content' | 'href', value: string) => {
      const element = document.querySelector(selector);
      element?.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="keywords"]', 'content', keywords);
    setMeta('meta[property="og:title"]', 'content', 'Команда Суздальской IT Долины');
    setMeta(
      'meta[property="og:description"]',
      'content',
      'Основатели и идейные вдохновители проекта: технологии, территориальное развитие, Suzdal Millennium и будущая сеть технологических хабов.'
    );
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:image"]', 'content', '/images/og/suzdal-it-valley-og.jpg');
    setMeta('meta[name="twitter:title"]', 'content', 'Команда Суздальской IT Долины');
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', `${window.location.origin}/team`);
  }, []);

  return (
    <>
      <MetricsScripts />
      <TeamJsonLd />
      <header className="team-page-hero">
        <nav className="site-nav team-nav" aria-label="Навигация страницы команды">
          <a className="team-back-link" href="/">
            <ArrowLeft size={16} aria-hidden="true" /> На главную
          </a>
          <div className="nav-links">
            <a href="/#residents">Резидентам</a>
            <a href="/#investors">Инвесторам</a>
            <a href="/#contact">Контакты</a>
          </div>
        </nav>
        <div className="team-hero-content">
          <div className="section-kicker">основатели</div>
          <h1>Команда Суздальской IT Долины</h1>
          <p className="team-hero-lead">
            Основатели и идейные вдохновители проекта, который соединяет технологии, территорию, инженерную
            культуру и долгосрочное развитие.
          </p>
          <p className="team-hero-text">
            Мы строим Долину не как офисный поселок и не как очередной акселератор. Это попытка собрать
            среду, где сильные люди могут жить, работать, создавать продукты, проверять инженерные гипотезы
            и находить партнеров для длинных технологических проектов.
          </p>
          <div className="section-actions">
            <a className="button button-primary" href="/#residents">
              Стать резидентом <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-ghost" href="/#investors">
              Обсудить инвестиции
            </a>
          </div>
        </div>
      </header>
      <main>
        <section className="section team-founders-section" aria-labelledby="founders-title">
          <div className="section-kicker">профили</div>
          <h2 id="founders-title" className="section-title">
            Основатели
          </h2>
          <div className="founder-profile-list">
            {founders.map((founder) => (
              <FounderCard founder={founder} key={founder.id} variant="profile" />
            ))}
          </div>
        </section>

        <section className="section team-why-section" aria-labelledby="team-why-title">
          <div className="team-why-card">
            <h2 id="team-why-title">Почему такая команда важна для Долины</h2>
            <p>
              Технологической резиденции недостаточно красивой земли и сильной идеи. Ей нужны люди, которые
              умеют доводить замысел до системы: собрать первые продукты, объяснить проект инвесторам, найти
              резидентов, удержать смысл и не превратить Долину в обычный девелоперский поселок.
            </p>
            <p>
              В этом проекте технологическая часть и территориальное видение идут вместе. Именно это должно
              отличать Суздальскую IT Долину от акселераторов, офисных парков и декоративных поселков с
              громкими обещаниями.
            </p>
          </div>
        </section>

        <section className="section section-faq team-faq-section" aria-labelledby="team-faq-title">
          <div className="section-kicker">AEO</div>
          <h2 id="team-faq-title" className="section-title">
            Коротко о команде
          </h2>
          <div className="faq-grid">
            {teamFaqItems.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta team-final-cta" aria-labelledby="team-final-title">
          <div className="final-cta-bg" aria-hidden="true" />
          <div className="final-cta-content">
            <h2 id="team-final-title">Если вам близка эта рамка - подключайтесь</h2>
            <p>
              Мы открыты к разговору с резидентами, инвесторами, инженерами, предпринимателями и партнерами,
              которые понимают длинный горизонт проекта.
            </p>
            <div className="section-actions">
              <a className="button button-primary" href="/#contact">
                Рассказать о себе и проекте <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="button button-ghost" href="/#contact">
                Обсудить инвестиции
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

