"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaseStudyCards } from "@/components/caseStudy/CaseStudyCards";
import { CHANNELS } from "@/data/channels";
import { getCaseStudies } from "@/data/caseStudies";
import { getPrompts } from "@/data/prompts";
import { SKILLS } from "@/data/skillCatalog";
import { GITHUB_REPO_URL } from "@/lib/site";
import { GitHubFab } from "./GitHubFab";

const REPO_BASE = GITHUB_REPO_URL.replace(/\.git$/, "").replace(/\/$/, "");

const SECTIONS = [
  { id: "hero", label: "Overview", nav: "Overview" },
  { id: "features", label: "Features", nav: "Features" },
  { id: "channels", label: "SNS channels", nav: "Channels" },
  { id: "lifecycle", label: "Lifecycle", nav: "Lifecycle" },
  { id: "skills", label: "100 skills", nav: "100 skills" },
  { id: "prompts", label: "Prompt engine", nav: "Prompts" },
  { id: "case-studies", label: "Case studies", nav: "Case studies" },
  { id: "playbook", label: "Interactive app", nav: "Playbook" },
  { id: "docs", label: "Docs & repo", nav: "Docs" },
] as const;

const CHANNEL_COLORS: Record<string, string> = {
  telegram: "from-sky-500 to-cyan-400",
  discord: "from-indigo-500 to-violet-500",
  slack: "from-emerald-500 to-teal-400",
  matrix: "from-amber-500 to-orange-400",
  signal: "from-blue-600 to-blue-400",
  whatsapp: "from-green-600 to-emerald-500",
  imessage: "from-fuchsia-500 to-pink-400",
  webchat: "from-rose-500 to-red-400",
};

const TELEGRAM_EXEC_ADV_PROMPTS = getPrompts("telegram", "execution", "advanced");
const TELEGRAM_EXEC_ADV_CASES = getCaseStudies(
  "telegram",
  "execution",
  "advanced",
  TELEGRAM_EXEC_ADV_PROMPTS,
  "Telegram",
);

