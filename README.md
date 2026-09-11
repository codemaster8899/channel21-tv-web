# Channel 21 TV — Web Frontend

Public-facing website for **Channel 21 TV** (21TV): programs, shows, films, on-air faces, schedule, live stream, and contact.

**Live demo:** [https://21-front-nu.vercel.app](https://21-front-nu.vercel.app)

## About

This is a React single-page app that talks to a Channel 21 backend API. Visitors can browse media content in Armenian, English, and Russian, open program/episode detail pages, search, and watch the live player.

## Tech stack

- **React 17** (Create React App)
- **Redux** + Redux Toolkit for app state
- **React Router** for navigation
- **Axios** for API calls
- **i18next** for AM / EN / RU localization
- **Tailwind CSS** + **MUI** for UI
- **Swiper / React Player** for carousels and video
- **Vercel** for hosting (`/api` proxied to the backend)

## Project structure

```
src/
  api/           HTTP helpers (GET/POST/PUT/DELETE)
  pages/         Route-level screens (Home, Programs, Shows, Faces, Films, Schedule, Contact)
  component/     Shared UI (Header, Footer, cards, carousels, layout)
  redux/         Store + reducers (programs, faces, schedule, search, live link, …)
  languages/     Translation files (hy, en, ru)
  utils/         Config and helpers
  assets/        Images and icons
```

### How it works

1. `App.jsx` boots the app and loads programs, shows, films, faces, live link, and contact data into Redux.
2. `routes.js` maps paths (`/`, `/programs`, `/shows`, `/faces`, `/films`, `/schedule`, `/contact_us`) to pages.
3. Shared chrome (header/footer, home hero/swiper) lives in `Layout` and header/footer containers.
4. Detail pages use `/tab_:id` for a specific program/show with episode cards and playback.
5. API base URL defaults to `/api/` (rewritten on Vercel to the backend). Override with `REACT_APP_API_URL` for local development.

## Getting started

```bash
npm install
npm run dev      # development server (react-scripts start)
npm run build    # production build
```

Optional local API override:

```bash
# .env.local
REACT_APP_API_URL=http://localhost:PORT/
```

## Features

- Multilingual UI (Armenian, English, Russian)
- Programs, shows, and films catalogs
- Faces / presenters section
- TV schedule
- Live stream playback
- Contact form and social links
- Dark theme support
- Search results page

## Author

**codemaster8899**
