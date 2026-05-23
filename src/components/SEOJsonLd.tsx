const siteUrl = import.meta.env.NEXT_PUBLIC_SITE_URL || import.meta.env.VITE_SITE_URL || 'https://DOMAIN_PLACEHOLDER';

export function SEOJsonLd() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Суздальская IT Долина',
      url: siteUrl,
      inLanguage: 'ru-RU',
      description:
        'Будущая технологическая резиденция под Суздалем для IT-команд, инженеров, исследователей и инвесторов.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Суздальская IT Долина',
      alternateName: 'Suzdal IT Valley',
      description: 'Резиденция IT-команд, инженеров, исследователей и технологических проектов под Суздалем',
      areaServed: 'Россия',
      sameAs: []
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: 'Суздальская IT Долина',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'RU',
        addressRegion: 'Владимирская область',
        addressLocality: 'Суздаль'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 'TODO_LATITUDE',
        longitude: 'TODO_LONGITUDE'
      }
    }
  ];

  return <script type="application/ld+json">{JSON.stringify(schemas)}</script>;
}
