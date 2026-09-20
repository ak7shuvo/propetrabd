"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Chart, Clipboard, Door, Receipt, Users } from "./icons";

/**
 * One building, six modules.
 *
 * The building stays pinned while the page scrolls. Each feature re-lights the
 * same 42 rooms to show what that module is about: arrivals, room status,
 * linked guest stays, housekeeping, folios and floor-by-floor reporting.
 * Room patterns and the numbers derived from them are illustrative.
 *
 * Window codes: o vacant, l occupied, d booked ahead, r alert or arriving,
 * g ready to sell, k out of service, c in progress, h highlighted, 1-4 heat.
 */

type Step = { title: string; text: string };

type Scene = {
  label: string;
  grid: string[];
  legend: [string, string][];
};

const SCENES: Scene[] = [
  {
    label: "Reservations",
    grid: ["lldorlr", "lrllodl", "olrldll", "llrlrdl", "dlllolr", "lolrlld"],
    legend: [["r", "Arriving today"], ["l", "In house"], ["d", "Booked ahead"], ["o", "Vacant"]],
  },
  {
    label: "Rooms & Front Desk",
    grid: ["llgokll", "lllgllo", "lolllkl", "lllgoll", "lgllllo", "olllgll"],
    legend: [["l", "Occupied"], ["g", "Ready to sell"], ["o", "Vacant"], ["k", "Out of service"]],
  },
  {
    label: "Guest Management",
    grid: ["dddoddd", "ddddodd", "dohhhdd", "ddoddod", "ddddodd", "odddddd"],
    legend: [["h", "One linked stay"], ["d", "Other guests"], ["o", "Vacant"]],
  },
  {
    label: "Housekeeping",
    grid: ["llollll", "lllllol", "llclrll", "lccolrl", "rrcloll", "orrrlcr"],
    legend: [["r", "Needs cleaning"], ["c", "In progress"], ["l", "Ready"]],
  },
  {
    label: "Billing & Payments",
    grid: ["lldolld", "lldlodl", "ldlddll", "lolddld", "dldldol", "odddlld"],
    legend: [["l", "Settled"], ["d", "Open folio"], ["o", "No charges"]],
  },
  {
    label: "Reports & Analytics",
    grid: ["4434344", "3443434", "3334443", "2333433", "2232323", "1222122"],
    legend: [["1", "Lower"], ["2", ""], ["3", ""], ["4", "Higher"]],
  },
];

const ICONS = [Calendar, Door, Users, Clipboard, Receipt, Chart];

const count = (grid: string[], ch: string) => grid.join("").split(ch).length - 1;
const floorHeat = (row: string) => row.split("").reduce((sum, ch) => sum + Number(ch), 0) / row.length;

function SceneCard({ index }: { index: number }) {
  const g = SCENES[index].grid;
  switch (index) {
    case 0:
      return (
        <>
          <span>Reservations</span>
          <strong>{count(g, "r")} arriving today</strong>
          <small>{count(g, "d")} more booked ahead</small>
          <div className="mini-timeline" aria-hidden="true">
            <i style={{ left: "0%", width: "38%" }} />
            <i style={{ left: "22%", width: "44%" }} />
            <i style={{ left: "52%", width: "40%" }} />
          </div>
        </>
      );
    case 1:
      return (
        <>
          <span>Room status</span>
          <strong>{count(g, "g")} ready to sell</strong>
          <small>{count(g, "l")} occupied, {count(g, "k")} out of service</small>
        </>
      );
    case 2:
      return (
        <>
          <span>Guest record</span>
          <strong>One stay, {count(g, "h")} rooms</strong>
          <small>Linked bookings share one guest profile</small>
        </>
      );
    case 3: {
      const ready = count(g, "l");
      const total = ready + count(g, "r") + count(g, "c");
      return (
        <>
          <span>Housekeeping</span>
          <strong>{ready} of {total} rooms ready</strong>
          <small>{count(g, "c")} in progress right now</small>
          <div className="scene-progress" aria-hidden="true"><i style={{ width: `${(ready / total) * 100}%` }} /></div>
        </>
      );
    }
    case 4:
      return (
        <>
          <span>Billing</span>
          <strong>{count(g, "l")} folios settled</strong>
          <small>{count(g, "d")} still open</small>
        </>
      );
    default:
      return (
        <>
          <span>Occupancy by floor</span>
          <strong>Top floors lead</strong>
          <div className="mini-bars floors" aria-hidden="true">
            {g.map((row, i) => <i key={i} style={{ height: `${(floorHeat(row) / 4) * 100}%` }} />)}
          </div>
        </>
      );
  }
}

export function PropertyStory({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const compact = window.matchMedia("(max-width: 980px)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: compact ? "-52% 0px -22% 0px" : "-42% 0px -42% 0px" },
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const jump = (i: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stepRefs.current[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const scene = SCENES[active];

  return (
    <div className="story-grid">
      <div className="story-stage">
        <div className="story-head" aria-hidden="true">
          <span>Property view</span>
          <b>{String(active + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}</b>
        </div>

        <div className="story-building" aria-hidden="true">
          {SCENES[0].grid.map((_, r) =>
            SCENES[0].grid[r].split("").map((__, c) => (
              <span
                key={`${r}-${c}`}
                className="sw"
                data-k={scene.grid[r][c]}
                style={{ "--w": `${(r + c) * 26}ms` } as CSSProperties}
              />
            )),
          )}
        </div>

        <ul className="story-legend" aria-hidden="true">
          {scene.legend.map(([k, label]) => (
            <li key={k}>
              <i className="kswatch" data-k={k} />
              {label}
            </li>
          ))}
        </ul>

        <div className="scene-cards" aria-hidden="true">
          {SCENES.map((s, i) => (
            <div key={s.label} className="scene-card" data-on={i === active ? "" : undefined}>
              <SceneCard index={i} />
            </div>
          ))}
        </div>

        <div className="story-rail">
          {SCENES.map((s, i) => (
            <button
              key={s.label}
              type="button"
              aria-label={`Show ${s.label}`}
              aria-current={i === active ? "step" : undefined}
              data-on={i === active ? "" : undefined}
              onClick={() => jump(i)}
            />
          ))}
        </div>
      </div>

      <div className="story-steps">
        {steps.map((step, i) => {
          const Icon = ICONS[i];
          return (
            <article
              key={step.title}
              className="story-step"
              data-index={i}
              data-active={i === active ? "" : undefined}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
            >
              <div className="story-step-icon"><Icon size={20} /></div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <Link href="/features">Learn more <ArrowRight size={15} /></Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
