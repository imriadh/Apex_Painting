import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { site } from "../config/site";
import type { ProjectType } from "../config/site";
import Reveal from "./Reveal";
import { IconCheck, IconClock, IconMail, IconPhone, IconPin, IconShield } from "./Icons";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  project: ProjectType | "";
  message: string;
  website: string; // honeypot — humans never fill this
}

type FieldName = "name" | "phone" | "email" | "project";
type FormErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: FormValues = { name: "", phone: "", email: "", project: "", message: "", website: "" };

const PATTERNS = {
  phone: /^[+]?[\d\s().-]{7,18}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!PATTERNS.phone.test(values.phone.trim())) errors.phone = "Enter a valid phone number.";
  if (!PATTERNS.email.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (values.project === "") errors.project = "Select a project type.";
  return errors;
}

interface EstimateFormProps {
  /** Preselected by clicking "Get quote" on a service card. */
  selectedProject: ProjectType | "";
}

export default function EstimateForm({ selectedProject }: EstimateFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [refCode, setRefCode] = useState("");

  // Sync preselection from the Services section
  useEffect(() => {
    if (selectedProject !== "") {
      setValues((v) => ({ ...v, project: selectedProject }));
      setErrors((e) => ({ ...e, project: undefined }));
    }
  }, [selectedProject]);

  const setField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (field in errors) {
      setErrors((e) => ({ ...e, [field]: undefined }) as FormErrors);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    if (values.website.trim() !== "") {
      // Bot filled the honeypot — pretend success, discard silently.
      setStatus("success");
      return;
    }

    const projectLabel =
      site.projectTypes.find((t) => t.value === values.project)?.label ?? "Unspecified";
    const ref = `APX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      if (site.form.provider === "endpoint") {
        // Production: POST JSON to Formspree / Getform / any webhook.
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 10_000);
        const res = await fetch(site.form.endpoint, {
          method: "POST",
          signal: controller.signal,
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: values.name,
            phone: values.phone,
            email: values.email,
            project: projectLabel,
            message: values.message,
            ref,
            _subject: `New free estimate request — ${projectLabel} [${ref}]`,
            _replyto: values.email,
            _template: "table",
            source: "website-estimate-form",
            page: window.location.href,
            submittedAt: new Date().toISOString(),
          }),
        });
        window.clearTimeout(timeout);
        if (!res.ok) throw new Error(`Endpoint responded ${res.status}`);
      } else if (site.form.provider === "mailto") {
        // Zero-setup fallback: open the visitor's mail app pre-filled.
        const subject = `New estimate request — ${values.name} (${projectLabel}) [${ref}]`;
        const body = [
          `Name: ${values.name}`,
          `Phone: ${values.phone}`,
          `Email: ${values.email}`,
          `Project type: ${projectLabel}`,
          "",
          `Details: ${values.message || "—"}`,
          "",
          `Ref: ${ref}`,
          `Page: ${window.location.href}`,
        ].join("\n");
        window.location.href = `mailto:${site.form.notifyEmail}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(body)}`;
      } else {
        // "demo" provider — simulate a request while the template is unrouted.
        await new Promise((resolve) => setTimeout(resolve, 900));
      }
      setRefCode(ref);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setRefCode("");
    setStatus("idle");
  };

  const firstName = values.name.trim().split(/\s+/)[0];
  const inputBase =
    "w-full rounded-md border bg-paper px-4 py-3 text-[15px] placeholder:text-mist/60 transition-colors focus:border-accent focus:outline-none";
  const labelBase = "mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-mist";

  return (
    <section id="estimate" className="relative overflow-hidden bg-navy-900 py-24 text-paper lg:py-32">
      {/* Ambient texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(217,227,238,0.028) 0 2px, transparent 2px 40px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 62%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        {/* Left rail: pitch + process + contact */}
        <Reveal className="lg:col-span-5">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            <span className="h-[2px] w-9 bg-accent" aria-hidden="true" />
            Free estimate
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.7rem)] uppercase leading-[1.02]">
            Your quote is one
            <br />
            short form <span className="text-accent">away.</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-navy-100/75">
            Tell us what you're dreaming about. A real person from our Austin office — not a call
            center — reviews every request and gets back to you within one business hour.
          </p>

          <ol className="mt-10 space-y-6">
            {site.process.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-navy-700 bg-navy-800 font-display text-lg text-accent">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-bold text-paper">{step.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-navy-100/65">{step.body}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10 space-y-4 border-t border-navy-700 pt-8 text-sm">
            <a href={site.brand.phoneHref} className="flex items-center gap-3 font-semibold text-paper transition-colors hover:text-accent">
              <IconPhone size={18} className="text-accent" />
              {site.brand.phone}
            </a>
            <a href={`mailto:${site.brand.email}`} className="flex items-center gap-3 text-navy-100/80 transition-colors hover:text-accent">
              <IconMail size={18} className="text-accent" />
              {site.brand.email}
            </a>
            <p className="flex items-center gap-3 text-navy-100/80">
              <IconClock size={18} className="text-accent" />
              {site.brand.hours}
            </p>
            <p className="flex items-center gap-3 text-navy-100/80">
              <IconPin size={18} className="text-accent" />
              {site.brand.address}
            </p>
          </div>
        </Reveal>

        {/* Form card */}
        <Reveal delay={150} className="lg:col-span-7">
          <div className="rounded-lg border border-navy-700 border-t-4 border-t-accent bg-card p-7 text-ink shadow-[0_45px_90px_-35px_rgba(0,0,0,0.8)] sm:p-10">
            {status === "success" ? (
              <div className="fade-in flex flex-col items-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <IconCheck size={32} />
                </span>
                <h3 className="mt-6 font-display text-3xl uppercase text-ink">
                  Request received{firstName ? `, ${firstName}` : ""}!
                </h3>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-1.5 font-mono text-xs tracking-wider text-mist">
                  Ref: <span className="font-semibold text-accent">{refCode || "APX-LOGGED"}</span>
                </p>
                <p className="mt-5 max-w-sm leading-relaxed text-mist">
                  Thanks — your estimate request is in our queue. Someone from our Austin office
                  will call you within one business hour ({site.brand.hours}).
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 rounded-md border border-line px-6 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-[1.7rem] uppercase text-ink">Request your free quote</h3>
                <p className="mt-2 text-sm text-mist">
                  Takes about 60 seconds. No spam, no pressure — ever.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={values.website}
                    onChange={(e) => setField("website", e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <div>
                    <label htmlFor="name" className={labelBase}>
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jordan Ramirez"
                      value={values.name}
                      onChange={(e) => setField("name", e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      className={`${inputBase} text-ink ${errors.name ? "border-red-400" : "border-line"}`}
                    />
                    {errors.name && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelBase}>
                      Phone number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(512) 555-0123"
                      value={values.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                      className={`${inputBase} text-ink ${errors.phone ? "border-red-400" : "border-line"}`}
                    />
                    {errors.phone && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="email" className={labelBase}>
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(e) => setField("email", e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      className={`${inputBase} text-ink ${errors.email ? "border-red-400" : "border-line"}`}
                    />
                    {errors.email && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="project" className={labelBase}>
                      Project type *
                    </label>
                    <div className="relative">
                      <select
                        id="project"
                        value={values.project}
                        onChange={(e) => setField("project", e.target.value as ProjectType | "")}
                        aria-invalid={Boolean(errors.project)}
                        className={`${inputBase} appearance-none pr-11 ${
                          errors.project ? "border-red-400" : "border-line"
                        } ${values.project === "" ? "text-mist/60" : "text-ink"}`}
                      >
                        <option value="" disabled>
                          Select your project type…
                        </option>
                        {site.projectTypes.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                      <svg
                        viewBox="0 0 24 24"
                        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                    {errors.project && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">{errors.project}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelBase}>
                      Anything else? <span className="normal-case tracking-normal text-mist/60">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Rooms, colors, timelines, that one wall the dog ruined…"
                      value={values.message}
                      onChange={(e) => setField("message", e.target.value)}
                      className={`${inputBase} resize-none border-line text-ink`}
                    />
                  </div>

                  {status === "error" && (
                    <div
                      role="alert"
                      className="fade-in flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-800 sm:col-span-2"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-0.5 h-4 w-4 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7.5v5.2M12 16.2v.1" />
                      </svg>
                      <span>
                        <strong className="block font-bold">Something went wrong.</strong>
                        Your request didn't send — please try again, or call us directly at{" "}
                        <a href={site.brand.phoneHref} className="font-bold underline underline-offset-2">
                          {site.brand.phone}
                        </a>
                        .
                      </span>
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="flex w-full items-center justify-center gap-2.5 rounded-md bg-accent py-4 text-base font-bold text-navy-950 transition-all duration-300 hover:bg-accent-deep hover:text-paper disabled:cursor-wait disabled:opacity-80"
                    >
                      {status === "submitting" ? (
                        <>
                          <span
                            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-navy-950/40 border-t-navy-950"
                            aria-hidden="true"
                          />
                          Sending your request…
                        </>
                      ) : (
                        "Send my free estimate request"
                      )}
                    </button>
                    <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-mist">
                      <IconShield size={15} className="shrink-0 text-accent" />
                      Licensed &amp; insured · We reply within one business hour · {site.brand.license}
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
