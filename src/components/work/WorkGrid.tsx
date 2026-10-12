"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Project } from "@/content/site";
import { ArrowUpRight, Plus } from "@/components/icons";
import { useWizard } from "@/components/wizard/WizardProvider";
import { cx } from "@/lib/tones";
import { SitePreview } from "./ProjectVisuals";

export function WorkGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ["ALL", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const [active, setActive] = useState("ALL");
  const { open } = useWizard();
  const visible = active === "ALL" ? projects : projects.filter((p) => p.category === active);

  return (
    <LayoutGroup>
      <div className="mb-6 flex flex-wrap gap-1.5 sm:mb-9 sm:gap-2" role="tablist" aria-label="Filter projects">
        {categories.map((c) => {
          const on = c === active;
          const count = c === "ALL" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(c)}
              className={cx(
                "relative rounded-full border px-3 py-1.5 font-display text-[0.6rem] font-black tracking-[0.08em] transition-colors sm:px-4 sm:py-2 sm:text-xs",
                on ? "border-red text-white" : "border-ink/15 text-ink/75 hover:border-red hover:text-red",
              )}
            >
              {on && (
                <motion.span
                  layoutId="work-filter"
                  className="absolute inset-0 -z-0 rounded-full bg-red"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">
                {c} <span className={on ? "text-white/70" : "text-ink/35"}>{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 6) * 0.04 }}
            >
              <ProjectCard project={p} onSimilar={() => open(`work:${p.slug}`)} />
            </motion.div>
          ))}
          <motion.div key="your-brand" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button
              type="button"
              onClick={() => open("work:your-brand")}
              className="group dot-grid-ink flex h-full min-h-72 w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-ink/20 bg-white/60 p-8 text-center text-ink transition-colors hover:border-red hover:bg-red/5"
            >
              <span className="grid size-16 place-items-center rounded-full bg-red text-white shadow-[0_0_30px_rgba(227,18,28,0.5)] transition-transform duration-500 group-hover:rotate-90">
                <Plus className="size-7" />
              </span>
              <span className="font-display text-2xl font-black tracking-tight uppercase">Your brand here</span>
              <span className="max-w-[16rem] text-sm font-medium text-ink/55">
                This spot is saved for the next business that moves in. Could be yours.
              </span>
              <span className="font-display text-xs font-black tracking-[0.14em] text-red">START A PROJECT →</span>
            </button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}

function ProjectCard({ project: p, onSimilar }: { project: Project; onSimilar: () => void }) {
  const live = !!p.url;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white text-ink shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-red hover:shadow-pop-lg">
      <div className="flex items-center justify-between gap-2 px-4 pt-4 pb-1">
        <h3 className="truncate font-display text-lg font-black tracking-tight uppercase">{p.name}</h3>
        <span className="flex shrink-0 items-center gap-1.5 font-display text-[0.6rem] font-black tracking-[0.14em] text-ink/45">
          {live ? (
            <>
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-red" />
              </span>
              LIVE
            </>
          ) : (
            p.category
          )}
        </span>
      </div>
      <p className="line-clamp-2 min-h-8 px-4 pb-3 text-xs font-medium text-ink/60 box-content">{p.blurb}</p>

      {/* mini browser */}
      <div className="mx-4 mb-4 overflow-hidden rounded-lg border border-ink/10">
        <div className="flex items-center gap-1.5 border-b border-ink/10 bg-[#f1efeb] px-2.5 py-1.5">
          <span className="size-1.5 rounded-full bg-red" />
          <span className="size-1.5 rounded-full bg-ink/25" />
          <span className="size-1.5 rounded-full bg-ink/15" />
          <span className="ml-1 min-w-0 truncate rounded-full bg-white px-2 font-display text-[0.55rem] font-bold tracking-wide text-ink/55">
            {p.domain ?? p.url?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? "yourbrand.com"}
          </span>
        </div>
        <div className="relative aspect-[16/9]">
          <SitePreview project={p} />
        </div>
      </div>

      {live ? (
        <a
          href={p.url}
          target="_blank"
          rel="noreferrer"
          className="mt-auto flex items-center justify-center gap-1.5 border-t border-ink/10 bg-ink py-3 text-center font-display text-xs font-black tracking-[0.14em] text-white transition-colors hover:bg-red"
        >
          VISIT WEBSITE
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ) : (
        <button
          type="button"
          onClick={onSimilar}
          className="mt-auto flex items-center justify-center gap-1.5 border-t border-ink/10 bg-ink py-3 text-center font-display text-xs font-black tracking-[0.14em] text-white transition-colors hover:bg-red"
        >
          WANT ONE LIKE THIS?
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      )}
    </article>
  );
}
