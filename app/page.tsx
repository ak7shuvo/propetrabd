import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Property Management, Simplified", "PROPETRA is a modern property management system for hospitality operations, bringing core property workflows into one platform.", "/");
import Link from "next/link";
import { ArrowRight, Building, Calendar, Chart, Check, Clipboard, Door, Home, Key, Receipt, Sun, Users } from "@/components/icons";
import { Eyebrow, ProductPreview, SectionHeading } from "@/components/site";
import { HeroVisual } from "@/components/hero";
import { features, productModules, propertyTypes, solutions } from "@/lib/data";

const featureIcons = [Calendar, Door, Users, Clipboard, Receipt, Chart];
const solutionIconSet = [Building, Sun, Key, Home];

export default function HomePage() {
  return (
    <main id="main-content">

      {/* 01 Hero */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="pulse" />
              Built for modern hospitality operations
            </div>
            <h1 className="hero-title">
              <span>Smarter</span>{" "}
              <span>Stays.</span>{" "}
              <span>Stronger</span>{" "}
              <span>Business<i className="stop" aria-hidden="true" /><b className="sr-only">.</b></span>
            </h1>
            <p>PROPETRA brings reservations, rooms, guests, front desk, housekeeping, billing and reporting into one clear property management platform.</p>
            <div className="hero-actions">
              <a className="btn primary large" href="/request-demo">Request a Demo <ArrowRight /></a>
              <Link className="btn ghost large" href="/product">Explore PROPETRA</Link>
            </div>
            <ul className="hero-note">
              <li>Centralized operations</li>
              <li>Role-based access</li>
              <li>Built for growth</li>
            </ul>
          </div>
          <HeroVisual />
        </div>
        <p className="hero-disclaimer container">Illustrative interface and demo data. Not customer or business statistics.</p>
      </section>

      {/* 02 Product scope */}
      <section className="metrics" aria-label="PROPETRA at a glance">
        <div className="container metrics-grid">
          <div className="metrics-intro">PROPETRA at a glance</div>
          <div><strong>{productModules.length}</strong><span>Core modules</span><small>From reservations to reporting</small></div>
          <div><strong>{solutions.length}</strong><span>Property types</span><small>Hotels to serviced apartments</small></div>
          <div><strong>1</strong><span>Shared workspace</span><small>Role-based access for every team</small></div>
        </div>
      </section>

      {/* 03 Problem */}
      <section className="problem section">
        <div className="container problem-grid">
          <div>
            <SectionHeading
              eyebrow="THE EVERYDAY CHALLENGE"
              title="Hospitality operations should feel connected."
              text="When reservations, room status, guest details and billing live across disconnected processes, teams spend time finding information instead of acting on it."
            />
          </div>
          <div className="problem-points">
            <div>
              <span className="problem-mark" aria-hidden="true" />
              <h3>Too many moving parts</h3>
              <p>Bookings, rooms, guests and staff activity need a shared operational picture.</p>
            </div>
            <div>
              <span className="problem-mark" aria-hidden="true" />
              <h3>Information gets scattered</h3>
              <p>Important updates become harder to follow when teams rely on separate tools and manual handoffs.</p>
            </div>
            <div>
              <span className="problem-mark" aria-hidden="true" />
              <h3>Managers need clarity</h3>
              <p>A practical overview helps teams understand what is happening across the property.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 Solutions */}
      <section className="solutions section" id="solutions">
        <div className="container">
          <div className="solutions-head">
            <SectionHeading
              eyebrow="DESIGNED FOR HOSPITALITY"
              title="Fits the way different properties operate."
              text="From hotels and resorts to smaller properties and apartment-style stays, PROPETRA is organized around property-level workflows."
            />
            <Link className="btn outline" href="/solutions">Explore solutions <ArrowRight /></Link>
          </div>
          <div className="solution-grid">
            {propertyTypes.slice(0, 4).map((p, i) => {
              const Icon = solutionIconSet[i];
              return (
                <article className="solution-card" key={p.title}>
                  <div className="solution-icon"><Icon /></div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <Link href={p.href}>Explore <ArrowRight size={16} /></Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05 Features */}
      <section className="features section" id="features">
        <div className="container">
          <SectionHeading
            eyebrow="CORE CAPABILITIES"
            title="A clearer way to run the property."
            text="Focused modules work together so your team can spend less time coordinating information and more time operating the property."
          />
          <div className="feature-grid">
            {features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <article className="feature-card" key={f.title}>
                  <div className="feature-icon"><Icon size={20} /></div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  {i === 0 && (
                    <div className="mini-timeline" aria-hidden="true">
                      <i style={{ left: "0%", width: "38%" }} />
                      <i style={{ left: "22%", width: "44%" }} />
                      <i style={{ left: "52%", width: "40%" }} />
                    </div>
                  )}
                  {i === 5 && (
                    <div className="mini-bars" aria-hidden="true">
                      {[38, 52, 44, 68, 58, 82, 74].map((h, n) => <i key={n} style={{ height: `${h}%` }} />)}
                    </div>
                  )}
                  <Link href="/features">Learn more <ArrowRight size={15} /></Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 06 Platform preview */}
      <section className="product section" id="product">
        <div className="container">
          <SectionHeading
            eyebrow="ONE OPERATIONAL WORKSPACE"
            title="Everything your team needs to manage the day."
            text="PROPETRA is designed around the real flow of a property: from reservation to room, from guest arrival to checkout, and from daily activity to management reporting."
            align="center"
          />
          <div className="product-large">
            <ProductPreview />
          </div>
          <ul className="module-chips" aria-label="PROPETRA modules">
            {productModules.map((m) => <li key={m.slug}>{m.title}</li>)}
          </ul>
          <p className="demo-disclaimer">Illustrative interface and demo data for product presentation. Not customer or business statistics.</p>
        </div>
      </section>

      {/* 07 How it works */}
      <section className="how section">
        <div className="container">
          <SectionHeading
            eyebrow="HOW IT WORKS"
            title="From setup to everyday operations."
            text="A straightforward operating model keeps the platform useful for both the team at the front desk and the people managing the property."
            align="center"
          />
          <div className="steps">
            <div className="step">
              <span>01</span>
              <div>
                <h3>Set up your property</h3>
                <p>Organize rooms, users, roles and property information in a central workspace.</p>
              </div>
            </div>
            <div className="step">
              <span>02</span>
              <div>
                <h3>Manage daily operations</h3>
                <p>Work through reservations, room status, guests, housekeeping and billing from connected workflows.</p>
              </div>
            </div>
            <div className="step">
              <span>03</span>
              <div>
                <h3>Understand what is happening</h3>
                <p>Use operational visibility and reporting to support day-to-day management decisions.</p>
              </div>
            </div>
          </div>
          <div className="center-link">
            <Link href="/how-it-works">Explore the full workflow <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* 08 Why PROPETRA */}
      <section className="why section">
        <div className="container why-grid">
          <div className="why-copy">
            <SectionHeading
              eyebrow="WHY PROPETRA"
              title="Built around practical property management."
              text="The platform is designed to be understandable for teams, structured for managers and maintainable as the product grows."
            />
            <div className="why-list">
              <div>
                <Check />
                <span>
                  <strong>Centralized operations</strong>
                  <small>Keep core property activity in one workspace.</small>
                </span>
              </div>
              <div>
                <Check />
                <span>
                  <strong>Role-based access</strong>
                  <small>Give people access according to their responsibilities.</small>
                </span>
              </div>
              <div>
                <Check />
                <span>
                  <strong>Multi-tenant foundation</strong>
                  <small>Separate property workspaces, users, permissions and operational data.</small>
                </span>
              </div>
              <div>
                <Check />
                <span>
                  <strong>Practical product direction</strong>
                  <small>Built around documented hospitality workflows rather than unsupported promises.</small>
                </span>
              </div>
            </div>
            <Link className="inline-link" href="/why-propetra">Why PROPETRA <ArrowRight size={16} /></Link>
          </div>
          <div className="why-card">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="why-center">
              <span className="mini-logo large">P</span>
              <strong>PROPETRA</strong>
              <small>Property Excellence<br />Through Reliable Automation</small>
            </div>
            <div className="orbit-label l1">Operations</div>
            <div className="orbit-label l2">People</div>
            <div className="orbit-label l3">Property</div>
            <div className="orbit-label l4">Insights</div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team section">
        <div className="container team-box">
          <div>
            <Eyebrow>BUILT BY TEAM PETRA</Eyebrow>
            <h2>Technology with a hospitality-first mindset.</h2>
            <p>TEAM PETRA is building PROPETRA as a dedicated hospitality technology platform. The goal is practical software that helps property teams manage their work with greater clarity.</p>
          </div>
          <Link className="btn outline" href="/about">Meet TEAM PETRA <ArrowRight /></Link>
        </div>
      </section>

      {/* 09 CTA */}
      <section className="cta section" id="demo">
        <div className="container cta-inner">
          <div>
            <Eyebrow>SEE PROPETRA IN ACTION</Eyebrow>
            <h2>Let&apos;s talk about your property.</h2>
            <p>Use the dedicated request flow to share your property context and start a product conversation with TEAM PETRA.</p>
          </div>
          <a className="btn primary large" href="/request-demo">Request a Demo <ArrowRight /></a>
        </div>
      </section>

    </main>
  );
}
