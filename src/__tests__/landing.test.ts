import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '../App';
import { ContactSection } from '../components/ContactSection';
import { FounderProfilePage } from '../components/FounderProfilePage';
import { RussiaBenefitSection } from '../components/RussiaBenefitSection';
import { SceneSwitcher } from '../components/SceneSwitcher';
import { TeamJsonLd } from '../components/TeamJsonLd';
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
import { founders } from '../data/founders';

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
      '/team',
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
    expect(html).toContain('id="team"');
    expect(html).toContain('href="#residents"');
    expect(html).toContain('href="#investors"');
    expect(html).toContain('href="#contact"');
    expect(html).toContain('href="/team"');
  });

  it('renders an enabled contact form with all Telegram submission fields and attachment', () => {
    const html = renderToStaticMarkup(createElement(ContactSection));

    expect(html).toContain('<form');
    expect(html).toContain('name="name"');
    expect(html).toContain('name="contact"');
    expect(html).toContain('name="intent"');
    expect(html).toContain('name="message"');
    expect(html).toContain('name="attachment"');
    expect(html).toContain('type="file"');
    expect(html).toContain('type="submit"');
    expect(html).not.toContain(' disabled=""');
    expect(html).not.toContain('mailto:');
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

  it('renders founders preview data and team page route without adding a second main H1', () => {
    expect(founders).toHaveLength(2);
    expect(founders.map((founder) => founder.name)).toEqual(['Сергей Савкин', 'Вадим Суздальский']);

    const mainHtml = renderToStaticMarkup(createElement(App));
    expect(mainHtml.match(/<h1/g)).toHaveLength(1);
    expect(mainHtml).toContain('Люди, которые начали Долину');
    expect(mainHtml).toContain('Команда проекта');

    window.history.pushState({}, '', '/team');
    const teamRouteHtml = renderToStaticMarkup(createElement(App));
    expect(teamRouteHtml).toContain('Команда Суздальской IT Долины');
    expect(teamRouteHtml.match(/<h1/g)).toHaveLength(1);
    expect(teamRouteHtml).toContain('id="sergey-savkin"');
    expect(teamRouteHtml).toContain('id="vadim-suzdalsky"');
    window.history.pushState({}, '', '/');
  });

  it('keeps team JSON-LD valid for organization and founder persons', () => {
    const html = renderToStaticMarkup(createElement(TeamJsonLd));
    const json = html.replace('<script type="application/ld+json">', '').replace('</script>', '');
    const schemas = JSON.parse(json);

    expect(schemas).toHaveLength(3);
    expect(schemas[0]['@type']).toBe('Organization');
    expect(schemas.filter((schema: { '@type': string }) => schema['@type'] === 'Person')).toHaveLength(2);
    expect(JSON.stringify(schemas)).toContain('Сергей Савкин');
    expect(JSON.stringify(schemas)).toContain('Вадим Суздальский');
  });

  it('renders the standalone team page with compact FAQ and final contact CTA', () => {
    const html = renderToStaticMarkup(createElement(FounderProfilePage));

    expect(html).toContain('Кто основал Суздальскую IT Долину?');
    expect(html).toContain('Почему такая команда важна для Долины');
    expect(html).toContain('href="/#contact"');
  });
});
