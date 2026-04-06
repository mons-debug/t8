@AGENTS.md

# T8 Auto — Car Rental Website + Dashboard

## What This Is
Website + admin dashboard for T8 Auto, a car rental agency in Tanger, Morocco.

## Context
- Client docs & plans: `/Users/mac/assist/clients/t8/`
- Research report: `/Users/mac/assist/clients/t8/reference/t8-research-report.html`
- Implementation plan: `/Users/mac/assist/clients/t8/plans/t8-ultra-implementation-plan.html`

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Neon Postgres + Drizzle ORM
- NextAuth v5 (admin-only auth)
- Cloudinary (images)
- Tailwind CSS v4 + shadcn/ui
- FullCalendar (booking calendar)
- Vercel (hosting)

## Brand
- Primary color: Red (#e53935)
- Background: Cream (#faf6f1)
- Cards: White
- Font: Inter
- Language: French (Arabic-ready later)

## Structure
- `/src/app/` — Public pages (homepage, cars, booking, contact)
- `/src/app/admin/` — Dashboard (fleet, bookings, calendar, settings)
- `/src/app/api/` — API routes (public + admin)
- `/src/components/public/` — Public site components
- `/src/components/admin/` — Dashboard components
- `/src/db/` — Database schema + seed
- `/src/lib/` — Utilities (auth, booking logic, cloudinary, whatsapp)
- `/src/actions/` — Server actions

## Rules
1. Mobile-first design — phone users are primary
2. French language throughout public site
3. Red CTAs on cream/white backgrounds
4. Big car photos — cars sell themselves
5. Commit after every completed task
