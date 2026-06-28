import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { loadEnv } from 'vite';
import { handleContactRequest } from './contact-api.mjs';

const root = join(process.cwd(), 'dist');
const loadedEnv = loadEnv('production', process.cwd(), '');
for (const [key, value] of Object.entries(loadedEnv)) {
  if (process.env[key] === undefined) process.env[key] = value;
}
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '0.0.0.0';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${host}:${port}`);

  if (url.pathname === '/api/contact') {
    await handleContactRequest(request, response);
    return;
  }

  const cleanPath = normalize(decodeURIComponent(url.pathname))
    .replace(/^[/\\]+/, '')
    .replace(/^(\.\.[/\\])+/, '');
  let filePath = join(root, cleanPath ? cleanPath : 'index.html');

  if (!existsSync(filePath)) {
    filePath = join(root, 'index.html');
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error('Not a file');
    response.setHeader('Content-Type', mimeTypes[extname(filePath)] ?? 'application/octet-stream');
    createReadStream(filePath).pipe(response);
  } catch {
    response.statusCode = 404;
    response.end('Not found');
  }
}).listen(port, host, () => {
  console.log(`Serving ${root} at http://${host}:${port}`);
});
