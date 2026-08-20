import { site } from "../config/site";
import type { Stat } from "../config/site";
import { useCountUp, useInView } from "../lib/hooks";
import Reveal from "./Reveal";
import { IconBadge, IconClockCheck, IconShield } from "./Icons";

const BENEFIT_ICONS = {
  shield: IconShield,
  badge: IconBadge,
  clock: IconClockCheck,
} as const;

function StatCell({ stat, start, index }: { stat: Stat; start: boolean; index: number }) {
  const value = useCountUp(stat.value, start, 1500, stat.decimals ?? 0);
  return (
    <div
      className={`border-line px-7 py-8 ${index > 0 ? "border-l" : ""} ${
        index >= 2 ? "border-t lg:border-t-0" : ""
      }`}
    >
      <p className="font-display text-4xl text-ink lg:text-5xl">
        {value}
        <span className="text-accent">{stat.suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">{stat.label}</p>
    </div>
  );
}

function StatsBand() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  return (
    <div ref={ref} className="grid grid-cols-2 border-y border-line bg-card lg:grid-cols-4">
      {site.stats.map((s, i) => (
        <StatCell key={s.label} stat={s} start={inView} index={i} />
      ))}
    </div>
  );
}

export default function WhyUs() {
  return (
    <section id="why-us" className="relative bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section header */}
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
              <span className="h-[2px] w-9 bg-accent" aria-hidden="true" />
              Why choose us
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.7rem)] uppercase leading-[1.02] text-ink">
              The standard every other crew
              <br className="hidden sm:block" /> gets measured <span className="text-accent">against.</span>
            </h2>
          </Reveal>
          <Reveal delay={140} className="lg:col-span-5">
            <p className="max-w-md leading-relaxed text-mist lg:ml-auto">
              Anyone can roll paint on a wall. Since {site.brand.founded}, we've built Apex on the
              unglamorous details — masking, prep, punctuality — because that's what you actually
              notice when the job is done.
            </p>
          </Reveal>
        </div>

        {/* Proof in numbers */}
        <Reveal delay={120} className="mt-14">
          <StatsBand />
        </Reveal>

        {/* Three core benefits */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {site.benefits.map((b, i) => {
            const Icon = BENEFIT_ICONS[b.icon];
            return (
              <Reveal key={b.id} delay={i * 130} className="h-full">
                <article className="group flex h-full flex-col bg-card p-8 transition-colors duration-500 hover:bg-navy-900 lg:p-10">
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-navy-950 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-navy-950">
                      <Icon size={24} />
                    </span>
                    <span className="font-mono text-xs tracking-widest text-mist/70 transition-colors duration-500 group-hover:text-navy-100/40">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-7 font-display text-2xl uppercase tracking-wide text-ink transition-colors duration-500 group-hover:text-paper">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist transition-colors duration-500 group-hover:text-navy-100/75">
                    {b.body}
                  </p>
                  <p className="mt-auto inline-flex items-center gap-2 self-start rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-mist transition-colors duration-500 group-hover:border-navy-700 group-hover:text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    {b.proof}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
