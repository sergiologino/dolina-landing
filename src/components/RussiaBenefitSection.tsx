import { russiaBenefitPoints } from '../data/content';

const secondaryCities = [
  { name: 'Москва', x: 354, y: 456 },
  { name: 'Тверь', x: 250, y: 246 },
  { name: 'Ярославль', x: 492, y: 154 },
  { name: 'Иваново', x: 570, y: 286 },
  { name: 'Кострома', x: 620, y: 154, labelX: 486, labelY: 144 },
  { name: 'Нижний Новгород', x: 634, y: 430, labelX: 500, labelY: 438 },
  { name: 'Рязань', x: 502, y: 666, labelX: 516, labelY: 672 },
  { name: 'Тула', x: 260, y: 724 }
];

const highlightedCities = [
  { className: 'city-suzdal', name: 'Суздаль', x: 496, y: 286, labelX: 414, labelY: 274 },
  { className: 'city-vladimir', name: 'Владимир', x: 492, y: 386, labelX: 398, labelY: 398 },
  { className: 'city-chekhov', name: 'Чехов', x: 326, y: 608, labelX: 344, labelY: 618 },
  { className: 'city-kaluga', name: 'Калуга', x: 178, y: 648, labelX: 196, labelY: 658 }
];

export function RussiaBenefitSection() {
  return (
    <section className="section russia-section" aria-labelledby="russia-title">
      <div className="russia-shell">
        <div
          className="russia-map"
          aria-label="Стилизованная карта центральной России с точками Суздаль, Владимир, Чехов и Калуга"
          role="img"
        >
          <svg className="russia-map-svg" viewBox="0 0 720 880" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <filter id="mapCityGlow" x="-90%" y="-90%" width="280%" height="280%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path className="map-water map-water-oka" d="M78 720 C160 648 246 642 326 608 C414 570 490 604 565 678 C606 718 648 716 688 682" />
            <path className="map-water map-water-volga" d="M224 178 C314 112 416 120 502 154 C558 176 612 164 674 112" />
            <path className="map-road map-road-main" d="M354 456 C424 418 462 404 492 386 C548 352 586 386 634 430" />
            <path className="map-road" d="M354 456 C314 360 286 296 250 246" />
            <path className="map-road" d="M354 456 C390 332 426 236 492 154" />
            <path className="map-road" d="M354 456 C310 552 268 642 260 724" />
            <path className="map-road" d="M354 456 C282 512 232 586 178 648" />
            <path className="map-road" d="M492 386 C518 334 542 306 570 286 C604 260 632 206 620 154" />
            <path className="map-road" d="M492 386 C478 474 486 578 502 666" />
            <path className="map-road map-road-soft" d="M178 648 C224 626 272 616 326 608 C400 596 452 498 492 386" />
            <path className="map-road map-road-soft" d="M496 286 C468 310 452 346 464 370 C472 386 480 390 492 386" />
            <path
              id="link-suzdal-vladimir"
              className="city-link city-link-suzdal-vladimir"
              pathLength="100"
              d="M496 286 C468 310 460 358 492 386"
            />
            <path
              id="link-vladimir-chekhov"
              className="city-link city-link-vladimir-chekhov"
              pathLength="100"
              d="M492 386 C438 462 382 540 326 608"
            />
            <path
              id="link-chekhov-kaluga"
              className="city-link city-link-chekhov-kaluga"
              pathLength="100"
              d="M326 608 C270 616 222 630 178 648"
            />
            <path
              id="link-kaluga-vladimir"
              className="city-link city-link-kaluga-vladimir"
              pathLength="100"
              d="M178 648 C276 548 384 442 492 386"
            />

            {secondaryCities.map((city) => (
              <g className="map-city map-city-secondary" key={city.name}>
                <circle cx={city.x} cy={city.y} r="5" />
                <text x={city.labelX ?? city.x + 12} y={city.labelY ?? city.y + 5}>
                  {city.name}
                </text>
              </g>
            ))}

            {highlightedCities.map((city) => (
              <g className={`map-city map-city-highlight ${city.className}`} key={city.name}>
                <circle className="map-city-halo" cx={city.x} cy={city.y} r="16" />
                <circle cx={city.x} cy={city.y} r="8" />
                <text x={city.labelX} y={city.labelY}>
                  {city.name}
                </text>
              </g>
            ))}

            <circle className="map-runner-dot" r="4">
              <animateMotion dur="2.8s" repeatCount="indefinite" rotate="auto">
                <mpath href="#link-suzdal-vladimir" />
              </animateMotion>
            </circle>
            <circle className="map-runner-dot map-runner-dot-delay" r="4">
              <animateMotion dur="3.1s" begin="0.7s" repeatCount="indefinite" rotate="auto">
                <mpath href="#link-vladimir-chekhov" />
              </animateMotion>
            </circle>
            <circle className="map-runner-dot map-runner-dot-slow" r="4">
              <animateMotion dur="3.4s" begin="1.1s" repeatCount="indefinite" rotate="auto">
                <mpath href="#link-chekhov-kaluga" />
              </animateMotion>
            </circle>
            <circle className="map-runner-dot map-runner-dot-wide" r="3.5">
              <animateMotion dur="4.8s" begin="0.4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#link-kaluga-vladimir" />
              </animateMotion>
            </circle>
          </svg>
        </div>
        <div className="russia-copy">
          <div className="section-kicker">польза России</div>
          <h2 id="russia-title" className="section-title">
            Технологическая независимость начинается с людей
          </h2>
          <p>
            Оборудование, чипы, станки, роботы, медицинские технологии, биотех и сложные инженерные
            системы не появляются из лозунгов. Их делают люди, которые долго входят в тему, ошибаются,
            пробуют снова, собирают команды и не бросают работу при первом удобном предложении уехать или
            уйти в более легкую нишу.
          </p>
          <p>
            Долина хочет стать одним из мест, где такие люди получают опору: пространство, сообщество,
            инвесторов, спокойную среду и уважение к сложному труду.
          </p>
          <div className="russia-point-grid">
            {russiaBenefitPoints.map((point) => {
              const Icon = point.icon;
              return (
                <article className="russia-point" key={point.label}>
                  <Icon size={20} aria-hidden="true" />
                  <h3>{point.label}</h3>
                  <p>{point.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
