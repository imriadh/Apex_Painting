import { site } from "../config/site";
import Reveal from "./Reveal";
import { IconQuote, StarRow } from "./Icons";

const TILTS = ["md:-rotate-[1.6deg]", "md:rotate-[1.2deg]", "md:-rotate-[0.8deg]"];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Aggregate score */}
          <Reveal className="lg:col-span-4">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
              <span className="h-[2px] w-9 bg-accent" aria-hidden="true" />
              Word around town
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.7rem)] uppercase leading-[1.02] text-ink">
              Austin talks.
              <br />
              We <span className="text-accent">listen.</span>
            </h2>

            <div className="mt-9">
              <p className="font-display text-7xl leading-none text-ink">
                {site.rating.average}
                <span className="text-3xl text-mist">/5</span>
              </p>
              <StarRow size={20} className="mt-3" />
              <p className="mt-3 text-mist">
                from <strong className="font-semibold text-ink">{site.rating.count}</strong> verified
                homeowner reviews
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {site.rating.platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-line bg-card px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-mist"
                >
                  {p}
                </span>
              ))}
            </div>

            <p className="mt-8 max-w-xs text-sm leading-relaxed text-mist">
              Every review below is from a real metro-area job — ask us for the address and we'll
              happily point you to the house.
            </p>
          </Reveal>

          {/* Testimonial cards */}
          <div className="grid items-start gap-6 sm:grid-cols-3 lg:col-span-8">
            {site.reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 140} className={i === 1 ? "sm:mt-10" : ""}>
                <figure
                  className={`relative h-full rounded-lg border border-line bg-card p-7 shadow-sm transition-all duration-500 hover:z-10 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-xl ${TILTS[i % TILTS.length]}`}
                >
                  {/* Painter's tape strip */}
                  <span
                    className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-3 rounded-sm bg-accent/25"
                    aria-hidden="true"
                  />
                  <IconQuote className="text-accent/70" />
                  <StarRow className="mt-3.5" />
                  <blockquote className="mt-3.5 text-[15px] leading-relaxed text-ink/90">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-sm text-paper"
                      aria-hidden="true"
                    >
                      {r.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-ink">{r.name}</span>
                      <span className="block text-xs text-mist">
                        {r.neighborhood} · {r.project}
                      </span>
                    </span>
                    <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-wider text-mist/70">
                      {r.date}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
