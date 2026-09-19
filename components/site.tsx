"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Building, Calendar, Check, ChevronDown, Menu, Users } from "./icons";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="PropetraBangladesh home">
      <span className="brand-mark"><span /></span>
      <span>
        <strong>PROPETRA</strong>
        {!compact && <small>Property Management</small>}
      </span>
    </Link>
  );
}

const nav = [
  ["Product", "/product"],
  ["Solutions", "/solutions"],
  ["Features", "/features"],
  ["How It Works", "/how-it-works"],
  ["Why PROPETRA", "/why-propetra"],
  ["About", "/about"],
  ["Resources", "/resources"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="navbar">
        <div className="container nav-inner">
          <Brand />
          <nav
            className={open ? "nav-links open" : "nav-links"}
            aria-label="Primary navigation"
          >
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={pathname === href ? "active" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <a
              className="nav-demo mobile-demo"
              href="/request-demo"
              onClick={() => setOpen(false)}
            >
              Request a Demo <ArrowRight size={15} />
            </a>
          </nav>
          <a className="nav-demo desktop-demo" href="/request-demo">
            Request a Demo <ArrowRight size={15} />
          </a>
          <button
            type="button"
            className="menu-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <Menu />
          </button>
        </div>
      </header>
    </>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow"><span />{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading ${align}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export function CTASection({
  title = "See PROPETRA in action.",
  text = "Tell us about your property and the operational work you want to manage. The demo request workflow is now available through the conversion page.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta section">
      <div className="container cta-inner">
        <div>
          <Eyebrow>SEE PROPETRA IN ACTION</Eyebrow>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <a className="btn primary large" href="/request-demo">
          Request a Demo <ArrowRight />
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <Brand />
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link href="/product">Product</Link>
            <Link href="/features">Features</Link>
            <Link href="/solutions">Solutions</Link>
            <Link href="/how-it-works">How It Works</Link>
          </div>
          <div>
            <strong>Company</strong>
            <Link href="/why-propetra">Why PROPETRA</Link>
            <Link href="/about">TEAM PETRA</Link>
            <Link href="/resources">Resources</Link>
          </div>
          <div>
            <strong>Solutions</strong>
            <Link href="/solutions/hotels">Hotels</Link>
            <Link href="/solutions/resorts">Resorts</Link>
            <Link href="/solutions/boutique-properties">Boutique Properties</Link>
            <Link href="/solutions/guest-houses">Guest Houses</Link>
            <Link href="/solutions/serviced-apartments">Serviced Apartments</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 TEAM PETRA. PROPETRA is a property management platform.</span>
        <span>
          <Link href="/contact">Contact TEAM PETRA</Link>
          {" · "}PropetraBangladesh
        </span>
      </div>
    </footer>
  );
}

export function ProductPreview() {
  return (
    <div className="product-shell" aria-label="Illustrative PROPETRA dashboard preview">
      <div className="product-top">
        <div className="window-controls"><i /><i /><i /></div>
        <span>PROPETRA / Overview</span>
        <span className="product-date">Today · Demo</span>
      </div>
      <div className="product-body">
        <aside className="product-side">
          <div className="mini-logo">P</div>
          {["Overview","Reservations","Rooms","Guests","Housekeeping","Billing","Reports"].map((x, i) => (
            <div className={i === 0 ? "side-item active" : "side-item"} key={x}>{x}</div>
          ))}
        </aside>
        <div className="dash">
          <div className="dash-head">
            <div>
              <span className="dash-kicker">Property overview</span>
              <h3>Good morning, team.</h3>
            </div>
            <span className="demo-pill">DEMO DATA</span>
          </div>
          <div className="metric-grid">
            <Metric label="Occupancy" value="78.4%" note="Illustrative" />
            <Metric label="Arrivals" value="18" note="Illustrative" />
            <Metric label="Departures" value="12" note="Illustrative" />
            <Metric label="Revenue" value="৳184,500" note="Illustrative" />
          </div>
          <div className="dash-lower">
            <div className="room-card">
              <div className="card-title">
                <span>Room status</span>
                <small>Example view</small>
              </div>
              <div className="room-stats">
                <Room label="Occupied" value="68" cls="occupied" />
                <Room label="Available" value="24" cls="available" />
                <Room label="Dirty" value="9" cls="dirty" />
                <Room label="OOS" value="3" cls="oos" />
              </div>
              <div className="room-bars">
                <span style={{ width: "68%" }} />
                <span style={{ width: "24%" }} />
                <span style={{ width: "8%" }} />
              </div>
            </div>
            <div className="reservation-card">
              <div className="card-title">
                <span>Upcoming arrivals</span>
                <small>Example view</small>
              </div>
              {["Rahman · Deluxe 204", "Chowdhury · Suite 301", "Ahmed · Standard 108"].map((x, i) => (
                <div className="reservation-row" key={x}>
                  <span className="avatar">{x[0]}</span>
                  <div>
                    <strong>{x.split(" · ")[0]}</strong>
                    <small>{x.split(" · ")[1]}</small>
                  </div>
                  <b>{i === 0 ? "14:30" : i === 1 ? "15:00" : "16:15"}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function Room({ label, value, cls }: { label: string; value: string; cls: string }) {
  return (
    <div className="room">
      <span className={`room-dot ${cls}`} />
      <div>
        <strong>{value}</strong>
        <small>{label}</small>
      </div>
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  text,
  children,
}: {
  kicker: string;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="inner-hero">
      <div className="container">
        <span className="page-kicker">{kicker}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        {children && <div className="hero-actions">{children}</div>}
      </div>
    </section>
  );
}

export function TrustCard({ title, text, icon }: { title: string; text: string; icon: "check" | "building" | "users" }) {
  return (
    <article className="trust-card">
      <div className="trust-icon">
        {icon === "check" ? <Check /> : icon === "building" ? <Building /> : <Users />}
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <details key={item.q} open={i === 0}>
          <summary>{item.q}<ChevronDown size={18} /></summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export const solutionIcons = [Building, Building, Calendar, Users, Building];
export function SolutionCard({
  title,
  text,
  href,
  index,
}: {
  title: string;
  text: string;
  href: string;
  index: number;
}) {
  const Icon = solutionIcons[index % solutionIcons.length];
  return (
    <article className="solution-card">
      <div className="solution-icon"><Icon /></div>
      <span>0{index + 1}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <Link href={href}>Explore <ArrowRight size={15} /></Link>
    </article>
  );
}
