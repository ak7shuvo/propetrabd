# DESIGN SYSTEM — v1.4

Identity: **black + cream + red**. Green is a status colour only.

## Colour tokens (`app/globals.css`, section 1)

| Role | Token | Value |
| --- | --- | --- |
| Black | `--black` / `--charcoal` / `--charcoal-2` | #0b0a09 / #1a1613 / #262019 |
| Cream | `--ivory` / `--cream` / `--cream-deep` | #fbf8f1 / #f2eadb / #e8dcc4 |
| Red | `--red` / `--red-dark` / `--red-bright` | #c1272d / #9c1e24 / #f0575c (text on black) |
| Red tints | `--red-tint` / `--red-wash` | #f7e1db (light cards) / #2b1512 (dark cards) |
| Green (status only) | `--green-status` / `--green-tint` | #2e9d5f / #dcf0e4 |
| Text | `--ink` / `--ink-muted` / `--on-dark` / `--on-dark-muted` | #17130f / #5d5449 / #f2eadb / #b4a998 |

Green is allowed only for: positive metric deltas, "available" room status, success/confirmation states. Never for brand surfaces, buttons, or section backgrounds.

Dark sections (`.navbar`, `.hero`, `.inner-hero`, `.product`, `.footer`, `.cta-inner`, `.why-card`) flip the context tokens `--fg`, `--fg-muted`, `--rule`, `--accent`, `--focus`.

## Section background order (homepage)

Hero black → metrics ivory → problem cream → solutions ivory → features cream → platform preview charcoal → how it works ivory → why cream → team ivory → CTA panel black → footer black.

## Card tone system

Cards read `--card-bg/-fg/-muted/-line/-icon-bg/-icon-fg/-link`. Tones are assigned by position (`:nth-child`) so a card never matches its section or its neighbours: white, black, cream, soft red, charcoal, ivory. Add a new card type by adding it to the shared selector group in section 9.

## Typography

- JetBrains Mono: display headings, navigation, buttons, eyebrows, metrics, UI labels.
- Inter: reading text (paragraphs, card descriptions).
- Scale: hero `clamp(46px, 6.5vw, 88px)`, section `clamp(28px, 3.5vw, 44px)`, card titles 19–26px, body 15–18px.

## Motion

- Transform/opacity only; no animation library.
- Hero: load choreography (copy fade-up, facade reveal, windows lighting floor by floor, floating cards).
- Scroll: `components/reveal.tsx` (single IntersectionObserver). Content is only hidden after JS confirms it can reveal it.
- `prefers-reduced-motion: reduce` disables animation, transitions and hidden reveal states.

## Rules

- No emoji or sparkle glyphs as UI decoration; use line icons from `components/icons.tsx`.
- Dashboard figures remain illustrative and labelled as such. Homepage scope numbers (modules, property types) are derived from `lib/data.ts`, never invented.
- Responsive targets: 320px, 560px, 800px, 980px (mobile navigation), 1140px+.
