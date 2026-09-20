import type { CSSProperties } from "react";
import { Bell, TrendUp } from "./icons";

/**
 * Hero visual for the homepage.
 *
 * The building is the dashboard: every window is a room. Lit windows are
 * occupied, red windows are arrivals today, dark windows are vacant.
 * 36 of 42 rooms are lit or arriving, which is the 86% shown on the card.
 * All figures are illustrative demo data and are labelled as such.
 */

// L = occupied, A = arriving today, . = vacant. Top floor first.
const FLOORS = [
  "LLL.LLA",
  "LLLL.LL",
  "L.LLLLL",
  "LLL.LLL",
  "LALLL.L",
  ".LLLLLL",
];

const windows = FLOORS.flatMap((row, floor) =>
  row.split("").map((state, col) => ({
    key: `${floor}-${col}`,
    state,
    // Lights come on from the ground floor upward, left to right.
    delay: 700 + (FLOORS.length - 1 - floor) * 130 + col * 40,
  })),
);

export function HeroVisual() {
  return (
    <div className="hero-visual">
      <figure className="facade" aria-label="Illustration of a hotel building where each lit window is an occupied room">
        <div className="facade-sun" aria-hidden="true" />
        <div className="facade-building" aria-hidden="true">
          <div className="facade-roof" />
          <div className="facade-grid">
            {windows.map((w) => (
              <span
                key={w.key}
                className={`win ${w.state === "L" ? "lit" : w.state === "A" ? "arriving" : "vacant"}`}
                style={{ "--d": `${w.delay}ms` } as CSSProperties}
              />
            ))}
          </div>
          <div className="facade-ground">
            <span className="facade-door" />
          </div>
        </div>
        <figcaption className="facade-legend">
          <span><i className="key lit" />Occupied</span>
          <span><i className="key arriving" />Arriving</span>
          <span><i className="key vacant" />Vacant</span>
        </figcaption>
      </figure>

      <div className="float-card float-occupancy">
        <div className="fc-head">
          <span>Occupancy</span>
          <em>Illustrative</em>
        </div>
        <div className="fc-figure">
          <strong>86%</strong>
          <span className="fc-delta"><TrendUp size={14} />8.3%</span>
        </div>
        <svg className="fc-spark" viewBox="0 0 160 40" aria-hidden="true">
          <polyline points="0,32 20,28 40,30 60,22 80,24 100,15 120,17 140,9 160,6" />
          <circle cx="160" cy="6" r="3" />
        </svg>
      </div>

      <div className="float-card float-booking">
        <span className="fc-icon"><Bell size={16} /></span>
        <div>
          <strong>New booking</strong>
          <small>Rahman · Deluxe 204 · 2 nights</small>
        </div>
      </div>

      <div className="float-card float-revenue">
        <span>Revenue today</span>
        <strong>৳184,500</strong>
      </div>
    </div>
  );
}
