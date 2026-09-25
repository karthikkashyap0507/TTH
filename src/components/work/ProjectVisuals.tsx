import type { Project } from "@/content/site";
import { cx } from "@/lib/tones";

const initials = (name: string) =>
  name
    .replace(/&/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

/** Cover art: the project's image, or a generated monogram poster. */
export function ProjectCover({ project, className, size = "lg" }: { project: Project; className?: string; size?: "lg" | "sm" }) {
  const { palette } = project;
  return (
    <div className={cx("relative overflow-hidden", className)} style={{ background: palette.accent, color: palette.bg }}>
      {project.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.image} alt={`${project.name} cover`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `radial-gradient(${palette.bg} 1.5px, transparent 1.5px)`,
              backgroundSize: "18px 18px",
            }}
          />
          <div
            className="absolute -right-[12%] -bottom-[40%] aspect-square w-[55%] rounded-full opacity-30"
            style={{ background: palette.fg }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <span
              className={cx(
                "font-display font-black tracking-tighter transition-transform duration-500 group-hover:scale-110",
                size === "lg" ? "text-[3.25rem] sm:text-[6rem] lg:text-[7.5rem]" : "text-4xl sm:text-5xl",
              )}
            >
              {initials(project.name)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * The inside of the little browser window on /work.
 * Uses a video or screenshot if provided, otherwise draws an animated
 * mock website in the project's colours that gently scrolls.
 */
export function SitePreview({ project }: { project: Project }) {
  if (project.video) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover object-top"
        src={project.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }
  if (project.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={project.image} alt={`${project.name} website`} className="absolute inset-0 h-full w-full object-cover object-top" loading="lazy" />;
  }

  const { bg, fg, accent } = project.palette;
  const soft = `color-mix(in srgb, ${fg} 12%, transparent)`;
  const softer = `color-mix(in srgb, ${fg} 7%, transparent)`;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: bg, color: fg }}>
      <div
        className="animate-site-scroll p-[4%] [--scroll-distance:-52%] motion-reduce:animate-none"
        style={{ animationDelay: `${(project.slug.length % 5) * -1.3}s` }}
      >
        {/* nav */}
        <div className="flex items-center justify-between">
          <span className="font-display text-[0.55rem] font-black tracking-tight sm:text-[0.65rem]">{project.name.toUpperCase()}</span>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1 w-5 rounded-full" style={{ background: soft }} />
            ))}
            <span className="h-2.5 w-8 -translate-y-[3px] rounded-full" style={{ background: accent }} />
          </div>
        </div>

        {/* hero */}
        <div className="mt-[6%] grid grid-cols-5 items-center gap-[4%]">
          <div className="col-span-3">
            <div className="h-2.5 w-[92%] rounded" style={{ background: fg }} />
            <div className="mt-1.5 h-2.5 w-[70%] rounded" style={{ background: fg }} />
            <div className="mt-3 h-1 w-[85%] rounded" style={{ background: soft }} />
            <div className="mt-1 h-1 w-[60%] rounded" style={{ background: soft }} />
            <div className="mt-3 flex gap-1.5">
              <span className="h-3 w-12 rounded-full" style={{ background: accent }} />
              <span className="h-3 w-10 rounded-full border" style={{ borderColor: fg }} />
            </div>
          </div>
          <div className="col-span-2 aspect-[4/5] rounded-lg" style={{ background: accent }}>
            <div className="h-full w-full rounded-lg opacity-40" style={{ backgroundImage: `radial-gradient(${bg} 1px, transparent 1px)`, backgroundSize: "8px 8px" }} />
          </div>
        </div>

        {/* logos strip */}
        <div className="mt-[7%] flex justify-between gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="h-1.5 flex-1 rounded" style={{ background: softer }} />
          ))}
        </div>

        {/* product grid */}
        <div className="mt-[7%] h-1.5 w-[35%] rounded" style={{ background: fg }} />
        <div className="mt-2.5 grid grid-cols-4 gap-1.5">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i}>
              <div className="aspect-square rounded-md" style={{ background: i % 3 === 0 ? accent : soft }} />
              <div className="mt-1 h-1 w-[80%] rounded" style={{ background: soft }} />
              <div className="mt-0.5 h-1 w-[40%] rounded" style={{ background: accent }} />
            </div>
          ))}
        </div>

        {/* testimonial band */}
        <div className="mt-[7%] rounded-lg p-[4%]" style={{ background: accent, color: bg }}>
          <div className="mx-auto h-1.5 w-[60%] rounded" style={{ background: bg }} />
          <div className="mx-auto mt-1.5 h-1.5 w-[40%] rounded opacity-70" style={{ background: bg }} />
        </div>

        {/* footer */}
        <div className="mt-[7%] grid grid-cols-4 gap-2 border-t pt-3" style={{ borderColor: soft }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-1">
              <div className="h-1 w-[70%] rounded" style={{ background: fg }} />
              <div className="h-1 w-[50%] rounded" style={{ background: soft }} />
              <div className="h-1 w-[60%] rounded" style={{ background: soft }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
