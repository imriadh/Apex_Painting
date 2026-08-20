import { site } from "../config/site";
import { IconMail, IconPhone, IconPin, Logo } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-800 bg-navy-950 text-navy-100/70">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#top" className="flex items-center gap-3">
              <Logo />
              <span className="leading-none">
                <span className="block font-display text-xl uppercase tracking-wide text-paper">
                  {site.brand.shortName}
                </span>
                <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.3em] text-navy-100/60">
                  {site.brand.tagline}
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Family-run residential painters serving Greater Austin since {site.brand.founded}.
              Crisp lines, honest quotes, and a broom-clean site — every single job.
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-navy-100/45">
              {site.brand.license}
              <span className="mx-2 text-accent">·</span>
              Fully insured — COI on request
            </p>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper">Contact</h4>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a href={site.brand.phoneHref} className="flex items-center gap-3 transition-colors hover:text-accent">
                  <IconPhone size={16} className="text-accent" />
                  {site.brand.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.brand.email}`} className="flex items-center gap-3 transition-colors hover:text-accent">
                  <IconMail size={16} className="text-accent" />
                  {site.brand.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <IconPin size={16} className="mt-0.5 shrink-0 text-accent" />
                {site.brand.address}
              </li>
              <li className="text-navy-100/50">{site.brand.hours}</li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper">Services</h4>
            <ul className="mt-5 space-y-3.5 text-sm">
              {site.services.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="transition-colors hover:text-accent">
                    {s.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#estimate" className="font-semibold text-accent transition-colors hover:text-paper">
                  Free estimate →
                </a>
              </li>
            </ul>
          </div>

          {/* Service area */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper">Service area</h4>
            <div className="mt-5 flex flex-wrap gap-2">
              {site.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="rounded-full border border-navy-800 px-3 py-1.5 text-xs text-navy-100/60 transition-colors hover:border-accent hover:text-accent"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-navy-800 pt-7 text-xs text-navy-100/45 sm:flex-row">
          <p>
            © {year} {site.brand.name}. All rights reserved.
          </p>
          <p className="font-mono tracking-wide">
            Rebrand-ready template — content &amp; palette live in{" "}
            <span className="text-navy-100/70">src/config/site.ts</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
