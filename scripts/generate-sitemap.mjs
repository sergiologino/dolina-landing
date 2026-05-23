import { mkdir, writeFile } from 'node:fs/promises';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VITE_SITE_URL || 'https://DOMAIN_PLACEHOLDER';
const normalizedSiteUrl = siteUrl.replace(/\/$/, '');
const routes = ['/', '/products', '/residents', '/investors', '/contacts'];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${normalizedSiteUrl}${route}</loc></url>`).join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${normalizedSiteUrl}/sitemap.xml
`;

await mkdir('dist', { recursive: true });
await writeFile('dist/sitemap.xml', sitemap, 'utf8');
await writeFile('dist/robots.txt', robots, 'utf8');