export function LandingPage() {
  const [active, setActive] = useState<string>("hero");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.target.id) setActive(e.target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileNavOpen(false);
  }, []);

  return (
    <div className="landing-mesh min-h-screen text-zinc-900 dark:text-zinc-50">
      {/* Desktop: left nav */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-56 flex-col border-r border-white/10 bg-white/70 shadow-xl backdrop-blur-xl dark:bg-zinc-950/80 lg:flex xl:w-64">
        <div className="border-b border-zinc-200/80 p-4 dark:border-zinc-800">
          <p className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            OpenClaw Playbook
          </p>
          <p className="mt-1 text-[11px] leading-snug text-zinc-500">Scroll sections · Dedicated Mac · SNS</p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain p-3" aria-label="Page sections">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className={`rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                active === s.id
                  ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/15 text-emerald-900 shadow-sm dark:from-emerald-500/25 dark:to-cyan-500/10 dark:text-emerald-100"
                  : "text-zinc-600 hover:bg-white/60 dark:text-zinc-400 dark:hover:bg-zinc-800/80"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    active === s.id ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "bg-zinc-300 dark:bg-zinc-600"
                  }`}
                />
                {s.nav}
              </span>
            </button>
          ))}
        </nav>
        <div className="border-t border-zinc-200/80 p-3 dark:border-zinc-800">
          <Link
            href="/playbook"
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:brightness-110"
          >
            Open full playbook →
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-white/10 bg-white/80 px-3 py-2 backdrop-blur-xl dark:bg-zinc-950/90 lg:hidden">
        <p className="truncate bg-gradient-to-r from-emerald-600 to-violet-500 bg-clip-text text-sm font-bold text-transparent">
          OpenClaw Playbook
        </p>
        <button
          type="button"
          onClick={() => setMobileNavOpen((o) => !o)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold dark:border-zinc-700 dark:bg-zinc-900"
        >
          {mobileNavOpen ? "Close" : "Sections"}
        </button>
      </header>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileNavOpen(false)} />
      )}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-30 max-h-[50vh] overflow-y-auto border-t border-white/10 bg-white/95 p-3 shadow-2xl backdrop-blur-xl transition-transform dark:bg-zinc-950/95 lg:hidden ${
          mobileNavOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
        aria-label="Mobile section navigation"
      >
        <div className="grid grid-cols-2 gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className={`rounded-xl px-3 py-2 text-left text-xs font-medium ${
                active === s.id ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200" : "bg-zinc-100 dark:bg-zinc-800"
              }`}
            >
              {s.nav}
            </button>
          ))}
        </div>
        <Link
          href="/playbook"
          className="mt-3 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-sm font-semibold text-white"
          onClick={() => setMobileNavOpen(false)}
        >
          Full interactive playbook
        </Link>
      </nav>

      <main className="relative lg:pl-56 xl:pl-64">
        <section id="hero" className="scroll-mt-20 px-4 pb-20 pt-12 sm:px-8 sm:pt-16 lg:scroll-mt-4">
          <div className="mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Next.js 16 · Self-hosted agents
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-zinc-900 via-emerald-800 to-cyan-700 bg-clip-text text-transparent dark:from-white dark:via-emerald-200 dark:to-cyan-300">
                Your dedicated Mac.
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">
                OpenClaw ↔ every chat surface.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              One visual hub for <strong className="text-zinc-800 dark:text-zinc-200">100 lifecycle skills</strong>,{" "}
              <strong className="text-zinc-800 dark:text-zinc-200">eight SNS channels</strong>, and{" "}
              <strong className="text-zinc-800 dark:text-zinc-200">copy-pastable prompts</strong>—built for a 24/7
              MacBook Pro workspace without mixing personal credentials.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/playbook"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-[1.02] hover:shadow-xl"
              >
                Launch interactive playbook
              </Link>
              <button
                type="button"
                onClick={() => scrollTo("features")}
                className="inline-flex items-center justify-center rounded-2xl border-2 border-zinc-300 bg-white/50 px-8 py-4 text-base font-semibold text-zinc-800 backdrop-blur transition hover:bg-white dark:border-zinc-600 dark:bg-zinc-900/50 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                Explore features
              </button>
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-20 border-t border-white/10 px-4 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Features & functions</h2>
            <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
              Everything is in the browser: pick a channel, stage, and audience—then copy prompts into your LLM on the
              isolated Mac.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon="📚"
                title="100 mapped skills"
                desc="Preplan → Post-plan, grouped by subcategories: hardware, pairing, Telegram/Discord patterns, macOS bridges."
                gradient="from-emerald-500/20 to-cyan-500/10"
              />
              <FeatureCard
                icon="🧩"
                title="8 SNS surfaces"
                desc="Telegram, Discord, Slack, Matrix, Signal, WhatsApp, iMessage, and local web UI—each with tailored copy."
                gradient="from-violet-500/20 to-fuchsia-500/10"
              />
              <FeatureCard
                icon="✂️"
                title="10 prompts × context"
                desc="Per channel, lifecycle stage, and audience (Basic / Intermediate / Advanced)—one-click copy."
                gradient="from-amber-500/20 to-orange-500/10"
              />
              <FeatureCard
                icon="🖥️"
                title="Dedicated Mac focus"
                desc="Isolation, tokens, SMB & Tailscale bridges when Universal Clipboard won’t cross Apple IDs."
                gradient="from-sky-500/20 to-blue-500/10"
              />
              <FeatureCard
                icon="⚡"
                title="Next.js App Router"
                desc="Fast, static-friendly UI with client-side interactivity where it matters."
                gradient="from-rose-500/20 to-pink-500/10"
              />
              <FeatureCard
                icon="📖"
                title="Docs included"
                desc="Quickstart, tutorial, manual, and marketing copy in /docs—clone and adapt."
                gradient="from-teal-500/20 to-emerald-500/10"
              />
              <FeatureCard
                icon="📋"
                title="Case studies per prompt"
                desc="Each of the 10 prompts has a scenario, how-to-apply steps, and a success check—exemplar: Telegram · Execution · Advanced."
                gradient="from-violet-500/20 to-fuchsia-500/10"
              />
            </div>
          </div>
        </section>

        <section id="channels" className="scroll-mt-20 border-t border-white/10 px-4 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Chat & SNS channels</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">Each tile opens context in the full playbook—same gateway, different rules.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CHANNELS.map((c) => (
                <div
                  key={c.id}
                  className="group rounded-2xl border border-zinc-200/90 bg-white/85 p-5 shadow-md backdrop-blur transition hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-xl dark:border-zinc-700/80 dark:bg-zinc-900/70"
                >
                  <div
                    className={`h-1.5 w-14 rounded-full bg-gradient-to-r shadow-sm ${CHANNEL_COLORS[c.id] ?? "from-zinc-500 to-zinc-700"}`}
                  />
                  <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-50">{c.label}</h3>
                  <p className="mt-2 text-sm leading-snug text-zinc-600 dark:text-zinc-400">{c.short}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="lifecycle" className="scroll-mt-20 border-t border-white/10 px-4 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Lifecycle stages</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">Skills and prompts follow how real deployments actually unfold.</p>
            <div className="mt-10 flex flex-col gap-4">
              {[
                { name: "Preplan", color: "from-sky-500 to-cyan-400", text: "Hardware, isolation, Apple ID strategy, threat thinking." },
                { name: "Plan", color: "from-violet-500 to-purple-500", text: "Tokens, pairing, allowlists, commands, webhooks vs polling." },
                { name: "Execution", color: "from-emerald-500 to-teal-400", text: "Gateway health, first DM, groups, mentions, logs." },
                { name: "Post-plan", color: "from-amber-500 to-orange-400", text: "Rotation, backups, monitoring, cost, improvement loop." },
                { name: "Other", color: "from-rose-500 to-pink-400", text: "SMB, Tailscale, clipboard bridges, advanced security." },
              ].map((row, i) => (
                <div
                  key={row.name}
                  className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/60 p-5 shadow-md backdrop-blur dark:bg-zinc-900/60 sm:flex-row sm:items-center sm:gap-6"
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-black text-white shadow-lg ${row.color}`}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{row.name}</h3>
                    <p className="mt-1 text-zinc-600 dark:text-zinc-400">{row.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-20 border-t border-white/10 px-4 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">100 skills snapshot</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Structured catalog—browse by stage and subcategory in the full app. Sample entries:
            </p>
            <ul className="mt-8 space-y-3">
              {SKILLS.slice(0, 6).map((sk) => (
                <li
                  key={sk.id}
                  className="flex gap-4 rounded-xl border border-zinc-200/80 bg-white/70 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900/50"
                >
                  <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">#{sk.n}</span>
                  <span className="text-sm font-medium">{sk.title}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-zinc-500">+ 94 more in the interactive playbook…</p>
          </div>
        </section>

        <section id="prompts" className="scroll-mt-20 border-t border-white/10 px-4 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Prompt engine preview</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Live copy from the same engine as the playbook—Telegram · Execution · Intermediate:
            </p>
            <PromptPreview />
          </div>
        </section>

        <section id="case-studies" className="scroll-mt-20 border-t border-white/10 px-4 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-violet-800 dark:text-violet-200">
              Exemplar track
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Case studies for the top 10 prompts</h2>
            <p className="mt-3 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
              Below is the full <strong className="text-zinc-900 dark:text-zinc-100">Telegram · Execution · Advanced</strong>{" "}
              set. Each card matches <strong>one</strong> prompt: first{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">step-by-step</strong> instructions you can do on the Mac,
              then scenario, LLM guidance, and a success check. In the{" "}
              <Link href="/playbook" className="font-semibold text-emerald-700 underline underline-offset-2 dark:text-emerald-400">
                playbook
              </Link>
              , choose <strong className="text-zinc-900 dark:text-zinc-100">Discord · Preplan · Basic</strong> for the same
              style of practical steps aligned with your screenshot workflow.
            </p>
            <div className="mt-10 rounded-3xl border border-violet-200/60 bg-white/70 p-4 shadow-xl backdrop-blur dark:border-violet-900/40 dark:bg-zinc-900/60 sm:p-6">
              <CaseStudyCards items={TELEGRAM_EXEC_ADV_CASES} />
            </div>
          </div>
        </section>

        <section id="playbook" className="scroll-mt-20 border-t border-white/10 px-4 py-20 sm:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-white/80 to-cyan-500/10 p-10 text-center shadow-2xl dark:from-emerald-900/20 dark:via-zinc-900/80 dark:to-cyan-900/20">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Interactive playbook</h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
              Full UI: channel pills, stage tabs, audience tiers, all 100 skills in the sidebar, and ten copyable prompts
              in the header.
            </p>
            <Link
              href="/playbook"
              className="mt-8 inline-flex rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 px-10 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-500/25 transition hover:scale-[1.03]"
            >
              Enter playbook workspace
            </Link>
          </div>
        </section>

        <section id="docs" className="scroll-mt-20 border-t border-white/10 px-4 py-20 pb-32 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Documentation</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { path: "README.md", label: "README", desc: "Overview & commands" },
                { path: "docs/QUICKSTART.md", label: "Quickstart", desc: "Run in minutes" },
                { path: "docs/TUTORIAL.md", label: "Tutorial", desc: "UI walkthrough" },
                { path: "docs/MANUAL.md", label: "Manual", desc: "Technical reference" },
              ].map((d) => (
                <a
                  key={d.label}
                  href={`${REPO_BASE}/blob/main/${d.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-zinc-200 bg-white/80 p-5 transition hover:border-emerald-400/50 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900/60"
                >
                  <p className="font-semibold text-zinc-900 group-hover:text-emerald-700 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                    {d.label} →
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{d.desc}</p>
                </a>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-zinc-500">
              Replace GitHub paths with your fork if needed. Set <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">NEXT_PUBLIC_GITHUB_URL</code> for the floating button.
            </p>
          </div>
        </section>
      </main>

      <GitHubFab />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  gradient,
}: {
  icon: string;
  title: string;
  desc: string;
  gradient: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/30 bg-gradient-to-br ${gradient} p-6 shadow-lg backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-xl dark:border-zinc-700/50`}
    >
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{desc}</p>
    </div>
  );
}

function PromptPreview() {
  const [i, setI] = useState(0);
  const lines = getPrompts("telegram", "execution", "intermediate");
  const line = lines[i] ?? lines[0];

  return (
    <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-950 p-6 text-zinc-100 shadow-inner dark:border-zinc-700">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
        <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 font-mono text-emerald-400">telegram</span>
        <span className="rounded-md bg-cyan-500/20 px-2 py-0.5 font-mono text-cyan-400">execution</span>
        <span className="rounded-md bg-amber-500/20 px-2 py-0.5 font-mono text-amber-400">intermediate</span>
      </div>
      <p className="min-h-[4rem] text-sm leading-relaxed text-zinc-200">{line}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setI((x) => (x + 1) % lines.length)}
          className="rounded-lg bg-zinc-800 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-700"
        >
          Shuffle prompt
        </button>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(line)}
          className="rounded-lg border border-zinc-600 px-4 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-800"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
