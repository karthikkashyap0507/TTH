import { marqueeItems } from "@/content/site";
import { ScaleMark } from "./icons";

function Row() {
  // Two copies per row so a single row is always wider than the screen
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="flex shrink-0 items-center gap-8">
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-8 font-display text-xl font-black tracking-tight whitespace-nowrap text-white sm:text-2xl"
        >
          {item}
          <ScaleMark variant="mono" className="size-6 text-ink" />
        </span>
      ))}
    </div>
  );
}

/** Red ticker band. The track holds two identical rows and slides by -50%. */
export function Marquee() {
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-red py-4" aria-label="What we do">
      <div className="flex w-max animate-marquee items-center gap-8 pr-8 hover:[animation-play-state:paused]">
        <Row />
        <div aria-hidden="true" className="contents">
          <Row />
        </div>
      </div>
    </div>
  );
}
