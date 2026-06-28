import { createServer } from 'node:http';
import { createServer as createViteServer, loadEnv } from 'vite';
import { handleContactRequest } from './contact-api.mjs';

const mode = 'development';
const loadedEnv = loadEnv(mode, process.cwd(), '');
for (const [key, value] of Object.entries(loadedEnv)) {
  if (process.env[key] === undefined) process.env[key] = value;
}

const port = Number(process.env.PORT || 3000);
const vite = await createViteServer({
  mode,
  server: { middlewareMode: true },
  appType: 'spa'
});

createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://127.0.0.1:${port}`);

  if (url.pathname === '/api/contact') {
    await handleContactRequest(request, response);
    return;
  }

  vite.middlewares(request, response, () => {
    response.statusCode = 404;
    response.end('Not found');
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`Development server running at http://127.0.0.1:${port}`);
});
