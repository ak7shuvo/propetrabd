import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Check } from "@/components/icons";
import { productModules } from "@/lib/data";

export const metadata = pageMetadata(
  "Features",
  "Explore PROPETRA modules for reservations, rooms, front desk, guests, housekeeping, billing, payments, roles and reporting.",
  "/features",
);

function Panel({
  m,
  i,
}: {
  m: typeof productModules[number];
  i: number;
}) {
  return (
    <article className="feature-panel">
      <div className="feature-panel-copy">
        <span className="module-index">0{i + 1}</span>
        <span className="page-kicker">{m.kicker}</span>

        <h2>{m.title}</h2>
        <p>{m.text}</p>

        <ul>
          {m.bullets.map((b) => (
            <li key={b}>
              <Check size={16} />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="feature-ui">
        <div className="ui-bar">
          <span>{m.title}</span>
          <b>DEMO</b>
        </div>

        <div className="ui-content">
          <div className="ui-lines">
            <i />
            <i />
            <i />
            <i />
          </div>

          <div className="ui-table">
            {[1, 2, 3, 4].map((n) => (
              <div key={n}>
                <span />
                <span />
                <span />
                <b />
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Features() {
  return (
    <main id="main-content" className="inner-page">
      <section className="inner-hero compact">
        <div className="container">
          <span className="page-kicker">FEATURES</span>

          <h1>Focused tools for the way properties operate.</h1>

          <p>
            From the first reservation to the final report, PROPETRA brings
            core workflows into a connected operational system.
          </p>

          <Link className="btn primary" href="/request-demo">
            Request a Demo
            <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="section feature-panels">
        <div className="container">
          {productModules.map((m, i) => (
            <Panel key={m.slug} m={m} i={i} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container feature-rbac">
          <div>
            <span className="page-kicker">ACCESS & CONTROL</span>

            <h2>Workspaces that respect responsibilities.</h2>

            <p>
              Teams can be structured around roles and permissions, helping
              keep operational access aligned with responsibilities.
            </p>
          </div>

          <div className="role-stack">
            {[
              "Property Admin",
              "Front Desk",
              "Housekeeping",
              "Finance",
            ].map((r, i) => (
              <div key={r}>
                <span>0{i + 1}</span>
                <strong>{r}</strong>
                <small>Role-based access</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
