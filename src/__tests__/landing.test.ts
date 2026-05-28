import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '../App';
import { RussiaBenefitSection } from '../components/RussiaBenefitSection';
import { SceneSwitcher } from '../components/SceneSwitcher';
import {
  faqItems,
  investorValueItems,
  navigationItems,
  productSiteUrl,
  residentCards,
  roadmapItems,
  scenes,
  technologies
} from '../data/content';

describe('landing content contract', () => {
  it('keeps exactly three hero scenes with accessible captions', () => {
    expect(scenes).toHaveLength(3);
    expect(scenes.map((scene) => scene.id)).toEqual(['current', 'oasis', 'valley']);
    for (const scene of scenes) {
      expect(scene.caption.length).toBeGreaterThan(80);
      expect(scene.image).toMatch(/^\/images\/hero\//);
    }
  });

  it('keeps a varied technology map broader than pure IT', () => {
    expect(technologies).toHaveLength(6);
    expect(new Set(technologies.map((item) => item.className)).size).toBe(technologies.length);
    expect(technologies.map((item) => item.title).join(' ')).toContain('Агротех');
  });

  it('keeps resident and investor sub-landing data complete', () => {
    expect(residentCards).toHaveLength(5);
    expect(investorValueItems).toHaveLength(5);
    expect(roadmapItems).toHaveLength(4);
  });

  it('keeps all required navigation anchors visible', () => {
    expect(navigationItems.map((item) => item.href)).toEqual([
      '#about',
      '#residents',
      '#investors',
      '#roadmap',
      '#products',
      '#contact'
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

  it('renders real resident, investor and contact anchors', () => {
    const html = renderToStaticMarkup(createElement(App));
    expect(html).toContain('id="residents"');
    expect(html).toContain('id="investors"');
    expect(html).toContain('id="contact"');
    expect(html).toContain('href="#residents"');
    expect(html).toContain('href="#investors"');
    expect(html).toContain('href="#contact"');
  });

  it('keeps AEO answers aligned with long-horizon positioning', () => {
    const faqText = faqItems.map((item) => `${item.question} ${item.answer}`).join(' ');
    expect(faqText).toContain('длинным горизонтом');
    expect(faqText).toContain('не быстрые спекулятивные сделки');
  });

  it('renders the central Russia map with all highlighted cities and animated links', () => {
    const html = renderToStaticMarkup(createElement(RussiaBenefitSection));

    for (const city of ['Суздаль', 'Владимир', 'Чехов', 'Калуга']) {
      expect(html).toContain(city);
    }

    expect(html.match(/class="map-runner-dot/g)).toHaveLength(4);
    expect(html).toContain('link-chekhov-kaluga');
    expect(html).toContain('link-kaluga-vladimir');
  });
});
