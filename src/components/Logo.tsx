import Link from "next/link";
import { site } from "@/content/site";
import { HouseMark } from "./icons";
import { cx } from "@/lib/tones";

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link href="/" className={cx("group flex items-center gap-2.5", className)} aria-label={`${site.name} — home`}>
      <span
        className={cx(
          "grid size-9 place-items-center rounded-lg transition-transform duration-300 group-hover:-rotate-6",
          inverted ? "bg-orange text-cream" : "bg-ink text-orange",
        )}
      >
        <HouseMark className="size-5" />
      </span>
      <span className="font-display text-lg font-black tracking-tight">{site.wordmark}</span>
    </Link>
  );
}
