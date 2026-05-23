import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { SceneSwitcher } from '../components/SceneSwitcher';
import { scenes, technologies, navigationItems, productSiteUrl } from '../data/content';

describe('landing content contract', () => {
  it('keeps exactly three hero scenes with accessible captions', () => {
    expect(scenes).toHaveLength(3);
    expect(scenes.map((scene) => scene.id)).toEqual(['current', 'oasis', 'valley']);
    for (const scene of scenes) {
      expect(scene.caption.length).toBeGreaterThan(80);
      expect(scene.image).toMatch(/^\/images\/hero\//);
    }
  });

  it('keeps the technology map varied and under five cards', () => {
    expect(technologies).toHaveLength(5);
    expect(new Set(technologies.map((item) => item.className)).size).toBe(technologies.length);
  });

  it('keeps all required navigation anchors visible', () => {
    expect(navigationItems.map((item) => item.label)).toEqual([
      'О Долине',
      'Оазисы',
      'Для резидентов',
      'Для инвесторов',
      'Продукты',
      'Контакты'
    ]);
  });

  it('links the product teaser to the real company product site', () => {
    expect(productSiteUrl).toBe('https://altacod.com');
  });

  it('marks only the active scene switcher button as selected', () => {
    const html = renderToStaticMarkup(
      createElement(SceneSwitcher, {
        activeScene: 'oasis',
        onSceneChange: () => undefined
      })
    );

    expect(html.match(/aria-selected="true"/g)).toHaveLength(1);
    expect(html.match(/is-active/g)).toHaveLength(1);
  });
});
