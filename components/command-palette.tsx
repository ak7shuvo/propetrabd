"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Enter, Search } from "./icons";

/**
 * Site-wide command palette.
 * Open with Ctrl/Cmd + K, or "/" when no field is focused. Also opens from the
 * navigation search button via the "propetra:palette" window event.
 * Only existing routes are listed; nothing here changes routing.
 */

type Item = { label: string; href: string; hint: string; group: string };

const ITEMS: Item[] = [
  { group: "Explore", label: "Home", href: "/", hint: "Overview of PETRA" },
  { group: "Explore", label: "Product", href: "/product", hint: "Workspace, modules and preview" },
  { group: "Explore", label: "Features", href: "/features", hint: "Core capabilities in detail" },
  { group: "Explore", label: "How It Works", href: "/how-it-works", hint: "From setup to daily operations" },
  { group: "Explore", label: "Why PETRA", href: "/why-propetra", hint: "Principles and trust" },
  { group: "Solutions", label: "All solutions", href: "/solutions", hint: "Property types overview" },
  { group: "Solutions", label: "Hotels", href: "/solutions/hotels", hint: "Property type" },
  { group: "Solutions", label: "Resorts", href: "/solutions/resorts", hint: "Property type" },
  { group: "Solutions", label: "Boutique Properties", href: "/solutions/boutique-properties", hint: "Property type" },
  { group: "Solutions", label: "Guest Houses", href: "/solutions/guest-houses", hint: "Property type" },
  { group: "Solutions", label: "Serviced Apartments", href: "/solutions/serviced-apartments", hint: "Property type" },
  { group: "Company", label: "About TEAM PETRA", href: "/about", hint: "Who is building PETRA" },
  { group: "Company", label: "Resources", href: "/resources", hint: "Notes and FAQ" },
  { group: "Company", label: "Contact", href: "/contact", hint: "Get in touch" },
  { group: "Company", label: "Request a Demo", href: "/request-demo", hint: "Start a product conversation" },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter((item) => `${item.label} ${item.hint} ${item.group}`.toLowerCase().includes(q));
  }, [query]);

  const show = () => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setIndex(0);
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
    returnFocus.current?.focus?.();
  };
  const go = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    router.push(item.href);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = !!target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable);
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) hide();
        else show();
      } else if (event.key === "/" && !typing && !open) {
        event.preventDefault();
        show();
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener("propetra:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("propetra:palette", onOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const onInputKey = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[index]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      hide();
    } else if (event.key === "Tab") {
      event.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <div className="palette-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) hide(); }}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Search pages">
        <div className="palette-input">
          <Search size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Jump to a page"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `palette-item-${index}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>Esc</kbd>
        </div>
        <ul id="palette-list" role="listbox" className="palette-list" aria-label="Pages">
          {results.length === 0 && <li className="palette-empty" role="presentation">No pages match &ldquo;{query}&rdquo;</li>}
          {results.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            return (
              <li key={item.href} role="presentation">
                {header && <div className="palette-group">{header}</div>}
                <div
                  id={`palette-item-${i}`}
                  role="option"
                  aria-selected={i === index}
                  className="palette-item"
                  data-on={i === index ? "" : undefined}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => go(item)}
                >
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.hint}</small>
                  </span>
                  {i === index ? <Enter size={14} /> : <ArrowRight size={14} />}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="palette-foot" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
          <span><kbd>Enter</kbd> open</span>
          <span><kbd>Ctrl</kbd><kbd>K</kbd> toggle</span>
        </div>
      </div>
    </div>
  );
}
