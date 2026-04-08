import type { AudienceLevel, ChannelId, LifecycleStage } from "@/lib/types";

/** One row of case-study guidance aligned with the Nth prompt (0-based index). */
export interface CaseStudyItem {
  headline: string;
  scenario: string;
  howToApply: string[];
  successCheck: string;
  /** Plain, ordered steps you can follow on the Mac without guessing—1:1 with this prompt. */
  practicalSteps: string[];
}

/** Discord · Preplan · Basic — matches Top 10 prompts in the playbook (screenshot reference). */
const DISCORD_PREPLAN_BASIC: CaseStudyItem[] = [
  {
    headline: "Why a second Mac (or dedicated machine) for Discord + OpenClaw",
    scenario:
      "You already have a daily Mac with email, photos, and personal Discord. You want OpenClaw 24/7 without risking that world.",
    howToApply: [
      "Paste the prompt into your LLM and ask for exactly five bullets.",
      "For each bullet, ask yourself: does this justify a separate machine vs a separate user on one Mac?",
    ],
    practicalSteps: [
      "On paper, draw two circles: “Daily Mac” and “Agent Mac” and list what must never cross between them (tokens, Apple ID, browser sessions).",
      "Decide: second physical Mac vs one Mac with two users—you only need one sentence for now.",
      "Paste the prompt into your LLM; copy its five bullets into Notes or a text file on the **agent** side only.",
      "Highlight the one bullet that matters most to you; star it in your note.",
      "Do nothing else today—just file the note as `preplan-01-dedicated-machine.md`.",
    ],
    successCheck: "You can explain to a friend in 30 seconds why the agent workload is not on your daily driver.",
  },
  {
    headline: "RAM, disk, power, cooling before 24/7 Discord gateway",
    scenario:
      "You are about to install OpenClaw and leave Discord connected overnight. Undersized disk or bad thermals cause mystery crashes.",
    howToApply: [
      "Use the LLM answer as a shopping / verification list, not as gospel—compare to Apple’s specs for your exact model.",
      "Prioritize: free disk space for logs and models, then RAM, then cooling.",
    ],
    practicalSteps: [
      "Apple menu → About This Mac → More Info → note **RAM** and **macOS version**.",
      "Open **Disk Utility** → select your volume → confirm at least **30–50 GB free** (more if you run local models).",
      "If laptop: plan **always plugged in** for 24/7; note whether you need a **stand** for airflow.",
      "Paste the prompt into your LLM; copy its list into `preplan-02-hardware-checklist.md`.",
      "Tick items you already verified; leave the rest as a weekend task—no token setup yet.",
    ],
    successCheck: "Your checklist exists and at least three items are checked with real numbers (GB free, RAM, etc.).",
  },
  {
    headline: "Rules of the road for the OpenClaw Mac",
    scenario:
      "Without rules, you will log into personal iCloud “just once” and the isolation story collapses.",
    howToApply: [
      "Treat the LLM output as a draft contract with yourself; shorten it to 5 rules max.",
      "Post the rules on the desktop of the agent user as plain text.",
    ],
    practicalSteps: [
      "Create a new macOS user **only** for agents (System Settings → Users & Groups) if you have not already.",
      "Log into that user; open **TextEdit** → make plain text → title: `rules-of-the-road.txt`.",
      "Write three non-negotiables in your own words: e.g. no personal Apple ID, no Safari personal profiles, Discord bot only for OpenClaw.",
      "Paste the prompt into your LLM; merge its wording into your file; keep it under one screen.",
      "Save to Desktop; set the file to open at login (Login Items) or pin it in Finder.",
    ],
    successCheck: "Someone else could read the file and know what is forbidden on that account.",
  },
  {
    headline: "Accounts that must not live on the agent Mac",
    scenario:
      "If the machine is stolen or the bot token leaks, you want zero path to your main email or bank.",
    howToApply: [
      "List accounts from the LLM answer; delete or never sign in to each on this Mac.",
    ],
    practicalSteps: [
      "On the agent user, open **Internet Accounts** in System Settings and confirm **no** personal iCloud mail/calendar.",
      "List on paper: email, banking, shopping, personal Discord client—mark each **OFF** for this Mac.",
      "Paste the prompt into your LLM; add any category you forgot (password managers with family vault, etc.).",
      "For each “must stay OFF” item, write where it *is* allowed (e.g. “only on phone / daily Mac”).",
      "Take a photo of the paper for your records (optional); **do not** store secrets in the photo.",
    ],
    successCheck: "Zero personal accounts you care about are logged in on the agent user.",
  },
  {
    headline: "New macOS user for OpenClaw with minimal rights",
    scenario:
      "A standard user without admin is harder to abuse; you can still run OpenClaw with the right setup.",
    howToApply: [
      "Use the LLM checklist alongside Apple’s docs for “create user” on your macOS version.",
    ],
    practicalSteps: [
      "System Settings → Users & Groups → Add User → **Standard** (not Administrator) if your workflow allows.",
      "Username pattern: e.g. `openclaw` or `agent`—avoid your real name in the short name.",
      "Turn **off** File Sharing guest access for this experiment if you do not need it.",
      "Paste the prompt; merge the LLM checklist into `preplan-05-new-user-checklist.md`.",
      "Log out and log in as the new user once to confirm you can open Terminal and a browser for docs only.",
    ],
    successCheck: "The OpenClaw user exists and you have logged in at least once successfully.",
  },
  {
    headline: "Document ports and processes (Discord gateway + OpenClaw)",
    scenario:
      "When something breaks, “which PID?” saves hours. You do not need fancy tools on day one.",
    howToApply: [
      "Ask the LLM for a table: process name, port, why it matters; then verify with Activity Monitor and `lsof` once.",
    ],
    practicalSteps: [
      "Start OpenClaw gateway (or note “not installed yet” and skip to template only).",
      "Open **Activity Monitor** → sort by CPU → screenshot or write down the **node** / **openclaw** process names you see.",
      "Terminal: run `lsof -i -P | grep LISTEN` (when gateway is running) and save output to `ports-$(date +%Y%m%d).txt`.",
      "Paste the prompt into your LLM; align its list with what you actually saw—delete fantasy ports.",
      "Store the file in a folder `~/openclaw-admin/` on the agent user only.",
    ],
    successCheck: "One text file lists real listening ports or honestly says “gateway not running yet.”",
  },
  {
    headline: "Network posture: firewall, LAN, Tailscale",
    scenario:
      "Home Wi‑Fi has TVs and guests; your gateway should not be the weakest device.",
    howToApply: [
      "Pick one default from the LLM answer (e.g. firewall on + Tailscale for remote admin) and implement only that first.",
    ],
    practicalSteps: [
      "System Settings → Network → Firewall → **On** (confirm you can still reach local gateway).",
      "Decide: **LAN-only** access vs **Tailscale** for remote fixes—write one sentence why.",
      "If using Tailscale: install only on the agent Mac + one admin device; log in with a **dedicated** Tailscale account if possible.",
      "Paste the prompt; add the LLM’s bullets to `preplan-07-network.md`.",
      "Test: from phone on cellular, can you reach the Mac’s admin path only if you intended Tailscale—otherwise stop and fix.",
    ],
    successCheck: "Firewall state is explicit; remote access matches your one-sentence policy.",
  },
  {
    headline: "iCloud vs isolated AI machine—common mistakes",
    scenario:
      "Universal Clipboard and shared Photos feel convenient until tokens and screenshots leak across boundaries.",
    howToApply: [
      "Use the LLM list as a “never do this” poster; check each against your agent user.",
    ],
    practicalSteps: [
      "On **daily** Mac: note your Apple ID email in one line (for reference only).",
      "On **agent** Mac: confirm Settings → Apple ID shows **no** login or a **different** test ID only.",
      "Read Apple’s short doc on Handoff in your own words; write two bullets: what syncs vs what does not across Apple IDs.",
      "Paste the prompt; copy the five mistakes into `preplan-08-icloud-mistakes.md`; bold the one you are most likely to do.",
      "Set a calendar reminder monthly: “Still not logged into personal iCloud on agent?”",
    ],
    successCheck: "You can name two concrete mistakes and how you avoided them on the agent Mac.",
  },
  {
    headline: "Naming Discord bots and gateways dev vs prod",
    scenario:
      "Accidentally pointing users at the dev bot wastes trust; names and tokens must be obvious.",
    howToApply: [
      "Adopt a pattern like `mybot-dev` vs `mybot` and mirror gateway config names.",
    ],
    practicalSteps: [
      "In Discord Developer Portal, list your **Application** names; rename test apps to include `-dev` or `-staging` if allowed.",
      "Write a three-line convention: `bot display name`, `application name`, `config profile name` on disk.",
      "Paste the prompt; merge LLM ideas into `preplan-09-naming.md`.",
      "Create empty config stubs or folders: `openclaw.dev.json` vs `openclaw.prod.json` (no secrets inside—placeholders only).",
      "Post the naming rule on paper next to the machine until muscle memory sticks.",
    ],
    successCheck: "A stranger could tell which token is dev vs prod from names alone.",
  },
  {
    headline: "Universal Clipboard, Handoff, and the isolated Mac",
    scenario:
      "You expect copy-paste to work between Macs; isolated Apple IDs break that—plan bridges instead.",
    howToApply: [
      "Use the LLM summary to explain to future-you why Notes or SMB replaced Universal Clipboard.",
    ],
    practicalSteps: [
      "On **daily** Mac: copy a test string; on **agent** Mac: try paste—confirm it does **not** appear (expected if IDs differ).",
      "Choose one bridge: **shared SMB folder**, **Tailscale drop**, or **shared note** with a secondary ID—pick one.",
      "Create `clipboard-bridge.txt` in that bridge location; write one test line from daily → agent.",
      "Paste the prompt; save the LLM’s explanation into `preplan-10-handoff-explained.md`.",
      "Delete any test secrets from the bridge file; keep only non-sensitive labels.",
    ],
    successCheck: "You have one working boring path for text between machines that is not Universal Clipboard.",
  },
];

