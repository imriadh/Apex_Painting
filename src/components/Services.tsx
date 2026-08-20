import { site } from "../config/site";
import type { ProjectType } from "../config/site";
import Reveal from "./Reveal";
import { IconArrow, IconCheck } from "./Icons";

interface ServicesProps {
  /** Called when a visitor requests a quote for a specific service. */
  onRequest: (type: ProjectType) => void;
}

export default function Services({ onRequest }: ServicesProps) {
  return (
    <section id="services" className="relative bg-[#e9eef5] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section header */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <Reveal className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
              <span className="h-[2px] w-9 bg-accent" aria-hidden="true" />
              What we do
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.7rem)] uppercase leading-[1.02] text-ink">
              Three trades. One obsession:
              <span className="text-accent"> the finish.</span>
            </h2>
          </Reveal>
          <Reveal delay={140} className="max-w-md">
            <p className="leading-relaxed text-mist">
              Every estimate includes surface prep, premium paint, and daily cleanup — itemized, so
              there are never surprises on invoice day.
            </p>
          </Reveal>
        </div>

        {/* Service cards */}
        <div className="grid items-stretch gap-7 lg:grid-cols-3">
          {site.services.map((s, i) => (
            <Reveal key={s.id} delay={i * 130} className="h-full">
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-lg border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  s.featured
                    ? "border-navy-700 bg-navy-900 text-paper shadow-xl lg:-translate-y-3 lg:hover:-translate-y-5"
                    : "border-line bg-card shadow-sm"
                }`}
              >
                {s.featured && (
                  <span className="absolute right-4 top-4 z-10 rotate-2 rounded-sm bg-accent px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-navy-950 shadow-md">
                    Most booked
                  </span>
                )}

                <div className="h-52 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7 lg:p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{s.tagline}</p>
                  <h3 className={`mt-2.5 font-display text-[1.6rem] uppercase leading-tight ${s.featured ? "text-paper" : "text-ink"}`}>
                    {s.name}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed ${s.featured ? "text-navy-100/75" : "text-mist"}`}>
                    {s.description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <IconCheck
                          size={16}
                          className={`mt-0.5 shrink-0 text-accent`}
                        />
                        <span className={s.featured ? "text-paper/90" : "text-ink/85"}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-auto flex items-center justify-between border-t pt-6 ${
                      s.featured ? "border-navy-700" : "border-line"
                    } mt-7`}
                  >
                    <div>
                      <span className={`block font-mono text-[10px] uppercase tracking-widest ${s.featured ? "text-navy-100/50" : "text-mist"}`}>
                        Starting at
                      </span>
                      <span className={`font-display text-2xl ${s.featured ? "text-paper" : "text-ink"}`}>
                        {s.startingAt}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRequest(s.projectType)}
                      className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-navy-950 transition-colors duration-300 hover:bg-accent-deep hover:text-paper"
                    >
                      Get quote
                      <IconArrow size={16} />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-12 text-center text-sm text-mist">
            Something else — fencing, staining, drywall repair?{" "}
            <a href="#estimate" className="font-semibold text-accent underline-offset-4 hover:underline">
              Ask us in the form below
            </a>{" "}
            — if we don't do it, we'll point you to someone we trust.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
