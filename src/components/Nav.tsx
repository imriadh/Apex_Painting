import { useEffect, useState } from "react";
import { site } from "../config/site";
import { useScrollProgress } from "../lib/hooks";
import { IconMenu, IconPhone, IconX, Logo } from "./Icons";

const LINKS = [
  { label: "Why Us", href: "#why-us" },
  { label: "Services", href: "#services" },
  { label: "Before & After", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#estimate" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-navy-800 bg-navy-950/95 shadow-[0_10px_40px_-18px_rgba(6,18,31,0.9)] backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand */}
        <a href="#top" className="group flex items-center gap-3" aria-label="Apex Painting — back to top">
          <Logo className="transition-transform duration-300 group-hover:-rotate-6" />
          <span className="leading-none">
            <span className="block font-display text-[1.35rem] uppercase tracking-wide text-paper">
              {site.brand.shortName}
            </span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.3em] text-navy-100/60">
              {site.brand.tagline}
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[12px] uppercase tracking-[0.18em] text-navy-100/75 transition-colors hover:text-paper"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={site.brand.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-navy-100/85 transition-colors hover:text-accent"
          >
            <IconPhone size={17} />
            {site.brand.phone}
          </a>
          <a
            href="#estimate"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-navy-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-deep hover:text-paper"
          >
            Free Estimate
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-navy-800 text-paper transition-colors hover:border-accent hover:text-accent lg:hidden"
        >
          {open ? <IconX size={22} /> : <IconMenu size={22} />}
        </button>
      </div>

      {/* Scroll progress paint line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-navy-800 bg-navy-950 px-5 pb-8 pt-3 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-navy-800/70 py-4 font-display text-2xl uppercase tracking-wide text-paper transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-7 flex flex-col gap-3">
            <a
              href="#estimate"
              onClick={() => setOpen(false)}
              className="rounded-md bg-accent px-6 py-4 text-center text-base font-bold text-navy-950"
            >
              Get a Free Estimate
            </a>
            <a
              href={site.brand.phoneHref}
              className="flex items-center justify-center gap-2 rounded-md border border-navy-700 px-6 py-4 font-semibold text-paper"
            >
              <IconPhone size={18} />
              {site.brand.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