const TELEGRAM_EXECUTION_ADVANCED: CaseStudyItem[] = [
  {
    headline: "Structured logging for Telegram updates",
    scenario:
      "Your OpenClaw gateway receives hundreds of Telegram updates per day. When a user says “the bot ignored me,” you have no way to correlate their chat with gateway lines.",
    howToApply: [
      "Paste the prompt into your LLM and ask it to propose a JSON log line schema (e.g. update_id, chat_id hash, message_id, stage: received|model|sent).",
      "Implement only fields you can populate from grammY or your gateway—avoid logging message body in prod if policy forbids it.",
      "Replay one real (redacted) update through your schema and grep logs for that correlation id.",
    ],
    practicalSteps: [
      "Open your gateway log file or `openclaw logs` output; copy **one** redacted line that shows a message got through.",
      "In a scratch file, write three fields you wish that line had (e.g. update_id, stage, latency_ms).",
      "Paste the prompt into your LLM; paste the LLM’s JSON schema proposal into `logging-schema-v1.md`.",
      "Pick **one** field you can add this week; grep after deploy to confirm it appears.",
      "If you cannot log bodies, write “no PII” in the schema doc and stick to it.",
    ],
    successCheck: "You can answer “what happened to message X?” in under two minutes using logs only.",
  },
  {
    headline: "Backpressure when the model is slower than Telegram",
    scenario:
      "Users send bursts in a group; the model takes 15s per reply while Telegram allows steady outbound. The queue grows and RAM spikes.",
    howToApply: [
      "Use the prompt to sketch a queue + drop/merge policy (e.g. cap depth, coalesce edits, defer non-mention messages).",
      "Compare Telegram send rate limits from official docs with your measured model p95 latency.",
      "Define user-visible behavior when overloaded (short “thinking…” vs silence).",
    ],
    practicalSteps: [
      "Time **one** typical reply: note model seconds vs Telegram send seconds in a spreadsheet.",
      "Set a **max queue length** on paper (e.g. 5); decide what happens at 6 (drop oldest vs merge).",
      "Paste the prompt; save the LLM’s algorithm sketch to `queue-policy.md`.",
      "Simulate with a script or manual spam in a **private** chat—watch RAM in Activity Monitor.",
      "Adjust one knob (e.g. max concurrency) and re-measure once.",
    ],
    successCheck: "Gateway stays under a memory ceiling during a 50-message spike test.",
  },
  {
    headline: "After a Telegram or gateway outage",
    scenario:
      "Cloudflare hiccup or your host rebooted; users saw duplicate replies or missed answers.",
    howToApply: [
      "Fill the post-mortem template the LLM outputs: timeline, blast radius, whether pairing broke, preventive item (e.g. healthcheck restart).",
      "Link to one log excerpt (redacted) and one config change ticket.",
      "Share the summary only with trusted admins in your allowlist group.",
    ],
    practicalSteps: [
      "Write a timeline with **three** timestamps: first error, user report, recovery.",
      "List who was affected (DM vs which group)—no usernames in the doc if policy says no.",
      "Paste the prompt; fill the post-mortem template in `incidents/YYYY-MM-DD.md`.",
      "Add **one** preventive action with an owner and date.",
      "Send a one-line “all clear” in admin chat if appropriate.",
    ],
    successCheck: "A one-page doc exists that would help you fix faster next time.",
  },
  {
    headline: "Weeks of uptime on a MacBook Pro gateway",
    scenario:
      "Activity Monitor shows Node creeping from 200MB to 1.5GB over 14 days without restarts.",
    howToApply: [
      "Ask the LLM for a checklist: heap snapshots, leak suspects in long-lived listeners, Telegram connection reuse.",
      "Schedule a controlled weekly gateway restart vs code fix based on severity.",
      "Track RSS after fix through one full week.",
    ],
    practicalSteps: [
      "Screenshot Activity Monitor **Memory** for Node today; label the date.",
      "Restart **only** the gateway process once; screenshot again after 1h.",
      "Paste the prompt; list top three leak suspects from the LLM in `memory-watch.md`.",
      "Set weekly calendar: 5‑minute check of RSS.",
      "If growth continues, open a ticket with two screenshots attached.",
    ],
    successCheck: "Memory curve is flat or slowly bounded after the change.",
  },
  {
    headline: "Ollama on the same Mac as the Telegram gateway",
    scenario:
      "You want local Llama for privacy but worry about port 11434 vs gateway port and GPU contention.",
    howToApply: [
      "Use the prompt to list interactions: CPU vs GPU, concurrent inference + Telegram I/O.",
      "Decide sequential vs parallel policy (only one heavy job at a time).",
      "Set expectations in Telegram when the model is cold-starting.",
    ],
    practicalSteps: [
      "Run `lsof -i :11434` when Ollama is idle vs busy; note PIDs.",
      "Load one Telegram message end-to-end while watching **GPU** in Activity Monitor (if applicable).",
      "Paste the prompt; write **one** rule: e.g. “only one inference at a time.”",
      "Add a user-visible “warming up” message in config or prompts if cold starts exceed 5s.",
      "Document ports in `ports-ollama.txt`.",
    ],
    successCheck: "No mystery freezes; users see explicit “model loading” when applicable.",
  },
  {
    headline: "Tool use from Telegram (risky operations)",
    scenario:
      "You want the agent to run shell or web fetch when asked in DM—but not in public groups.",
    howToApply: [
      "Have the LLM propose flags: chat_allowlist, require_mention, per-user role, dry-run mode.",
      "Map each flag to OpenClaw config concepts you actually have.",
      "Test in a private group with two accounts: one allowed, one blocked.",
    ],
    practicalSteps: [
      "List tools: shell, web, file write—mark each **high risk**.",
      "For each risk, write “allowed only in: DM / private group / never.”",
      "Paste the prompt; map flags to real config keys in `tool-policy.md` (placeholders only).",
      "Test from a **second** Telegram account: try a forbidden command in a group—expect refusal.",
      "Log the refusal line once (redacted).",
    ],
    successCheck: "Dangerous tools cannot trigger from an unapproved chat type.",
  },
  {
    headline: "Model healthy, Telegram API errors",
    scenario:
      "Local model responds, but sendMessage fails with 429 or network errors; users think the bot is “dumb.”",
    howToApply: [
      "Use the prompt to draft user-facing strings (rate limit vs try again) and internal retry backoff.",
      "Log API error class without leaking tokens.",
      "Define when to stop retrying and notify the user once.",
    ],
    practicalSteps: [
      "Reproduce **one** failed send; capture error code from logs (not token).",
      "Write two user strings: “Telegram rate limited, try in 1m” vs “Network blip, retrying.”",
      "Paste the prompt; add retry/backoff numbers from the LLM to `telegram-errors.md`.",
      "Implement max **three** retries with jitter; log each attempt count.",
      "Send yourself a test after deploy.",
    ],
    successCheck: "Users get one clear status message instead of duplicate or silent failure.",
  },
  {
    headline: "User asks to delete their data",
    scenario:
      "Someone in your allowlist requests export or deletion under your privacy policy.",
    howToApply: [
      "Ask the LLM what state you must track: chat id, user id, message ids stored, memory keys.",
      "Map to what OpenClaw actually stores on disk.",
      "Write a minimal procedure: stop ingest → delete → confirm.",
    ],
    practicalSteps: [
      "List folders under `~/.openclaw` (or your path) that might hold chats—**no** copying contents to chat.",
      "Write a **delete** order: stop gateway → delete files X → start gateway.",
      "Paste the prompt; align LLM compliance bullets with what you actually store.",
      "Dry-run on a **test** user only.",
      "Keep a one-page `privacy-procedure.md` offline.",
    ],
    successCheck: "You can execute or honestly say “we don’t retain X” with evidence.",
  },
  {
    headline: "Two Telegram bots (blue/green)",
    scenario:
      "You need to test a new gateway build without taking down production @myprivateclawbot.",
    howToApply: [
      "Use the prompt to outline token B, separate pairing, DNS or name clarity for testers only.",
      "Plan cutover: swap token in config vs redirect users—pick one.",
      "Rollback: keep previous container image and token ready.",
    ],
    practicalSteps: [
      "Create **Bot B** in BotFather; never paste token into web forms—only local config.",
      "Pair Bot B in a **private** chat with only you.",
      "Paste the prompt; write `cutover.md` with exact order of config swaps.",
      "Run parallel for one day: prod traffic unchanged.",
      "Rollback drill: switch config back in under 5 minutes once.",
    ],
    successCheck: "Testers use bot B; production users never saw broken middle states.",
  },
  {
    headline: "Gateway CPU pegged on macOS",
    scenario:
      "Fans spin up; Telegram still works but latency jumps. You need profiling discipline, not random kills.",
    howToApply: [
      "Ask the LLM for ordered steps: Sample, Instruments, node --inspect vs Activity Monitor.",
      "Correlate CPU spike with Telegram webhook batch or model batch.",
      "Document one command you run first every time (e.g. sample pid 30s).",
    ],
    practicalSteps: [
      "Activity Monitor → sort CPU → note **PID** of gateway when bad.",
      "Terminal: `sample <PID> 10 -file /tmp/gateway-sample.txt` (adjust path).",
      "Paste the prompt; attach LLM’s interpretation checklist to the sample file name in `cpu-incidents/`.",
      "Open **Console** for errors the same minute.",
      "Pick **one** change (config or version pin); schedule retry.",
    ],
    successCheck: "You have a short runbook link pasted in your admin notes.",
  },
];

