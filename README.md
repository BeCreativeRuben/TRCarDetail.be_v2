# T&R Car Detail Website

Moderne website voor T&R Car Detail: één Next.js-app met pagina’s en API-routes. E-mail via Nodemailer + Gmail SMTP.

## Tech Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS**, Framer Motion, React Icons
- **API-routes:** `/api/contact`, `/api/bookings`, `/api/health`
- **E-mail:** Nodemailer, Gmail SMTP (poort 587, TLS). Geen externe dienst (geen Resend/SendGrid).
- **Config:** `lib/email.ts` (transport + handmatige HTML/plain templates)

## Starten

```bash
npm install
npm run dev
```

- Site + API: http://localhost:3000  
- Contact- en boekingsformulieren posten naar `/api/contact` en `/api/bookings`.

## Scripts

| Script       | Beschrijving        |
|-------------|---------------------|
| `npm run dev`   | Next.js dev server (poort 3000) |
| `npm run build` | Next.js productie-build        |
| `npm run start` | Next.js start (na build)       |
| `npm run lint`  | Next.js lint                    |

## Projectstructuur

```
trcardetail/
├── app/                 # Next.js App Router
│   ├── api/             # API-routes (contact, bookings, health)
│   ├── about/
│   ├── booking/
│   ├── contact/
│   ├── faq/
│   ├── services/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/          # Layout, UI, sections, booking
├── lib/                 # email.ts, types, cars, images
├── public/
├── package.json
├── next.config.mjs
├── tailwind.config.ts
└── README.md
```

## Oude mappen verwijderen

Als de mappen `frontend/` en `backend/` nog bestaan (van vóór de migratie), kun je ze handmatig verwijderen. Sluit eerst eventuele dev-servers en IDE-processen die bestanden in die mappen gebruiken, daarna:

```bash
# PowerShell (in projectroot)
Remove-Item -Recurse -Force frontend, backend
```

## Functies

- Home, Diensten, Over ons, Contact, FAQ, Boeken
- Boekingsformulier (service, datum, tijd, voertuig, gegevens) → e-mail
- Contactformulier → e-mail naar admin + autoreply
- Team (Thibo & Renzo), testimonials, CTA-secties
- Responsive design
