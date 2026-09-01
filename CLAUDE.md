# AM DXB — AI maintenance handoff (Cursor + Claude)

Use this file so **Cursor**, **Claude Code**, and **Claude Projects** share the same context.

## Source of truth

| Item | Value |
|------|--------|
| **GitHub** | https://github.com/melotoxin/Analyze-Market-FZE |
| **Branch** | `main` |
| **Canonical local folder** | `C:\Users\syedm\Downloads\Analyze-Market-FZE-main` |
| **Live site** | https://amdxb.com (Vercel deploy from `main`) |
| **Local dev** | `npm run dev -- --port 5173 --strictPort` from the folder above |

> **Do not use** `Analyze-Market-FZE` (without `-main`) — that copy is stale.  
> **Port 5173** must run from `-main` only; another Vite starter in `Downloads\local cursor\frontend` previously hijacked this port.

Always **pull before editing**, **commit + push after** so both assistants see the same code.

## Stack

- React 18 + TypeScript + Vite 6 + Tailwind
- Vercel serverless: `api/lead.ts` → Resend email
- No database; content in `src/data/`
- CSP hash sync: `scripts/check-csp-hash.mjs` + `vercel.json`

## Licence constraints (trade licence **6702**, SRTI Park)

Licensed activities only:

1. Research and Information Services  
2. Management Consultancy  
3. Feasibility Studies Consultancy  

Office: Block B – **B34-047** (not B34-B047). Expiry: 16/01/2027.

Do **not** over-claim: no fake ISO badges, “guaranteed banking”, audit services, or bookkeeping unless clearly framed as third-party / facilitation. Cloud accounting = software setup advisory, not bookkeeping.

## Recent work on `main` (Sep 2026)

- Email advisory mirrors WhatsApp (`src/utils/submitLead.ts`, `contact@amdxb.com`)
- Hero: static Burj poster at `public/hero/burj-poster.jpg` (no stock Mixkit autoplay)
- Optional custom hero video: drop `public/hero/burj-hero.mp4`, see `public/hero/FLOW-HERO.md`
- Navbar letter-blink hover (`NavBlinkText.tsx`, `src/index.css`)
- Client stories carousel arrows; service cards without checklist bullets
- FAQ WhatsApp + email CTAs; mobile dock hover states
- CodeRabbit fixes: lead PII logs, CSP script-src, liquidation copy, `mailto:` in `openExternal`
- Free-zone images corrected (no wrong city stock photos)

## Pending / optional

- [ ] Licence-only content pass (remove overstated sections: fake case studies claims, jurisdiction comparison fluff, etc.)
- [ ] Generate hero video via Google Flow → `public/hero/burj-hero.mp4`
- [ ] Verify `og-image.png` on production after deploy
- [ ] Resend domain verification for `amdxb.com`

## Key paths

```
src/App.tsx                          # Home sections, routing
src/components/hero/                 # Hero + Venture Estimator
src/utils/submitLead.ts              # WhatsApp + mailto + /api/lead
api/lead.ts                          # Lead API (needs RESEND_API_KEY on Vercel)
src/data/servicesData.ts             # Six services + detail pages
src/data/pricing.ts                  # Single source for all prices
vercel.json                          # CSP + SPA rewrites
```

## Commands

```bash
npm install
npm run dev -- --port 5173 --strictPort   # front end only; forms need vercel dev
npx vercel dev                            # front end + /api/lead
npm test
npm run build
```

## Env (see `.env.example`)

- `RESEND_API_KEY` — required for lead email
- `LEAD_TO_EMAIL` — defaults to `info@amdxb.com`
- Public contact mailto: `contact@amdxb.com`

## Untracked locally (not in git)

`.amdxb-live.html`, `.license-page1.png`, `adrevnview-ads/`, `matzop-ads/` — do not commit unless the user asks.

## Workflow for two assistants

1. `git pull origin main`
2. Edit in **one** canonical folder (`Analyze-Market-FZE-main`)
3. `npm test && npm run build` before push
4. `git push origin main` — Vercel auto-deploys
5. Update this file when architecture or licence rules change
