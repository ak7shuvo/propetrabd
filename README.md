# PROPETRABANGLADESH

**Public-facing website for PROPETRA — a property management platform developed and operated by TEAM PETRA.**

---

## Overview

PROPETRABANGLADESH is the public-facing website for **PROPETRA**, providing product information, solutions, resources, and conversion-focused contact experiences for prospective users.

The website is built as a polished public product site while keeping a clear separation between:

- **PROPETRA** — the product
- **PropetraBangladesh** — the public website
- **TEAM PETRA** — the builder and operator

---

## Current Phase

### Phase 4 — Conversion + Contact

Phase 4 builds the conversion and contact layer on top of the Phase 1–3 foundation.

### Included

- **Request a Demo** flow at `/request-demo`
- **Contact** flow at `/contact`
- Shared client-side form components
- Required-field validation
- Email format validation
- Submitting, success, and error states
- Server-side payload validation
- Honeypot handling
- Provider-agnostic lead forwarding
- Configurable `LEAD_ENDPOINT`
- Conversion CTAs throughout the public website
- Clear configuration feedback when lead delivery is not configured

All primary conversion CTAs direct users to the `/request-demo` experience.

---

## Lead Handling

Lead forwarding is intentionally provider-agnostic.

The server route:

```text
/api/leads
