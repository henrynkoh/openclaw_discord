import type { AudienceLevel, ChannelId, LifecycleStage } from "@/lib/types";
import { CHANNELS } from "./channels";

function label(id: ChannelId): string {
  return CHANNELS.find((c) => c.id === id)?.label ?? id;
}

/** Ten copy-pastable prompts per channel × stage × audience tier. */
export function getPrompts(
  channel: ChannelId,
  stage: LifecycleStage,
  audience: AudienceLevel,
): string[] {
  const ch = label(channel);

  const preplan: Record<AudienceLevel, string[]> = {
    basic: [
      `Explain in 5 bullets why I should use a dedicated MacBook Pro only for OpenClaw and ${ch}, not my daily driver.`,
      `List what to buy or verify on the Mac before installing OpenClaw (RAM, disk, power, cooling) for 24/7 ${ch} use.`,
      `Draft a simple "rules of the road" for this machine: no personal Apple ID, no personal browsing — only agents and ${ch}.`,
      `What accounts should stay OFF this Mac to reduce blast radius if ${ch} or OpenClaw is compromised?`,
      `Give a checklist for creating a separate local macOS user for OpenClaw with minimal permissions.`,
      `How do I document which ports and processes OpenClaw + ${ch} gateway use on macOS?`,
      `What is a safe default network posture (firewall, LAN-only, Tailscale) for a home OpenClaw Mac running ${ch}?`,
      `List 5 mistakes people make when mixing personal iCloud and an isolated AI machine — and how to avoid them.`,
      `Propose a naming scheme for bots and gateways so I can tell ${ch} dev vs prod apart.`,
      `Summarize how Universal Clipboard and Handoff interact with multiple Apple IDs — and why my isolated Mac is different.`,
    ],
    intermediate: [
      `Produce a preflight matrix: threat model, data classes, acceptable channels (${ch}), and rollback for OpenClaw on macOS.`,
      `Write launchd plist considerations for keeping OpenClaw gateway alive across sleep/reboot on a MacBook Pro.`,
      `Enumerate observability I should plan before go-live: logs, metrics, disk rotation for ${ch} + OpenClaw.`,
      `Draft a credential inventory template (token names, rotation dates, storage location) for ${ch} integration.`,
      `Explain when to use environment variable refs vs plain config entries for ${ch} tokens in OpenClaw.`,
      `What macOS FileVault and separate user accounts buy me for a 24/7 agent host using ${ch}.`,
      `Compare SMB file share vs Tailscale for moving prompts between my main Mac and OpenClaw Mac — tradeoffs.`,
      `List Apple Notes / iCloud sharing pitfalls for cross–Apple-ID machines and safer alternatives.`,
      `Give a network segmentation sketch: IoT VLAN vs trusted LAN vs isolated OpenClaw host for ${ch}.`,
      `What runbooks should exist before day one: gateway restart, token rotation, ${ch} outage, model swap.`,
    ],
    advanced: [
      `Produce a STRIDE-style threat model for OpenClaw + ${ch} on a dedicated Mac: assets, trust boundaries, mitigations.`,
      `Define a key rotation SOP including Discord/Telegram token revocation, config reload, and verification steps.`,
      `Draft policy text for "no personal credentials on agent host" suitable for a solo founder or small team.`,
      `Analyze residual risks of running grammY/Discord.js gateways on the same host as local models (Ollama) — isolation options.`,
      `Specify audit log fields I should retain per ${ch} message for incident response without storing PII unnecessarily.`,
      `Design a break-glass procedure if ${ch} account is reported or rate-limited: disable channel, notify, preserve logs.`,
      `Compare webhook vs long-polling for ${ch} on residential networks with dynamic DNS / CGNAT — decision criteria.`,
      `Enumerate macOS hardening steps relevant to OpenClaw (SIP, firewall, remote login off) with rationale.`,
      `Model insider-risk: shared home folder vs separate user — what still leaks between sessions on macOS?`,
      `Write acceptance tests for pairing flows: first DM, group allowlist, mention-gated replies for ${ch}.`,
    ],
  };

  const plan: Record<AudienceLevel, string[]> = {
    basic: [
      `Step-by-step: create/configure ${ch} credentials I will paste into OpenClaw (no secrets in chat — describe placeholders only).`,
      `Explain pairing / allowlist in simple terms for ${ch}: why I must approve my own account.`,
      `What to put in OpenClaw config for ${ch}: enabled flag, token location, and where to restart gateway.`,
      `How do I choose between DMs-only vs groups for ${ch} when I'm just starting?`,
      `List slash command or mention conventions that work well with ${ch} bots and OpenClaw.`,
      `What permissions/scopes does ${ch} typically need for read messages + reply + embed/link previews?`,
      `Draft a minimal "channel map": which ${ch} chats map to which agent behaviors.`,
      `How do I test safely in a private server/chat before exposing ${ch} bot more widely?`,
      `What backup of ~/.openclaw or config files should I make before first edit?`,
      `Give a one-page "if something breaks" checklist for ${ch} connectivity (status, logs, restart).`,
    ],
    intermediate: [
      `Produce an OpenClaw config outline for ${ch}: dmPolicy, groupPolicy/guild policy, requireMention patterns.`,
      `Explain Telegram setMyCommands scopes vs Discord slash commands registration — what to plan for ${ch}.`,
      `Write a migration checklist from test bot to prod bot for ${ch} without duplicating pairing chaos.`,
      `How to store tokens: Keychain vs env vars vs secret manager — pick for solo Mac setup with ${ch}.`,
      `Define allowlists: Telegram chat IDs, Discord guild/channel IDs — how to discover them with OpenClaw CLI hints.`,
      `Plan rate limits and flooding: what gateway settings or BotFather/Discord limits matter for ${ch}.`,
      `Describe webhook URL setup if I expose OpenClaw through reverse proxy — TLS and token verification for ${ch}.`,
      `Map observability: which log lines confirm ${ch} messages hit the model and return.`,
      `Draft a "red team" test plan: unauthorized user, wrong chat, mention-required path for ${ch}.`,
      `Enumerate differences between ${ch} bot running 24/7 vs on-demand — battery, thermal, and reliability on MacBook Pro.`,
    ],
    advanced: [
      `Design multi-tenant boundaries if multiple humans share one OpenClaw host — per-${ch} identity separation.`,
      `Specify HMAC or signature validation for inbound webhooks from ${ch} providers where applicable.`,
      `Plan zero-downtime config reload: what OpenClaw supports vs full gateway restart for ${ch} changes.`,
      `Write a canary deployment strategy: shadow traffic, compare replies, rollback for ${ch}.`,
      `Model abuse cases: token leak on GitHub, malicious group invite — detection and revocation for ${ch}.`,
      `Define SLIs for gateway: message lag, error rate, reconnect count — per ${ch} channel.`,
      `Compare process isolation: separate macOS users vs VMs vs containers for OpenClaw + ${ch} (practical on Mac).`,
      `Draft legal/privacy notes for logging ${ch} content on a personal server — retention and minimization.`,
      `Explain idempotency concerns for ${ch} updates if gateway retries — dedupe keys.`,
      `Produce a chaos test list: network flap, DNS failure, model OOM, disk full — expected ${ch} behavior.`,
    ],
  };

  const execution: Record<AudienceLevel, string[]> = {
    basic: [
      `I'm about to start the OpenClaw gateway for ${ch}. Give me a concise command sequence and what "healthy" looks like.`,
      `First message workflow: what should I send in ${ch} to trigger pairing and confirm the bot sees me?`,
      `How do I tail logs on macOS while testing ${ch} (terminal commands generic, no secrets)?`,
      `What does a good test message look like vs a bad one (too long, too many mentions) for ${ch}?`,
      `How to verify the bot only responds where allowed (DM vs group) for ${ch}?`,
      `Quick fixes: bot online but silent — ordered checklist for ${ch} + OpenClaw.`,
      `How to restart only the gateway vs whole Mac when ${ch} misbehaves?`,
      `Explain "require mention" testing in a busy group for ${ch}.`,
      `What should I watch in Activity Monitor during a heavy ${ch} session on MacBook Pro?`,
      `End-of-day shutdown vs clamshell 24/7 — guidance for OpenClaw + ${ch} on a laptop.`,
    ],
    intermediate: [
      `Debug script outline: from ${ch} message received → model invoked → reply sent; where each step logs in OpenClaw.`,
      `How to use openclaw status --channels and related commands to validate ${ch} after config edits.`,
      `Tune timeouts/retries for slow local models + ${ch} user expectations.`,
      `Procedure to rotate ${ch} token without losing pairing mappings (high level).`,
      `Load test cautiously: message bursts, attachments, long threads — ${ch} caveats.`,
      `If gateway binds loopback only, how do I safely expose to LAN for phone ${ch} client testing?`,
      `Harmonize macOS sleep settings with 24/7 gateway — pmset recommendations (conceptual).`,
      `Mitigate duplicate replies: thread IDs, reply chains, ${ch}-specific quirks.`,
      `Operational checklist before travel: VPN, dynamic IP, ${ch} webhook reachability.`,
      `Capture minimal repro for bugs: timestamps, chat type, anonymized IDs for ${ch} issues.`,
    ],
    advanced: [
      `Instrument gateway with structured logs; propose JSON fields for ${ch} provider message IDs.`,
      `Design backpressure: model queue depth vs ${ch} outbound rate limits — algorithm sketch.`,
      `Post-mortem template: ${ch} outage, user impact, root cause, preventive config change.`,
      `Analyze memory growth during long uptimes on macOS for Node-based gateways + ${ch} clients.`,
      `Evaluate running Ollama on same machine: port contention, GPU vs CPU fallback interactions with ${ch} traffic.`,
      `Propose feature flags for risky behaviors: tool execution from ${ch}, web fetch, shell — gating strategy.`,
      `Simulate partial failure: model up, ${ch} API down — user messaging and recovery.`,
      `Compliance: export/delete requests — what state must OpenClaw/${ch} integration track?`,
      `Blue/green config: two bots for ${ch} — traffic switch plan.`,
      `Kernel of a runbook: "high CPU on gateway" — profiling steps on macOS for ${ch} workloads.`,
    ],
  };

  const postplan: Record<AudienceLevel, string[]> = {
    basic: [
      `Weekly health checklist for OpenClaw + ${ch}: updates, disk space, bot still paired.`,
      `How to read ${ch} provider status pages or API incident feeds relevant to my bot.`,
      `Simple backup strategy for OpenClaw config and skills on the dedicated Mac.`,
      `When should I reboot the MacBook Pro vs restart service for ${ch} issues?`,
      `How to document what changed each week (one-note changelog) for ${ch} setup.`,
      `User hygiene: separating test chats vs prod chats for ${ch} bot.`,
      `Recognizing token expiry symptoms vs network issues for ${ch}.`,
      `Privacy check: which chats/logs I should never paste into public forums — ${ch} edition.`,
      `Plan for macOS upgrades: test OpenClaw + ${ch} on beta or wait.`,
      `Celebrate milestones: what "good enough" automation looks like with ${ch} + OpenClaw.`,
    ],
    intermediate: [
      `Define backup/restore drill: wipe config, restore, re-pair ${ch} — quarterly exercise.`,
      `Log rotation and disk alerts for gateway logs on macOS (logrotate / newsyslog concepts).`,
      `Metrics dashboard outline: messages/day, errors, model latency for ${ch}.`,
      `Token rotation calendar: Telegram bot token, Discord secret — reminders and verification.`,
      `Dependency updates: Node, OpenClaw, OS — risk-ranked schedule.`,
      `Incident response: ${ch} account flagged — lockdown steps.`,
      `Cost review: electricity 24/7 MacBook Pro vs desktop — rough model.`,
      `Skills versioning: track changes to agent skills alongside ${ch} behavior changes.`,
      `User feedback loop: how to capture bad replies from ${ch} and tune prompts safely.`,
      `Disaster recovery: dead Mac — restore OpenClaw on new hardware with ${ch} tokens from vault.`,
    ],
    advanced: [
      `Design retention policy for message logs per jurisdiction — minimization for ${ch} integrations.`,
      `Automate compliance exports: conversation slices with redaction pipeline for ${ch}.`,
      `Run periodic tabletop: stolen laptop with FileVault off vs on — ${ch} token exposure.`,
      `Chaos: restore from backup and verify ${ch} pairing state — acceptance criteria.`,
      `SLO/SLA wording for personal infra: honest limits for ${ch} + local models.`,
      `Post-quantum or long-term archival — what not to store from ${ch} bridges.`,
      `Multi-region thought experiment: ${ch} bot in one jurisdiction, model elsewhere — latency/privacy.`,
      `Advanced monitoring: trace IDs across gateway ↔ model ↔ ${ch} send API.`,
      `Capacity planning: concurrent users/groups for ${ch} on one Mac host — rough formula.`,
      `Continuous improvement: A/B prompt templates per ${ch} channel with safe rollout.`,
    ],
  };

  const other: Record<AudienceLevel, string[]> = {
    basic: [
      `Explain why Universal Clipboard does not bridge my isolated OpenClaw Mac and my main Mac — and 3 safe workarounds including ${ch}.`,
      `How to use a shared SMB folder or Tailscale drop folder to move prompts to the OpenClaw Mac for ${ch} testing.`,
      `Fix typo: correct smb://hostname format for Finder Connect to Server — one-liner reminder.`,
      `Using Telegram "Saved Messages" or ${ch} DM to self as a crude clipboard bridge — pros/cons.`,
      `Why not to sign personal Apple ID into the dedicated OpenClaw Mac — short explanation.`,
      `Create a clipboard.txt ritual between two Macs — step list.`,
      `Simple network test: ping, port reachability for gateway — no secrets.`,
      `When to prefer wired Ethernet for 24/7 ${ch} gateway on MacBook Pro.`,
      `Basic thermal hygiene: elevate laptop, avoid soft surfaces during long ${ch} runs.`,
      `Where to find official OpenClaw docs snippets for ${ch} without leaking tokens.`,
    ],
    intermediate: [
      `Compare Tailscale vs reverse SSH vs SMB for accessing OpenClaw Mac — threat sketch + ${ch} testing flows.`,
      `Hammerspoon / Keyboard Maestro ideas: push text file to shared folder on save — outline only.`,
      `Secondary Apple ID strategy for Notes sharing vs pure offline share — tradeoffs.`,
      `File Sharing permissions: Everyone read-only vs per-user RW — recommended defaults for OpenClaw Mac.`,
      `Diagnose smb:// connection failures: name resolution vs IP — systematic steps.`,
      `Using separate Git remotes for skills repos — avoid tokens on agent host; ${ch} relevance.`,
      `Sanitize screenshots before sharing (blur ${ch} bot tokens, QR codes).`,
      `VPN split tunnel considerations for ${ch} gateways reaching cloud APIs.`,
      `Document hostname stability (.lan mDNS) vs IP for SMB bookmarks.`,
      `Battery health management for always-plugged MacBook Pro running ${ch} gateway.`,
    ],
    advanced: [
      `Design a zero-trust style access path to admin the OpenClaw Mac remotely without exposing SMB broadly — ${ch} ops.`,
      `Evaluate Qubes / Asahi / VM tradeoffs for isolating ${ch} traffic on Apple Silicon — feasibility notes.`,
      `Build a local secrets vault flow: 1Password CLI vs age-encrypted files — integration with OpenClaw env refs.`,
      `Network IDS thoughts for LAN with IoT and an agent host — where ${ch} traffic fits.`,
      `Formalize data classification flowing through ${ch}: public, internal, secret — handling rules.`,
      `Automate smb mount on login for main Mac → OpenClaw share — security caveats.`,
      `Forensics: if ${ch} token leaked, what logs to preserve before revocation.`,
      `Research signal/WhatsApp policy constraints for bots — legal summary non-lawyer.`,
      `Advanced clipboard: Syncthing encrypted folder between users — architecture sketch.`,
      `Threat hunt: unexpected outbound connections from gateway process — macOS tools overview.`,
    ],
  };

  const byStage: Record<LifecycleStage, Record<AudienceLevel, string[]>> = {
    preplan,
    plan,
    execution,
    postplan,
    other,
  };

  let prompts = byStage[stage][audience];
  if (audience === "basic") {
    prompts = prompts.map((p) =>
      p.startsWith("Explain") || p.startsWith("Summarize")
        ? p
        : `In simple terms: ${p}`,
    );
  }

  return prompts;
}
