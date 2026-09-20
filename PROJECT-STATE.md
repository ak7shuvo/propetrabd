# PROJECT STATE

Project: PETRA Bangladesh  
Product: PETRA  
Developer & Operator: TEAM PETRA  
Current Phase: 5 + v1.4 visual upgrade  
Status: Planned Phase 0–5 implementation complete; Phase 5 production polish and QA pass implemented.

## Implemented through Phase 4

- Next.js App Router + TypeScript foundation
- Responsive shared Navbar / mobile navigation / Footer
- Documented PETRA visual system and content boundaries
- Homepage, Product, Features, How It Works, Solutions, Why PETRA, TEAM PETRA and Resources
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
- Homepage restructured: hero, product scope band, problem, solutions, features (bento), platform preview, how it works, why PETRA, team, CTA. All copy reused from v1.3.
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

## v1.5 — Living property (interactive UI release)

Built on v1.4. Routes, API behaviour, dependencies and package versions unchanged; no new dependencies.

- Hero is now a working miniature room board (click or keyboard). See `docs/DESIGN-SYSTEM.md`.
- Homepage features section replaced by a scroll-driven "One building. Six modules." story using the same six feature entries from `lib/data.ts`.
- Section order: hero, scope band, problem, solutions, story, how it works, platform preview, why, team, CTA.
- New: command palette (Ctrl/Cmd + K, `/`), scroll progress hairline, pointer light on cards, film grain on hero and story.
- New files: `components/story.tsx`, `components/command-palette.tsx`, `components/effects.tsx`. Rewritten: `components/hero.tsx`.
- Room board on the hero replaces the fixed "Revenue today" card with live in-house / arriving / vacant counts.

Verification: client-side render of the homepage in Chromium; hero interaction (mouse and keyboard), all six story scenes, palette (open, filter, navigate, close, focus return), and overflow at 320 to 1440px, with no console errors or warnings. `npm run build` still needs to be run in a networked environment.

## v1.6 — Brand rename (PROPETRA to PETRA)

Branding-only release on top of v1.5. No design, layout, animation, route, API, form, dependency or version changes.

- Public brand is now **PETRA**; the public website is **PETRA Bangladesh**; TEAM PETRA is unchanged.
- Updated: visible UI text, aria-labels, page titles and descriptions, OpenGraph/Twitter metadata, JSON-LD (Organization brand, SoftwareApplication, WebSite), FAQ content, command palette labels, README, docs and phase audit notes.
- Intentionally preserved technical identifiers (renaming would change routes or tooling):
  - Route `/why-propetra` (folder `app/why-propetra`, links, sitemap entry, canonical path, docs listing it).
  - Package name `propetra-bangladesh` in `package.json` and `package-lock.json`.
  - Internal browser event name `propetra:palette` (search button to command palette).
- "Property Excellence Through Reliable Automation" still expands the new name (P-E-T-R-A).
