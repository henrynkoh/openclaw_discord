"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AudienceLevel, ChannelId, LifecycleStage, Skill } from "@/lib/types";
import { CHANNELS } from "@/data/channels";
import { getPrompts } from "@/data/prompts";
import { SKILLS } from "@/data/skillCatalog";
import { CopyButton } from "./CopyButton";

const STAGES: { id: LifecycleStage; label: string }[] = [
  { id: "preplan", label: "Preplan" },
  { id: "plan", label: "Plan" },
  { id: "execution", label: "Execution" },
  { id: "postplan", label: "Post-plan" },
  { id: "other", label: "Other" },
];

const AUDIENCES: { id: AudienceLevel; label: string }[] = [
  { id: "basic", label: "Basic" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

function groupSkills(skills: Skill[]) {
  const byStage = new Map<LifecycleStage, Map<string, Skill[]>>();
  for (const s of skills) {
    if (!byStage.has(s.stage)) byStage.set(s.stage, new Map());
    const subs = byStage.get(s.stage)!;
    if (!subs.has(s.subcategory)) subs.set(s.subcategory, []);
    subs.get(s.subcategory)!.push(s);
  }
  return byStage;
}

export function GuideShell() {
  const [channel, setChannel] = useState<ChannelId>("telegram");
  const [promptStage, setPromptStage] = useState<LifecycleStage>("execution");
  const [audience, setAudience] = useState<AudienceLevel>("intermediate");
  const [skillId, setSkillId] = useState<string>("skill-1");
  const [navOpen, setNavOpen] = useState(true);

  const grouped = useMemo(() => groupSkills(SKILLS), []);
  const selected = useMemo(() => SKILLS.find((s) => s.id === skillId) ?? SKILLS[0], [skillId]);
  const channelMeta = CHANNELS.find((c) => c.id === channel)!;
  const prompts = useMemo(
    () => getPrompts(channel, promptStage, audience),
    [channel, promptStage, audience],
  );

  const subjectLine = useMemo(() => {
    switch (promptStage) {
      case "preplan":
        return `Isolate the Mac, define risk, and prep ${channelMeta.label} + OpenClaw without mixing personal accounts.`;
      case "plan":
        return `Design tokens, pairing, allowlists, and commands for OpenClaw ↔ ${channelMeta.label}.`;
      case "execution":
        return `Run the gateway, validate DMs/groups, and tune model + ${channelMeta.label} behavior.`;
      case "postplan":
        return `Monitor, rotate secrets, back up, and improve skills after ${channelMeta.label} is live.`;
      default:
        return `macOS bridges, SMB/Tailscale, clipboard rituals, and edge cases around ${channelMeta.label}.`;
    }
  }, [channelMeta.label, promptStage]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="flex flex-wrap items-center gap-3 border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
          <div className="min-w-0 flex-1">
            <Link
              href="/"
              className="mb-1 inline-block text-[11px] font-medium text-zinc-500 underline-offset-4 hover:text-emerald-700 hover:underline dark:hover:text-emerald-400"
            >
              ← Landing
            </Link>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              OpenClaw · Dedicated MacBook Pro · SNS
            </p>
            <h1 className="truncate text-lg font-semibold tracking-tight">
              Playbook: OpenClaw ↔ {channelMeta.label}
            </h1>
            <p className="mt-1 max-w-4xl text-sm text-zinc-600 dark:text-zinc-400">{subjectLine}</p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium md:hidden dark:border-zinc-600"
            onClick={() => setNavOpen((o) => !o)}
          >
            {navOpen ? "Hide skills" : "Skills"}
          </button>
        </div>

        <div className="flex flex-col gap-3 px-4 py-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="self-center text-xs font-medium text-zinc-500">Channel</span>
            {CHANNELS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setChannel(c.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  channel === c.id
                    ? "bg-emerald-600 text-white shadow"
                    : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-1">
              <span className="self-center text-xs font-medium text-zinc-500">Stage (prompts)</span>
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setPromptStage(s.id)}
                  className={`rounded-md px-2 py-1 text-xs font-medium ${
                    promptStage === s.id
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 border-l border-zinc-200 pl-3 dark:border-zinc-700">
              <span className="self-center text-xs font-medium text-zinc-500">Audience</span>
              {AUDIENCES.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAudience(a.id)}
                  className={`rounded-md px-2 py-1 text-xs font-medium ${
                    audience === a.id
                      ? "bg-amber-500/90 text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-100 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
          <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Top 10 copy-pastable prompts ({channelMeta.label} · {STAGES.find((x) => x.id === promptStage)?.label} ·{" "}
            {AUDIENCES.find((x) => x.id === audience)?.label})
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">Doc hint: {channelMeta.docHint}</p>
          <ol className="mt-3 space-y-2">
            {prompts.map((p, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-lg border border-zinc-200 bg-white p-2 text-sm leading-snug dark:border-zinc-700 dark:bg-zinc-950"
              >
                <span className="mt-0.5 w-6 shrink-0 text-right text-xs font-bold text-zinc-400">{i + 1}</span>
                <p className="min-w-0 flex-1">{p}</p>
                <CopyButton text={p} className="shrink-0 self-start" />
              </li>
            ))}
          </ol>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside
          className={`${
            navOpen ? "flex" : "hidden"
          } w-full shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:flex md:w-80`}
        >
          <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <p className="text-sm font-semibold">100 skills · lifecycle map</p>
            <p className="text-xs text-zinc-500">Preplan → Plan → Execution → Post-plan → Other</p>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            {STAGES.map((st) => {
              const subs = grouped.get(st.id);
              if (!subs) return null;
              return (
                <div key={st.id} className="mb-4">
                  <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                    {st.label}
                  </p>
                  {[...subs.entries()].map(([sub, items]) => (
                    <div key={sub} className="mb-3">
                      <p className="px-2 text-[10px] font-semibold uppercase text-zinc-500">{sub}</p>
                      <ul className="mt-1 space-y-0.5">
                        {items.map((sk) => (
                          <li key={sk.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setSkillId(sk.id);
                                if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
                                  setNavOpen(false);
                                }
                              }}
                              className={`w-full rounded-md px-2 py-1.5 text-left text-xs leading-snug transition ${
                                skillId === sk.id
                                  ? "bg-emerald-100 font-medium text-emerald-950 dark:bg-emerald-900/40 dark:text-emerald-50"
                                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                              }`}
                            >
                              <span className="text-zinc-400">{sk.n}.</span> {sk.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            })}
          </nav>
        </aside>

        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto p-6">
          <article className="mx-auto max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Skill {selected.n} · {STAGES.find((s) => s.id === selected.stage)?.label} · {selected.subcategory}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{selected.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.audience.map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  {a}
                </span>
              ))}
            </div>
            <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{selected.summary}</p>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-zinc-500">Steps</h3>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
              {selected.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            {selected.checklist && (
              <>
                <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-zinc-500">Checklist</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  {selected.checklist.map((c, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-emerald-600">✓</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {selected.references && selected.references.length > 0 && (
              <>
                <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-zinc-500">References</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  {selected.references.map((r) => (
                    <li key={r.href}>
                      <a href={r.href} className="text-emerald-700 underline underline-offset-2 hover:text-emerald-600 dark:text-emerald-400" target="_blank" rel="noreferrer">
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <footer className="mt-12 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800">
              Educational playbook for self-hosted OpenClaw-style agents on a dedicated Mac. Adapt commands to your
              installed CLI and docs. Never paste live tokens into web forms you do not trust.
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
}
