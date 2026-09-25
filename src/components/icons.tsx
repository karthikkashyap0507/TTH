import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** TTH mark — a house whose door is a text cursor. */
export function HouseMark(props: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M7 30 32 8l25 22" />
      <path d="M15 26v29h34V26" />
      <path d="M32 38v17" className="animate-blink" />
    </svg>
  );
}

/** Four-point spark used as a bullet / separator. */
export function Spark(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M32 2c2.2 17.6 12.4 27.8 30 30-17.6 2.2-27.8 12.4-30 30-2.2-17.6-12.4-27.8-30-30C19.6 29.8 29.8 19.6 32 2Z" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={9} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M32 8v48M8 32h48" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function DoubleTick(props: IconProps) {
  return (
    <svg viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m1.5 8.5 4 4 8-9M9.5 12.5l1 .5 8-9.5" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="tth-ig" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="30%" stopColor="#fa7e1e" />
          <stop offset="60%" stopColor="#d62976" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill="url(#tth-ig)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <rect x="5" y="9.5" width="3" height="9" fill="#fff" />
      <circle cx="6.5" cy="6.4" r="1.7" fill="#fff" />
      <path d="M10.5 9.5h2.9v1.3c.5-.8 1.5-1.5 3-1.5 2.6 0 3.1 1.7 3.1 3.9v5.3h-3v-4.7c0-1.1 0-2.3-1.5-2.3s-1.6 1.1-1.6 2.2v4.8h-2.9v-9Z" fill="#fff" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="6" fill="#25D366" />
      <path
        d="M12 5.2a6.7 6.7 0 0 0-5.8 10.1l-.9 3.4 3.5-.9A6.7 6.7 0 1 0 12 5.2Z"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.6 9.1c.2-.4.4-.4.6-.4h.4c.1 0 .3 0 .4.3l.6 1.4c0 .1.1.3 0 .4l-.3.5c-.1.1-.2.3 0 .5.2.4.7 1 1.1 1.3.5.4.9.6 1.1.7.2.1.3 0 .4-.1l.5-.6c.1-.2.3-.2.4-.1l1.3.6c.2.1.3.2.3.3 0 .3 0 .9-.4 1.2-.4.4-1.1.6-1.7.5-.6-.1-1.6-.5-2.6-1.3-.9-.8-1.6-1.8-1.8-2.3-.3-.6-.4-1.3-.1-1.8Z"
        fill="#fff"
      />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="6" fill="#ff4d00" />
      <rect x="5" y="7" width="14" height="10" rx="1.8" fill="none" stroke="#fff" strokeWidth="1.8" />
      <path d="m5.8 8 6.2 4.8L18.2 8" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8L12 2.8Z" />
    </svg>
  );
}
