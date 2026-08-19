import { useEffect, useState } from "react";
import { site } from "../config/site";
import Reveal from "./Reveal";
import { IconArrow, IconPhone, StarRow } from "./Icons";

const ACCENT_KEY = "apex-accent";

function readSavedAccent(): string {
  try {
    return localStorage.getItem(ACCENT_KEY) ?? site.accents[0].hex;
  } catch {
    return site.accents[0].hex;
  }
}

/** Hand-drawn brush stroke used under the headline accent. */
function BrushStroke({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 26" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M3 15C42 7 92 4.5 150 8.5 208 12.5 258 8 297 12.5L294.5 20.5C248 24 190 23 140 19.8 92 16.8 44 21.5 5.5 22.5Z"
        fill="var(--accent)"
      />
    </svg>
  );
}

export default function Hero() {
  const [accent, setAccent] = useState(readSavedAccent);

  // Guarantee the runtime accent matches the saved one even if the inline head script was blocked.
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
  }, [accent]);

  const pickAccent = (hex: string) => {
    setAccent(hex);
    document.documentElement.style.setProperty("--accent", hex);
    try {
      localStorage.setItem(ACCENT_KEY, hex);
    } catch {
      /* private mode — non-fatal */
    }
  };

  const activeName = site.accents.find((a) => a.hex.toLowerCase() === accent.toLowerCase())?.name;

  return (
    <section id="top" className="relative overflow-hidden bg-navy-950 text-paper">
      {/* Ambient layers: accent glow, roller-stripe texture, ghost lettering */}
      <div
        className="pointer-events-none absolute -right-44 -top-44 h-[36rem] w-[36rem] rounded-full opacity-[0.13] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 62%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(217,227,238,0.035) 0 2px, transparent 2px 38px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-14 left-0 select-none font-display text-[26vw] leading-none text-outline"
        aria-hidden="true"
      >
        APEX
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-32 sm:px-8 lg:pt-40">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent sm:text-xs">
                <span className="h-[2px] w-9 bg-accent" aria-hidden="true" />
                {site.hero.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-6 font-display text-[clamp(2.9rem,7.4vw,5.3rem)] uppercase leading-[0.99] tracking-[0.01em]">
                {site.hero.headlineTop}{" "}
                <span className="relative inline-block whitespace-nowrap">
                  {site.hero.headlineAccent}
                  <BrushStroke className="absolute -bottom-[0.06em] left-[-2%] h-[0.19em] w-[104%]" />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-navy-100/85">{site.hero.sub}</p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#estimate"
                  className="group relative overflow-hidden rounded-md bg-accent px-8 py-4 font-bold text-navy-950 shadow-[0_14px_38px_-12px_var(--accent)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span
                    className="absolute inset-0 -translate-x-[103%] bg-navy-950/90 transition-transform duration-300 ease-out group-hover:translate-x-0"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center gap-2.5 transition-colors duration-300 group-hover:text-paper">
                    {site.hero.ctaPrimary}
                    <IconArrow size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
                <a
                  href={site.brand.phoneHref}
                  className="inline-flex items-center gap-2.5 rounded-md border border-paper/25 px-7 py-4 font-semibold text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  <IconPhone size={18} />
                  {site.hero.ctaSecondary}
                </a>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-navy-100/70">
                <span className="flex items-center gap-2.5">
                  <StarRow />
                  <strong className="font-semibold text-paper">{site.rating.average}</strong>
                  · {site.rating.count} Google reviews
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-navy-100/30 sm:block" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-wider">{site.brand.license}</span>
              </div>
            </Reveal>

            {/* Live template swatch picker */}
            <Reveal delay={420}>
              <div className="mt-10 max-w-md border-t border-navy-800 pt-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy-100/50">
                    Repaint this template
                  </span>
                  <div className="flex items-center gap-2.5" role="group" aria-label="Accent color picker">
                    {site.accents.map((a) => (
                      <button
                        key={a.hex}
                        type="button"
                        title={a.name}
                        aria-label={`Use ${a.name} accent`}
                        aria-pressed={a.hex.toLowerCase() === accent.toLowerCase()}
                        onClick={() => pickAccent(a.hex)}
                        className={`h-7 w-7 rounded-full border-2 border-navy-950/40 transition-transform duration-200 hover:scale-110 ${
                          a.hex.toLowerCase() === accent.toLowerCase()
                            ? "scale-110 ring-2 ring-paper ring-offset-2 ring-offset-navy-950"
                            : ""
                        }`}
                        style={{ backgroundColor: a.hex }}
                      />
                    ))}
                  </div>
                </div>
                {activeName && (
                  <p className="mt-2.5 font-mono text-[11px] tracking-wider text-navy-100/45">
                    Current coat: <span className="text-accent">{activeName}</span>
                  </p>
                )}
              </div>
            </Reveal>
          </div>

          {/* Imagery */}
          <div className="relative lg:col-span-6">
            <Reveal delay={150} className="relative">
              <span className="absolute -left-5 top-10 bottom-10 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-lg border border-navy-700/70"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-navy-700 shadow-[0_40px_90px_-30px_rgba(6,18,31,0.95)]">
                <img
                  src={site.hero.image}
                  alt={site.hero.imageAlt}
                  className="kenburns h-full w-full object-cover"
                  loading="eager"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="absolute -right-3 top-6 rotate-2 rounded-sm bg-accent px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-navy-950 shadow-lg">
                Est. {site.brand.founded}
              </div>

              <div className="absolute -bottom-5 left-4 flex items-center gap-4 rounded-md border border-navy-700 bg-navy-900/95 px-5 py-4 shadow-xl backdrop-blur-sm sm:-left-8">
                <span className="pulse-dot h-2.5 w-2.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-bold text-paper">{site.hero.badge.title}</span>
                  <span className="mt-0.5 block text-xs text-navy-100/60">{site.hero.badge.sub}</span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Neighborhood marquee */}
      <div className="marquee relative mt-20 overflow-hidden border-y border-navy-800 bg-navy-900 py-4 lg:mt-24">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {site.neighborhoods.map((n) => (
                <span
                  key={`${copy}-${n}`}
                  className="mx-6 flex items-center gap-3 whitespace-nowrap font-mono text-xs uppercase tracking-[0.22em] text-navy-100/60"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" aria-hidden="true" />
                  {n}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Paint-drip transition into the next section */}
      <div className="bg-paper" aria-hidden="true">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="block h-10 w-full sm:h-14">
          <g fill="#0B1D30">
            <rect width="1440" height="16" />
            <rect x="96" y="8" width="18" height="46" rx="9" />
            <rect x="288" y="8" width="15" height="28" rx="7.5" />
            <rect x="512" y="8" width="20" height="56" rx="10" />
            <rect x="742" y="8" width="14" height="24" rx="7" />
            <rect x="954" y="8" width="18" height="40" rx="9" />
            <rect x="1188" y="8" width="16" height="32" rx="8" />
            <rect x="1362" y="8" width="20" height="50" rx="10" />
          </g>
        </svg>
      </div>
    </section>
  );
}
