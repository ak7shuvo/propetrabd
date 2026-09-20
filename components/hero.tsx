"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { Bell, Pointer } from "./icons";

/**
 * Hero visual: a working miniature of the product.
 *
 * The building is the dashboard. Every window is a room; click one to move it
 * through vacant, arriving and occupied, and the occupancy card, sparkline,
 * room counts and activity notification all update from the same state.
 * Starting values (36 of 42 rooms occupied or arriving, shown as 86%) and the
 * seeded trend are illustrative demo data and are labelled as such.
 */

type Room = "vacant" | "arriving" | "occupied";

const COLS = 7;
// L = occupied, A = arriving today, . = vacant. Top floor first.
const FLOORS = ["LLL.LLA", "LLLL.LL", "L.LLLLL", "LLL.LLL", "LALLL.L", ".LLLLLL"];
const ROWS = FLOORS.length;

const START: Room[] = FLOORS.flatMap((row) =>
  row.split("").map((ch): Room => (ch === "L" ? "occupied" : ch === "A" ? "arriving" : "vacant")),
);
const TOTAL = START.length;

const NEXT: Record<Room, Room> = { vacant: "arriving", arriving: "occupied", occupied: "vacant" };
const LABEL: Record<Room, string> = { vacant: "Vacant", arriving: "Arriving today", occupied: "Occupied" };
const CLASS: Record<Room, string> = { vacant: "vacant", arriving: "arriving", occupied: "lit" };

// Seed trend (illustrative). Each interaction appends the live occupancy.
const SEED = [72, 75, 74, 79, 78, 82, 81, 85.7];

const roomNumber = (index: number) => (ROWS - Math.floor(index / COLS)) * 100 + (index % COLS) + 1;
const percent = (rooms: Room[]) => (rooms.filter((r) => r !== "vacant").length / TOTAL) * 100;

function sparkPoints(values: number[]) {
  const step = 160 / (values.length - 1);
  return values.map((v, i) => {
    const y = 36 - ((Math.min(100, Math.max(60, v)) - 60) / 40) * 32;
    return [Number((i * step).toFixed(1)), Number(y.toFixed(1))] as const;
  });
}

export function HeroVisual() {
  const [rooms, setRooms] = useState<Room[]>(START);
  const [trend, setTrend] = useState<number[]>(SEED);
  const [hover, setHover] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const [live, setLive] = useState(false);
  const [touched, setTouched] = useState(false);
  const [note, setNote] = useState({ id: 0, title: "New booking", detail: "Rahman · Deluxe 204 · 2 nights" });
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // The intro animation owns the windows for the first moments; afterwards they respond instantly.
  useEffect(() => {
    const timer = window.setTimeout(() => setLive(true), 2800);
    return () => window.clearTimeout(timer);
  }, []);

  const occupied = rooms.filter((r) => r === "occupied").length;
  const arriving = rooms.filter((r) => r === "arriving").length;
  const vacant = TOTAL - occupied - arriving;
  const pct = percent(rooms);
  const points = sparkPoints(trend);
  const last = points[points.length - 1];

  const cycle = (index: number) => {
    const state = NEXT[rooms[index]];
    const next = rooms.map((r, i) => (i === index ? state : r));
    setRooms(next);
    setTrend((t) => [...t.slice(1), percent(next)]);
    setNote((n) => ({ id: n.id + 1, title: `Room ${roomNumber(index)} updated`, detail: `Now ${LABEL[state].toLowerCase()}` }));
    setTouched(true);
    setLive(true);
  };

  const move = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      ArrowDown: index + COLS,
      ArrowUp: index - COLS,
      Home: index - (index % COLS),
      End: index - (index % COLS) + COLS - 1,
    };
    const target = keys[e.key];
    if (target === undefined || target < 0 || target >= TOTAL) return;
    e.preventDefault();
    setFocusIndex(target);
    refs.current[target]?.focus();
  };

  const readout =
    hover !== null
      ? `Room ${roomNumber(hover)} · ${LABEL[rooms[hover]]}`
      : touched
        ? "Board is live"
        : "Try it: click a window";

  return (
    <div className="hero-visual">
      <figure className="facade">
        <div className="facade-sun" aria-hidden="true" />
        <figcaption className="facade-legend">
          <span className="facade-readout" aria-hidden="true">
            <Pointer size={12} />
            {readout}
          </span>
          <span><i className="key lit" />Occupied</span>
          <span><i className="key arriving" />Arriving</span>
          <span><i className="key vacant" />Vacant</span>
        </figcaption>
        <div className="facade-building">
          <div className="facade-roof" aria-hidden="true" />
          <div
            className="facade-grid"
            role="group"
            aria-label="Interactive room board with illustrative data. Activate a room to change its status."
            data-live={live ? "" : undefined}
            onMouseLeave={() => setHover(null)}
          >
            {rooms.map((state, i) => {
              const row = Math.floor(i / COLS);
              const col = i % COLS;
              return (
                <button
                  key={i}
                  type="button"
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  tabIndex={i === focusIndex ? 0 : -1}
                  className={`win ${CLASS[state]}`}
                  style={{ "--d": `${700 + (ROWS - 1 - row) * 130 + col * 40}ms` } as CSSProperties}
                  aria-label={`Room ${roomNumber(i)}, ${LABEL[state]}. Press to change status.`}
                  onClick={() => cycle(i)}
                  onKeyDown={(e) => move(e, i)}
                  onFocus={() => {
                    setFocusIndex(i);
                    setHover(i);
                  }}
                  onBlur={() => setHover(null)}
                  onMouseEnter={() => setHover(i)}
                />
              );
            })}
          </div>
          <div className="facade-ground" aria-hidden="true">
            <span className="facade-door" />
          </div>
        </div>
      </figure>

      <div className="float-card float-occupancy">
        <div className="fc-head">
          <span>Occupancy</span>
          <em>Illustrative</em>
        </div>
        <div className="fc-figure">
          <strong aria-live="polite">{Math.round(pct)}%</strong>
          <span className="fc-delta">{arriving} arriving</span>
        </div>
        <svg className="fc-spark" viewBox="0 0 160 40" aria-hidden="true">
          <polyline points={points.map((p) => p.join(",")).join(" ")} />
          <circle cx={last[0]} cy={last[1]} r="3" />
        </svg>
      </div>

      <div className="float-card float-booking" aria-live="polite">
        <span className="fc-icon"><Bell size={16} /></span>
        <div key={note.id} className={note.id ? "fc-pop" : undefined}>
          <strong>{note.title}</strong>
          <small>{note.detail}</small>
        </div>
      </div>

      <div className="float-card float-revenue">
        <span>Room board</span>
        <div className="fc-counts">
          <div><b>{occupied}</b><small><i className="key lit" />In house</small></div>
          <div><b>{arriving}</b><small><i className="key arriving" />Arriving</small></div>
          <div><b>{vacant}</b><small><i className="key vacant" />Vacant</small></div>
        </div>
      </div>
    </div>
  );
}
