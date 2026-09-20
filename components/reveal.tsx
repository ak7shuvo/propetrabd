"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Lightweight scroll-reveal system.
 *
 * - Single IntersectionObserver, no animation library.
 * - Progressive enhancement: content stays fully visible until this script runs,
 *   and is never hidden for users who prefer reduced motion.
 * - Elements matched by REVEAL_SELECTOR fade up once; children of GROUP_SELECTOR
 *   containers fade up in a short stagger (delays live in CSS).
 */
const REVEAL_SELECTOR = [
  ".section-heading",
  ".product-large",
  ".why-card",
  ".team-box",
  ".cta-inner",
  ".faq-list",
  ".form-card",
  ".conversion-copy",
  ".showcase-frame",
  ".tenant-card",
  ".feature-panel",
  ".workflow-note",
  ".trust-note",
  ".demo-disclaimer",
].join(",");

const GROUP_SELECTOR = [
  ".steps",
  ".metrics-grid",
  ".problem-points",
  ".solution-grid",
  ".feature-grid",
  ".trust-grid",
  ".principle-grid",
  ".resource-grid",
  ".module-detail-grid",
  ".role-stack",
  ".workflow-ribbon",
  ".workflow-list",
  ".solution-points",
  ".security-list",
  ".team-principles",
  ".conversion-points",
  ".why-list",
].join(",");

export function setupReveal(root: Document = document): () => void {
  const html = root.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof IntersectionObserver === "undefined") return () => {};

  const targets: HTMLElement[] = [];
  root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
    el.setAttribute("data-reveal", "");
    targets.push(el);
  });
  root.querySelectorAll<HTMLElement>(GROUP_SELECTOR).forEach((el) => {
    el.setAttribute("data-reveal-group", "");
    targets.push(el);
  });

  const viewportBottom = window.innerHeight * 0.96;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  // Elements already on screen are revealed synchronously (no hidden flash);
  // everything below the fold waits for the observer.
  for (const el of targets) {
    if (el.getBoundingClientRect().top < viewportBottom) {
      el.setAttribute("data-revealed", "");
    } else {
      observer.observe(el);
    }
  }
  html.classList.add("js-reveal");

  return () => observer.disconnect();
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanup = setupReveal();
    return cleanup;
  }, [pathname]);

  return null;
}
