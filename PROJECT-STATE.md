# PROJECT STATE

Project: PropetraBangladesh  
Product: PROPETRA  
Developer & Operator: TEAM PETRA  
Current Phase: 5 + v1.4 visual upgrade  
Status: Planned Phase 0–5 implementation complete; Phase 5 production polish and QA pass implemented.

## Implemented through Phase 4

- Next.js App Router + TypeScript foundation
- Responsive shared Navbar / mobile navigation / Footer
- Documented PROPETRA visual system and content boundaries
- Homepage, Product, Features, How It Works, Solutions, Why PROPETRA, TEAM PETRA and Resources
- Hotels, Resorts, Boutique Properties, Guest Houses and Serviced Apartments solution pages
- Trust/security concepts without unsupported certification or compliance claims
- Reusable product preview and page components
- `/request-demo` conversion page using the documented demo fields:
  - Name
  - Organization
  - Property Name
  - Property Type
  - Number of Rooms
  - Email
  - Phone
  - Message
- `/contact` general contact page
- Shared `DemoForm` component supporting demo and contact modes
- Client-side required-field/email validation plus accessible form labels
- Server-side `/api/leads` validation, field normalization and honeypot handling
- Configurable `LEAD_ENDPOINT` forwarding boundary
- Explicit submitting, success and error states
- All public Request a Demo CTAs now route to `/request-demo`
- `.env.example` with the only required integration variable
- README, project state and audit documentation updated

## Conversion integrity

The application never reports a successful lead submission when no lead endpoint is configured. In that state, the API returns a configuration error and the UI presents an error state. When configured, the API only reports success after the upstream endpoint returns a successful response.

No CRM/database, fake lead storage, customer records, or unsupported third-party integration has been invented.

## Phase 5 production polish

- Per-route canonical, Open Graph, Twitter and description metadata added.
- Organization, SoftwareApplication and WebSite structured data added without unsupported claims.
- Sitemap and robots routes added; absolute URLs are generated only when `NEXT_PUBLIC_SITE_URL` is configured.
- Keyboard focus, skip link, interactive target sizing, responsive controls and reduced-motion safeguards added.
- External Google Fonts CSS import removed to reduce network/rendering dependency.

## Verification

- Phase 0 documentation carried forward from the Phase 3 repository and reviewed before Phase 4 changes.
- Phase 3 source tree audited before modification.
- Route/source audit performed after implementation; legacy `#demo` conversion targets were removed.
- Final ZIP hygiene checked for `node_modules`, `.next`, build output, `.env` files, secrets and private keys.
- `npm run build` was attempted but could not execute because dependencies were not installed in the isolated environment; `npm install --no-audit --no-fund` timed out before creating `node_modules`.

## Known limitations

- A real lead destination must be supplied through `LEAD_ENDPOINT`; the repository intentionally does not invent an email address, CRM, database, or third-party provider.
- Full browser/device QA and production integration testing require a dependency-installed runtime and a configured lead endpoint.
- Full real-device/browser and production integration testing still requires a dependency-installed runtime, an approved production domain, and a configured real lead endpoint.

## v1.4 — Premium visual and UX transformation

Visual-only release on top of v1.3. Routes, API behaviour, dependencies and package versions are unchanged.

- New identity: black + cream + red. Green reduced to status indicators (see `docs/DESIGN-SYSTEM.md`).
- New homepage hero: "Smarter Stays. Stronger Business." with a hotel-facade visual where lit windows are occupied rooms, plus occupancy, booking and revenue cards (illustrative data, labelled).
- Homepage restructured: hero, product scope band, problem, solutions, features (bento), platform preview, how it works, why PROPETRA, team, CTA. All copy reused from v1.3.
- Section and card backgrounds now differ by design (tone system, section 9 of `globals.css`).
- `app/globals.css` rewritten around design tokens; JetBrains Mono for display/UI, Inter for body. Plus Jakarta Sans removed from the font request.
- Sparkle icon and its usages removed; replaced by purpose-specific line icons.
- Lightweight motion: CSS keyframes plus one IntersectionObserver (`components/reveal.tsx`); reduced-motion respected.
- Navigation: dark, active/hover underline, Escape closes the mobile menu, close icon, hamburger below 980px.
- Illustrative dashboard figures unified to one demo dataset (86% occupancy, 104 rooms).
- `.env.example` restored (documented in earlier phases but missing from the v1.3 archive).

## v1.4 verification

- Static render of all 11 pages, browser checks at 1440, 1024 and 390px wide, no horizontal overflow.
- Scroll-reveal logic tested in Chromium, including reduced-motion.
- CSS parsed with PostCSS, all `var()` tokens resolved, TypeScript checked against stubbed React/Next types.
- `npm run build` could not be run in the authoring environment (npm registry blocked). Run `npm install && npm run build` before deploying.
