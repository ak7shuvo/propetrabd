"use client";

import { useEffect } from "react";

/**
 * Ambient effects, all driven by two CSS custom properties.
 *  - --scroll on <html>: page scroll progress (0-1) for the navigation hairline.
 *  - --mx / --my on a card: pointer position inside it for the hover light.
 * Pointer light only runs for fine pointers and is skipped for reduced motion.
 */
const LIT = [
  ".solution-card", ".feature-card", ".trust-card", ".principle-grid article", ".module-detail",
  ".resource-card", ".role-stack > div",
].join(",");

export function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll", max > 0 ? String(Math.min(1, window.scrollY / max)) : "0");
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let onMove: ((event: PointerEvent) => void) | null = null;
    if (fine && !calm) {
      onMove = (event) => {
        const el = (event.target as Element | null)?.closest?.(LIT) as HTMLElement | null;
        if (!el) return;
        const box = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - box.left}px`);
        el.style.setProperty("--my", `${event.clientY - box.top}px`);
      };
      document.addEventListener("pointermove", onMove, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (onMove) document.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
