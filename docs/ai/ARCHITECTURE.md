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
- `scripts/contact-api.mjs` — валидация заявок и интеграция с Telegram Bot API.

## Выполнение и маршрутизация

Пользовательский интерфейс является клиентским SPA. `App` проверяет `window.location.pathname`: точное значение `/team` рендерит `FounderProfilePage`, остальные пути рендерят главную страницу. Библиотека маршрутизации не используется.

Главная страница собрана из последовательных React-секций. Навигация в основном использует якоря `#about`, `#residents`, `#investors`, `#roadmap`, `#products`, `#contact`; блок команды имеет якорь `#team`.

## Данные и внешние интеграции

- Контактная форма отправляет `multipart/form-data` в `POST /api/contact`.
- Сервер проверяет обязательные поля и лимит файла 10 МБ.
- Текст заявки доставляется методом Telegram Bot API `sendMessage`; приложенный файл — отдельным вызовом `sendDocument`.
- Секретные `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` и опциональный `TELEGRAM_MESSAGE_THREAD_ID` читаются только Node-процессом и не попадают в frontend bundle.
- Google Tag и Яндекс Метрика подключаются только при наличии соответствующих переменных окружения.
- JSON-LD формируется React-компонентами `SEOJsonLd` и `TeamJsonLd`.

## Сборка и проверка

- `npm run dev` — Vite и контактный API на `127.0.0.1:3000`.
- `npm test` — однократный запуск Vitest.
- `npm run build` — тесты, TypeScript-проверка, Vite-сборка и генерация sitemap/robots.
- `npm run preview` / `npm start` — production-сервер на `127.0.0.1:4173` или порту из `PORT`.

Для работающей формы production-развёртывание должно запускать Node-сервер командой `npm start`; публикация только содержимого `dist/` на статическом хостинге не предоставляет `/api/contact`.