function genericCaseStudy(
  channelLabel: string,
  stageLabel: string,
  audienceLabel: string,
  index: number,
  promptPreview: string,
): CaseStudyItem {
  const preview = promptPreview.length > 120 ? `${promptPreview.slice(0, 117)}…` : promptPreview;
  return {
    headline: `Prompt ${index + 1} · ${channelLabel} · ${stageLabel} · ${audienceLabel}`,
    scenario: `You are working through the **${stageLabel}** phase on **${channelLabel}** at **${audienceLabel}** level. This prompt targets a specific gap in your runbook.`,
    howToApply: [
      `Copy prompt **#${index + 1}** from the playbook and paste it into a trusted LLM on your dedicated Mac.`,
      `Answer its questions in your own words, then map the result to your real OpenClaw config (no secrets in the chat).`,
      `Save the outcome as one note in your vault or shared folder so the next session starts from facts, not memory.`,
    ],
    practicalSteps: [
      `Create a note titled \`${channelLabel}-${stageLabel}-prompt-${index + 1}.md\` on the agent Mac only.`,
      `Copy prompt **#${index + 1}** from the playbook into the top of that note.`,
      `Paste the same prompt into your LLM; write the answer under it in your own words (no tokens).`,
      `Circle **one** concrete action you can finish in under 20 minutes (open a settings panel, create a folder, run a non-destructive command).`,
      `Do that action once; add a single line to the note: what you observed.`,
      `Re-read the prompt; check off whether your note answers it—if not, schedule a second session.`,
    ],
    successCheck: `You have a concrete next action tied to: “${preview}”`,
  };
}

/** Case studies aligned 1:1 with `getPrompts` rows (same order, length 10). */
export function getCaseStudies(
  channel: ChannelId,
  stage: LifecycleStage,
  audience: AudienceLevel,
  prompts: string[],
  channelLabel: string,
): CaseStudyItem[] {
  if (
    channel === "discord" &&
    stage === "preplan" &&
    audience === "basic" &&
    DISCORD_PREPLAN_BASIC.length === prompts.length
  ) {
    return DISCORD_PREPLAN_BASIC;
  }

  if (
    channel === "telegram" &&
    stage === "execution" &&
    audience === "advanced" &&
    TELEGRAM_EXECUTION_ADVANCED.length === prompts.length
  ) {
    return TELEGRAM_EXECUTION_ADVANCED;
  }

  const stageLabel =
    stage === "preplan"
      ? "Preplan"
      : stage === "plan"
        ? "Plan"
        : stage === "execution"
          ? "Execution"
          : stage === "postplan"
            ? "Post-plan"
            : "Other";
  const audienceLabel =
    audience === "basic" ? "Basic" : audience === "intermediate" ? "Intermediate" : "Advanced";

  return prompts.map((p, i) => genericCaseStudy(channelLabel, stageLabel, audienceLabel, i, p));
}
