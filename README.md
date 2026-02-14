# T&R Car Detail Website

Moderne website voor T&R Car Detail: React-frontend en Express-API onder één project.

## Tech Stack

**Frontend**
- Vite + React 19 + TypeScript
- React Router, Tailwind CSS, Framer Motion, React Icons

**Backend**
- Node.js + Express + TypeScript
- SQLite (better-sqlite3), Nodemailer

## Waarom aparte frontend- en backend-mappen?

- **Verschillende omgevingen:** frontend draait in de browser, backend op Node (API, database, e-mail).
- **Verschillende dependencies:** React/Vite vs Express/SQLite; gescheiden `package.json` houdt installs en builds overzichtelijk.
- **Flexibele deploy:** frontend kan statisch (bijv. Vercel), API apart (bijv. Railway/Render) of later gecombineerd.

De mappen zijn dus vooral een logische scheiding; je runt alles vanuit de root.

## Starten (aanbevolen)

Vanuit de **projectroot**:

```bash
npm install
npm run dev
```

- Frontend: http://localhost:3001 (Vite proxy stuurt `/api` door naar de backend)
- Backend: http://localhost:5000

Eén commando start dus zowel de site als de API.

## Scripts (root)

| Script | Beschrijving |
|--------|--------------|
| `npm run dev` | Start frontend + backend tegelijk |
| `npm run dev:frontend` | Alleen frontend (poort 3001) |
| `npm run dev:backend` | Alleen backend (poort 5000) |
| `npm run build` | Build frontend (o.a. voor deploy) |
| `npm run build:backend` | Compileer backend TypeScript |
| `npm run start:backend` | Start backend (na build) |

## Projectstructuur

```
trcardetail/
├── package.json       # Root: workspaces + dev-scripts
├── frontend/          # React-app (Vite)
│   ├── src/
│   └── package.json
├── backend/           # Express-API (bookings, contact, services)
│   ├── src/
│   └── package.json
└── README.md
```

## Functies

- Diensten- en prijspagina’s
- Boekingssysteem (formulier + API)
- Contactformulier
- FAQ, Over ons, team (Thibo & Renzo)
- Responsive design
