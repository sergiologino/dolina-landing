import { founders } from '../data/founders';

const siteUrl = import.meta.env.NEXT_PUBLIC_SITE_URL || import.meta.env.VITE_SITE_URL || 'https://DOMAIN_PLACEHOLDER';
const normalizedSiteUrl = siteUrl.replace(/\/$/, '');

export function TeamJsonLd() {
  const personSchemas = founders.map((founder) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${normalizedSiteUrl}/team#${founder.id}`,
    name: founder.name,
    jobTitle:
      founder.id === 'vadim-suzdalsky'
        ? 'Идеолог территориального развития и концепции Suzdal Millennium'
        : founder.role,
    worksFor: {
      '@type': 'Organization',
      name: 'Суздальская IT Долина'
    },
    knowsAbout: founder.tags
  }));

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${normalizedSiteUrl}/#organization`,
    name: 'Суздальская IT Долина',
    alternateName: 'Suzdal IT Valley',
    founder: founders.map((founder) => ({ '@id': `${normalizedSiteUrl}/team#${founder.id}` }))
  };

  return <script type="application/ld+json">{JSON.stringify([organizationSchema, ...personSchemas])}</script>;
}

