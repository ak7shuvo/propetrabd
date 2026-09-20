# PROPETRABANGLADESH — v1.5

Public-facing website for **PROPETRA**, a property management platform developed and operated by **TEAM PETRA**.

## v1.5

Interactive release: working hero room board, scroll-driven property story, command palette (Ctrl/Cmd + K). See `docs/DESIGN-SYSTEM.md`.

## v1.4

Visual and UX upgrade: black + cream + red identity, new hero, tone-based card system, motion system. See `docs/DESIGN-SYSTEM.md` and `PROJECT-STATE.md`. Functionality is unchanged from v1.3.

## Phase 4 (conversion + contact)

**Phase 4 — Conversion + Contact**

Phase 4 adds the documented conversion layer on top of the Phase 1–3 foundation:

- `/request-demo` — qualified demo request flow
- `/contact` — general contact flow
- Shared client-side forms with required-field and email validation
- Server-side payload validation and honeypot handling
- Explicit submitting, success and error states
- Provider-agnostic server-side lead forwarding through `LEAD_ENDPOINT`
- Real conversion CTAs throughout the public site now point to `/request-demo`
- No lead is claimed as delivered unless an endpoint is configured and accepts it

## Lead configuration

Copy `.env.example` to `.env.local` and set:

```bash
LEAD_ENDPOINT=https://your-approved-lead-service.example/endpoint
```

The server route at `/api/leads` validates the request and forwards the normalized payload to that configured endpoint. If `LEAD_ENDPOINT` is missing, the UI shows a clear configuration error rather than pretending that a lead was submitted.

## Run locally

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm start
```

## Product/content boundaries

PROPETRA is the product. PropetraBangladesh is the public website. TEAM PETRA is the builder/operator.

The site does not invent customers, testimonials, statistics, awards, certifications, partnerships, integrations, uptime commitments or security attestations. Dashboard figures remain explicitly illustrative.

## Phase boundaries

This phase implements the conversion/contact experience and its integration boundary. It does not introduce a property-booking engine, authenticated PMS application, CRM database, or fabricated submission storage.

## Handoff hygiene

The handoff package excludes `node_modules`, `.next`, build caches, `.env` files and secrets. `.env.example` is included as the configuration template.
