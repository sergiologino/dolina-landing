import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { FloatingGlassPanel } from './FloatingGlassPanel';
import { SceneSwitcher } from './SceneSwitcher';
import { navigationItems, scenes, type SceneId } from '../data/content';

export function HeroValleyStage() {
  const [activeScene, setActiveScene] = useState<SceneId>('current');
  const currentScene = useMemo(() => scenes.find((scene) => scene.id === activeScene) ?? scenes[0], [activeScene]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const timer = window.setInterval(() => {
      setActiveScene((sceneId) => {
        const currentIndex = scenes.findIndex((scene) => scene.id === sceneId);
        return scenes[(currentIndex + 1) % scenes.length].id;
      });
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="hero-stage" id="top">
      <nav className="site-nav" aria-label="Главная навигация">
        <div className="nav-links">
          {navigationItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="hero-media layer-background" aria-hidden="true">
        {scenes.map((scene) => (
          <div
            className={`hero-image ${activeScene === scene.id ? 'is-active' : ''}`}
            key={scene.id}
            style={{ backgroundImage: `url(${scene.image})` }}
          />
        ))}
      </div>
      <div className="hero-atmosphere layer-atmosphere" aria-hidden="true" />

      <div className="hero-content layer-content">
        <FloatingGlassPanel className="hero-copy">
          <div className="eyebrow">
            <MapPin size={16} aria-hidden="true" />
            Суздаль, Владимирская область, Россия
          </div>
          <h1>Суздальская IT Долина</h1>
          <p className="hero-subtitle">резиденция IT-команд и цифровых продуктов</p>
          <p className="hero-text">
            Мы собираем людей, которым тесно в обычной карьере. Инженеров, исследователей,
            разработчиков, предпринимателей и творческих практиков, готовых двигать технологии не по
            инструкции, а через собственную одержимость, труд и вкус к невозможному.
          </p>
          <div className="hero-actions layer-floating">
            <a className="button button-primary" href="#residents">
              Стать резидентом <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-ghost" href="#investors">
              Инвестировать в Долину
            </a>
          </div>
          <p className="hero-note">
            Это не короткая программа и не офисная вакансия. Это территория для тех, кто хочет строить
            дольше и глубже.
          </p>
        </FloatingGlassPanel>

        <aside className="stage-console layer-floating" aria-live="polite" id={`scene-panel-${currentScene.id}`}>
          <div className="stage-console-head">
            <span>{currentScene.label}</span>
          </div>
          <p>{currentScene.caption}</p>
          <SceneSwitcher activeScene={activeScene} onSceneChange={setActiveScene} />
        </aside>
      </div>
    </header>
  );
}
