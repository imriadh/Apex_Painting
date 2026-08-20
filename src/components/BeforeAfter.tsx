import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { site } from "../config/site";
import { clamp } from "../lib/hooks";
import Reveal from "./Reveal";
import { IconArrow, IconDrag } from "./Icons";

interface CompareSliderProps {
  before: string;
  after: string;
  altBefore: string;
  altAfter: string;
}

/** Pointer + keyboard accessible before/after comparison slider. */
function CompareSlider({ before, after, altBefore, altAfter }: CompareSliderProps) {
  const [pos, setPos] = useState(58);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100, 2.5, 97.5));
  }, []);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) updateFromClientX(e.clientX);
  };

  const stopDragging = () => {
    draggingRef.current = false;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setPos((p) => clamp(p - 5, 2.5, 97.5));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setPos((p) => clamp(p + 5, 2.5, 97.5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(2.5);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(97.5);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-lg border border-navy-700 shadow-[0_45px_90px_-35px_rgba(0,0,0,0.85)] sm:aspect-[16/10]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      {/* After — base layer */}
      <img
        src={after}
        alt={altAfter}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Before — clipped to the left of the divider */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden="true">
        <img src={before} alt={altBefore} draggable={false} className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* Labels */}
      <span className="absolute left-4 top-4 rounded-sm bg-navy-950/80 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-paper backdrop-blur-sm">
        Before
      </span>
      <span className="absolute right-4 top-4 rounded-sm bg-accent px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-950">
        After
      </span>

      {/* Divider + handle */}
      <div className="absolute inset-y-0 z-10" style={{ left: `${pos}%` }}>
        <span
          className="absolute inset-y-0 -ml-[1.5px] w-[3px] bg-paper/90 shadow-[0_0_14px_rgba(6,18,31,0.7)]"
          aria-hidden="true"
        />
        <button
          type="button"
          role="slider"
          aria-label="Comparison position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% before`}
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-navy-950 shadow-xl ring-4 ring-paper/25 transition-transform duration-200 hover:scale-110 focus-visible:scale-110"
        >
          <IconDrag size={22} />
        </button>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [activeId, setActiveId] = useState(site.gallery[0].id);
  const project = site.gallery.find((g) => g.id === activeId) ?? site.gallery[0];

  return (
    <section id="gallery" className="relative overflow-hidden bg-navy-950 py-24 text-paper lg:py-32">
      {/* Ambient layers */}
      <div
        className="pointer-events-none absolute -left-44 top-1/3 h-[32rem] w-[32rem] rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 62%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
              <span className="h-[2px] w-9 bg-accent" aria-hidden="true" />
              Before &amp; after
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.7rem)] uppercase leading-[1.02]">
              Drag the line.
              <br />
              See the <span className="text-accent">difference.</span>
            </h2>
          </Reveal>
          <Reveal delay={140} className="lg:col-span-5">
            <p className="max-w-md leading-relaxed text-navy-100/70 lg:ml-auto">
              No filters, no staging tricks — the same wall, the same light, a few days apart. This
              is what proper prep and two finish coats actually look like.
            </p>
          </Reveal>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Slider */}
          <div className="lg:col-span-8">
            <Reveal>
              <div className="mb-5 flex flex-wrap gap-3" role="group" aria-label="Choose a project">
                {site.gallery.map((g, i) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setActiveId(g.id)}
                    aria-pressed={g.id === activeId}
                    className={`rounded-md px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                      g.id === activeId
                        ? "bg-accent font-semibold text-navy-950"
                        : "border border-navy-700 text-navy-100/70 hover:border-accent hover:text-accent"
                    }`}
                  >
                    0{i + 1} · {g.label}
                  </button>
                ))}
              </div>

              <div key={project.id} className="fade-in">
                <CompareSlider
                  before={project.before}
                  after={project.after}
                  altBefore={`${project.label} in ${project.location} before painting`}
                  altAfter={`${project.label} in ${project.location} after painting by Apex`}
                />
              </div>

              <p className="mt-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-wider text-navy-100/45">
                <IconDrag size={16} className="text-accent" />
                Drag the handle — or focus it and use your arrow keys
              </p>
            </Reveal>
          </div>

          {/* Project details */}
          <Reveal delay={160} className="lg:col-span-4">
            <aside key={`${project.id}-aside`} className="fade-in rounded-lg border border-navy-800 bg-navy-900/70 p-7 lg:p-8">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {project.location}
              </p>
              <h3 className="mt-2.5 font-display text-3xl uppercase tracking-wide">{project.label}</h3>

              <dl className="mt-7 space-y-5 border-t border-navy-800 pt-7">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy-100/45">Scope</dt>
                  <dd className="mt-1 text-sm font-medium text-paper">{project.scope}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy-100/45">Timeline</dt>
                  <dd className="mt-1 text-sm font-medium text-paper">{project.duration}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy-100/45">Product</dt>
                  <dd className="mt-1 text-sm font-medium text-paper">{project.product}</dd>
                </div>
              </dl>

              <a
                href="#estimate"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 font-bold text-navy-950 transition-colors duration-300 hover:bg-accent-deep hover:text-paper"
              >
                Get this result
                <IconArrow size={17} />
              </a>
              <p className="mt-4 text-xs leading-relaxed text-navy-100/50">
                Photos from real Apex jobs, angles matched by our project manager during the final
                walkthrough.
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
