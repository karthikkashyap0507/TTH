import Link from "next/link";
import { site } from "@/content/site";
import { ScaleMark } from "./icons";
import { cx } from "@/lib/tones";

/** The Scale House logo mark + "THE SCALE HOUSE" wordmark with the key word in red. */
export function Logo({ className }: { className?: string }) {
  const [first, ...rest] = site.wordmark.split(" ");
  const highlight = rest[0];
  const tail = rest.slice(1).join(" ");
  return (
    <Link href="/" className={cx("group flex items-center gap-2.5", className)} aria-label={`${site.name} — home`}>
      <ScaleMark className="size-9 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105" />
      <span className="font-display text-lg font-black tracking-tight text-bone">
        {first} <span className="text-red-bright">{highlight}</span> {tail}
      </span>
    </Link>
  );
}
