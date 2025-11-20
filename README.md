# Scolaia Learning Platform

Modern planning toolkit for teachers featuring:

- **Landing search** that surfaces suggested activities, related blog posts, and partner resources
- **Activities library** with filterable cards and deep-dive detail pages
- **Ask Askia** assistant panel that mocks AI coaching responses
- **Node + Express API** (TypeScript) that serves the same mock datasets for future integration

## Project structure

```
.
├─ src/                # React + Vite frontend
├─ public/
├─ server/             # Node/Express API
└─ shared configs      # tsconfig, eslint, etc.
```

## Requirements

- Node.js 20+
- npm 10+

## Frontend scripts

```bash
# from repo root
npm install           # install frontend deps
npm run dev           # start Vite dev server (defaults to http://localhost:5173)
npm run build         # type-check + build production bundle
npm run preview       # preview the production build
```

## Backend scripts

```bash
cd server
npm install           # install backend deps (already done once)
npm run dev           # start Express server with hot reload (http://localhost:4000/api)
npm run build         # compile to dist/
npm start             # run the compiled server
```

### API routes

- `GET /health` – uptime + status check
- `GET /api/activities` – list all mock activities
- `GET /api/activities/:id` – fetch a single activity
- `GET /api/blog-posts` – blog summaries
- `GET /api/partners` – partner/external resources
- `POST /api/chat` – `{ prompt: string }` → AI-style suggestion payload

The backend currently serves static data; hook it to a real datastore when ready.

### Environment variables

- `VITE_API_BASE_URL` – Frontend base URL for the API (defaults to `http://localhost:4000/api`). Set this when deploying so the SPA talks to the correct backend host.

## Next steps

- Wire the React app’s data requests to the API instead of local imports
- Persist chat history and activity saves once authentication is available
- Add integration tests for backend routes
