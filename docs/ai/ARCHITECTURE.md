# Архитектура

## Технологический стек

- React 19 и React DOM.
- TypeScript в строгом режиме.
- Vite 7 для разработки и production-сборки.
- Vitest 3 с окружением jsdom для тестов.
- CSS находится в едином файле `src/styles.css`.
- Иконки предоставляются пакетом `lucide-react`.

## Структура frontend-сервиса

- `index.html` — HTML-оболочка, основные meta-теги и точка подключения приложения.
- `src/main.tsx` — монтирование React-приложения и подключение стилей.
- `src/App.tsx` — композиция главной страницы и выбор страницы команды.
- `src/components/` — секции и переиспользуемые компоненты.
- `src/data/content.ts` — контент главной страницы и контактные настройки.
- `src/data/founders.ts` — данные основателей.
- `public/` — изображения, `robots.txt` и `sitemap.xml`.
- `scripts/generate-sitemap.mjs` — генерация SEO-файлов в `dist/`.
- `scripts/dev-server.mjs` — Vite dev middleware и контактный API в одном Node-процессе.
- `scripts/serve-dist.mjs` — production-сервер статики с fallback на `index.html` и контактным API.
- `scripts/contact-api.mjs` — валидация заявок и клиент `noteapp-ai-integration`.

## Выполнение и маршрутизация

Пользовательский интерфейс является клиентским SPA. `App` проверяет `window.location.pathname`: точное значение `/team` рендерит `FounderProfilePage`, остальные пути рендерят главную страницу. Библиотека маршрутизации не используется.

Главная страница собрана из последовательных React-секций. Навигация в основном использует якоря `#about`, `#residents`, `#investors`, `#roadmap`, `#products`, `#contact`; блок команды имеет якорь `#team`.

## Данные и внешние интеграции

- Контактная форма отправляет `multipart/form-data` в `POST /api/contact`.
- Сервер проверяет обязательные поля и лимит файла 10 МБ.
- Node-сервер вызывает `POST {AI_INTEGRATION_BASE_URL}/api/social/posts` с `X-API-Key`; прямых обращений к Telegram Bot API из лендинга нет.
- Полный текст заявки публикуется первым запросом посреднику. При наличии файла второй запрос передаёт документ в Base64 без caption.
- `noteapp-ai-integration` получает Telegram credentials транзитно и сам вызывает `sendMessage`/`sendDocument`.
- Секретные `AI_INTEGRATION_API_KEY`, `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` читаются только Node-процессом и не попадают в frontend bundle.
- Яндекс Метрика № 110250509 встроена в общую HTML-оболочку и загружается на всех SPA-маршрутах; Google Tag подключается через переменную окружения.
- JSON-LD формируется React-компонентами `SEOJsonLd` и `TeamJsonLd`.

## Сборка и проверка

- `npm run dev` — Vite и контактный API на `127.0.0.1:3000`.
- `npm test` — однократный запуск Vitest.
- `npm run build` — тесты, TypeScript-проверка, Vite-сборка и генерация sitemap/robots.
- `npm run preview` / `npm start` — production-сервер на `0.0.0.0:4173`; адрес и порт настраиваются через `HOST` и `PORT`.

Для работающей формы production-развёртывание должно запускать Node-сервер командой `npm start`; публикация только содержимого `dist/` на статическом хостинге не предоставляет `/api/contact`.

В Coolify команда запуска — `npm start`. Команда `npx vite preview` недопустима для production этого проекта, поскольку не обрабатывает серверную точку контактов.
