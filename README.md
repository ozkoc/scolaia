# Scolaia Learning Platform

Modern planning toolkit for teachers featuring:

- **Landing search** that surfaces suggested activities, community discussions, and partner resources
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
- `GET /api/community/topics` – community conversation starters
- `GET /api/community/topics/:id/discussion` – thread for a specific topic
- `GET /api/community/profiles` – educators participating in discussions
- `GET /api/partners` – partner/external resources
- `POST /api/chat` – `{ prompt: string }` → AI-style suggestion payload

The backend currently serves static data; hook it to a real datastore when ready.

### Environment variables

- `VITE_API_BASE_URL` – Frontend base URL for the API (defaults to `http://localhost:4000/api`). Set this when deploying so the SPA talks to the correct backend host.
- `AWS_REGION` – Region where AWS Bedrock is enabled (e.g., `eu-central-1`).
- `BEDROCK_MODEL_ID` – Bedrock model ID to invoke (e.g., `anthropic.claude-3-haiku-20240307-v1:0`).
- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` – Only required if the server is not running with an IAM role. Standard AWS credential chain is supported.

If `AWS_REGION`/`BEDROCK_MODEL_ID` are missing or Bedrock returns an error, the Askia chat route automatically falls back to handcrafted strategy suggestions so local development keeps working.

## Next steps

- Wire the React app’s data requests to the API instead of local imports
- Persist chat history and activity saves once authentication is available
- Add integration tests for backend routes
