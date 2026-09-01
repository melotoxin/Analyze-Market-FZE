# AM DXB — AnalyzeMarkets FZE

Marketing and lead-generation site for AnalyzeMarkets FZE (SRTI Park, Sharjah).
React 18 + TypeScript + Vite + Tailwind, deployed on Vercel.

**Maintainers (Cursor + Claude):** read [`CLAUDE.md`](./CLAUDE.md) for canonical paths, licence limits, recent changes, and shared workflow. GitHub `main` is the single source of truth.

## Running locally

```bash
npm install
npm run dev -- --port 5173 --strictPort
```

Use the **`Analyze-Market-FZE-main`** folder only. If port 5173 shows a generic Vite “Get started” page, another project is bound to that port — stop it and restart dev from this repo.

`npm run dev` serves the front end only. The `/api/lead` endpoint is a Vercel
serverless function, so **forms will fail against `vite dev`** — that is expected,
and the UI shows a "please call us" fallback. To exercise the real endpoint:

```bash
npx vercel dev
```

## Required environment variables

Set these in **Vercel → Settings → Environment Variables** (and in `.env.local`
for `vercel dev`). See `.env.example`.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | **Yes** | Sends lead emails. Without it `/api/lead` returns 503 and writes the lead to the function log so nothing is lost. |
| `LEAD_TO_EMAIL` | No | Inbox for leads. Defaults to `info@amdxb.com`. |
| `LEAD_FROM_EMAIL` | No | Sender. Must be a Resend-verified domain; defaults to the Resend sandbox sender. |

> Until `amdxb.com` is verified in Resend, mail sends from `onboarding@resend.dev`
> and may land in spam. Verifying the domain is a one-time DNS step.

## Where leads go

All four capture points POST to `/api/lead`, which validates, rate-limits
(5/min/IP), screens a honeypot field, and emails the advisory inbox:

1. Consultation modal (every "Schedule Advisory" CTA)
2. Venture Estimator — also hands off to WhatsApp with a prefilled quote
3. Footer callback bar
4. Mobile bottom dock

If sending fails the user is shown the phone number rather than a false success,
and the lead is written to the Vercel function log as a backstop.

## Commands

```bash
npm run dev      # local dev server
npm run build    # CSP hash check + typecheck + production build
npm run preview  # serve the production build
npm test         # pricing model + lead API assertions
```

`npm run build` runs `scripts/check-csp-hash.mjs` first. That script keeps the
`script-src` hash in `vercel.json` in sync with the inline JSON-LD block in
`index.html` — edit the structured data and the hash updates itself, so the CSP
can never silently drop the rich-results markup.

## Pricing

All money lives in `src/data/pricing.ts` — rate table, base prices, add-ons and
`formatMoney`. Nothing else should hardcode a price or a conversion rate; three
components used to carry their own tables and disagreed with each other.
Update the annual tariffs there and every surface follows.

## Routing

Service pages are real URLs (`/services/<slug>`) driven by the History API in
`src/utils/router.ts` — no router dependency. `vercel.json` rewrites everything
except `/api/*` to `index.html`. Adding a service means adding it to
`SERVICES_CATALOG`, the footer list, and `public/sitemap.xml`.
