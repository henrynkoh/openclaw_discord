import type { CaseStudyItem } from "@/data/caseStudies";

export function CaseStudyCards({
  items,
  compact = false,
}: {
  items: CaseStudyItem[];
  /** Tighter spacing for playbook header */
  compact?: boolean;
}) {
  return (
    <div className={compact ? "space-y-2" : "space-y-4"}>
      {items.map((cs, i) => (
        <details
          key={i}
          className="group rounded-xl border border-zinc-200 bg-white/90 open:shadow-md dark:border-zinc-700 dark:bg-zinc-950/80"
        >
          <summary className="cursor-pointer list-none px-4 py-3 pr-10 font-medium text-zinc-900 marker:content-none dark:text-zinc-100 [&::-webkit-details-marker]:hidden">
            <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xs font-bold text-white">
              {i + 1}
            </span>
            {cs.headline}
            <span className="ml-2 text-xs font-normal text-zinc-500 group-open:hidden">— tap to expand</span>
          </summary>
          <div className="space-y-3 border-t border-zinc-100 px-4 pb-4 pt-2 text-sm leading-relaxed dark:border-zinc-800">
            <div className="rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50/95 to-orange-50/40 px-3 py-3 dark:border-amber-900/50 dark:from-amber-950/50 dark:to-zinc-950/80">
              <p className="text-[11px] font-bold uppercase tracking-wide text-amber-900 dark:text-amber-200">
                Step-by-step (do in order)
              </p>
              <p className="mt-1 text-[11px] text-amber-900/80 dark:text-amber-200/90">
                Practical actions on your Mac—no jargon required. Check boxes mentally as you go.
              </p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 font-medium text-zinc-900 dark:text-zinc-100">
                {cs.practicalSteps.map((step, j) => (
                  <li key={j} className="marker:font-bold marker:text-amber-700 dark:marker:text-amber-400">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Scenario</p>
              <p className="mt-1 text-zinc-700 dark:text-zinc-300">{cs.scenario}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-sky-700 dark:text-sky-400">
                How to use this prompt (with your LLM)
              </p>
              <ol className="mt-1 list-decimal space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
                {cs.howToApply.map((step, j) => (
                  <li key={j}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-lg bg-emerald-500/10 px-3 py-2 dark:bg-emerald-900/20">
              <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">Success check</p>
              <p className="mt-1 text-zinc-800 dark:text-zinc-200">{cs.successCheck}</p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
