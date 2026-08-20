import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Stroke({ size = 22, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---- Brand mark ---- */
export function Logo({ size = 38, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" {...props}>
      <rect width="40" height="40" rx="9" fill="#12293F" />
      <path d="M20 7.5 30.5 32h-5.8L20 19.6 15.3 32H9.5Z" fill="#F3F6FA" />
      <g transform="skewX(-16)">
        <rect x="14.5" y="24.5" width="24" height="3.6" fill="var(--accent)" />
      </g>
    </svg>
  );
}

/* ---- Benefit icons ---- */
export function IconShield(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M12 3.2 19 6v5.1c0 4.4-2.9 7.9-7 9.7-4.1-1.8-7-5.3-7-9.7V6l7-2.8Z" />
      <path d="m8.8 11.6 2.3 2.3 4.1-4.6" />
    </Stroke>
  );
}

export function IconBadge(props: IconProps) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="9.2" r="5.6" />
      <path d="m12 6.8.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 8.9l2-.3Z" fill="currentColor" strokeWidth="1" />
      <path d="M8.7 13.9 7.4 20.8l4.6-2.4 4.6 2.4-1.3-6.9" />
    </Stroke>
  );
}

export function IconClockCheck(props: IconProps) {
  return (
    <Stroke {...props}>
      <circle cx="11" cy="13" r="7.6" />
      <path d="M11 9.2V13l2.6 2" />
      <path d="m17.6 3 .7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7Z" fill="currentColor" strokeWidth="1" />
    </Stroke>
  );
}

/* ---- Service icons ---- */
export function IconRoller(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect x="3.5" y="4" width="13" height="5.6" rx="1.2" />
      <path d="M16.5 6.8H20a1 1 0 0 1 1 1v2.8a1.6 1.6 0 0 1-1.6 1.6H12.5v2" />
      <rect x="11" y="14.2" width="3" height="6.3" rx="1" />
    </Stroke>
  );
}

export function IconBrush(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M20.2 3.8c-3.4.5-6.6 2-8.9 4.4l3.5 3.5c2.4-2.3 3.9-5.5 4.4-8.9Z" />
      <path d="m11.3 8.2-1.2 1.2 4.5 4.5 1.2-1.2" />
      <path d="M9.6 9.9 5.3 11.6c-1.6.6-2.4 2.5-2.9 5.4 1.5-.4 2.6-.4 3.9.1 2 .8 4-.2 4.6-2.2l.6-2.1" />
    </Stroke>
  );
}

export function IconCabinet(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect x="4" y="3.8" width="16" height="16.4" rx="1.4" />
      <path d="M12 3.8v16.4" />
      <path d="M9.6 10.8v2.4M14.4 10.8v2.4" />
    </Stroke>
  );
}

/* ---- UI icons ---- */
export function IconPhone(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M5.2 3.8h3.4l1.5 4.3-2.1 1.6a12.6 12.6 0 0 0 5.8 5.8l1.6-2.1 4.3 1.5v3.4a1.7 1.7 0 0 1-1.9 1.7A16.6 16.6 0 0 1 3.5 5.7a1.7 1.7 0 0 1 1.7-1.9Z" />
    </Stroke>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect x="3.4" y="5.4" width="17.2" height="13.2" rx="2" />
      <path d="m4.5 7.4 7.5 5.6 7.5-5.6" />
    </Stroke>
  );
}

export function IconPin(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M12 21s-6.6-5.4-6.6-10.4a6.6 6.6 0 0 1 13.2 0C18.6 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.3" />
    </Stroke>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.6V12l3 2.2" />
    </Stroke>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="m5 12.6 4.4 4.4L19 7.4" />
    </Stroke>
  );
}

export function IconArrow(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M4.5 12h14.5" />
      <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
    </Stroke>
  );
}

export function IconDrag(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="m9.2 6.5-4.2 5.5 4.2 5.5" />
      <path d="m14.8 6.5 4.2 5.5-4.2 5.5" />
    </Stroke>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </Stroke>
  );
}

export function IconX(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Stroke>
  );
}

export function IconStar({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 2.8 14.9 8.7l6.5.9-4.7 4.5 1.1 6.4L12 17.5l-5.8 3 1.1-6.4-4.7-4.5 6.5-.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function StarRow({ count = 5, size = 15, className = "" }: { count?: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-star ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <IconStar key={i} size={size} />
      ))}
    </span>
  );
}

export function IconQuote({ size = 26, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M9.6 6.8C6.6 8.4 5 10.7 5 13.6c0 2.1 1.4 3.6 3.2 3.6 1.7 0 3-1.3 3-3 0-1.6-1.1-2.8-2.7-2.9.3-1.3 1.3-2.4 2.8-3.2l-1.7-1.3Zm9 0c-3 1.6-4.6 3.9-4.6 6.8 0 2.1 1.4 3.6 3.2 3.6 1.7 0 3-1.3 3-3 0-1.6-1.1-2.8-2.7-2.9.3-1.3 1.3-2.4 2.8-3.2l-1.7-1.3Z"
        fill="currentColor"
      />
    </svg>
  );
}
