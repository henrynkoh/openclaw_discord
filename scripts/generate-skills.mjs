import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const stages = ["preplan", "plan", "execution", "postplan", "other"];
const subs = {
  preplan: ["Hardware & power", "Isolation & accounts", "Network & access", "Risk & data class", "Physical & environment"],
  plan: ["Channels & routing", "Credentials & secrets", "Pairing & allowlists", "Commands & scopes", "Config & migration"],
  execution: ["Gateway & runtime", "Telegram patterns", "Discord patterns", "Cross-channel ops", "Model & tools"],
  postplan: ["Monitoring & logs", "Backups & DR", "Rotation & updates", "Cost & capacity", "Improvement loop"],
  other: ["macOS bridges", "Clipboard & files", "Troubleshooting", "Advanced security", "Ecosystem & policy"],
};

const titles = [
  // preplan (20)
  "Reserve a MacBook Pro solely for OpenClaw and agent workloads",
  "Decide Apple ID strategy: none, secondary, or isolated iCloud",
  "Set FileVault, firmware password, and auto-login policy for headless use",
  "Choose clamshell vs open lid for 24/7 thermals and display life",
  "Plan UPS or outlet strategy for unattended uptime",
  "Segment home LAN: IoT vs trusted devices vs agent host",
  "Define data you will never store on the agent Mac",
  "Create separate macOS user with least privilege for OpenClaw",
  "Document hardware inventory and serial for recovery",
  "Establish baseline Activity Monitor metrics under idle gateway load",
  "Threat model: stolen laptop, evil maid, network adversary",
  "Decide Tailscale vs VPN vs plain LAN for remote admin",
  "Choose static DHCP or reserved IP for stable SMB/Tailscale",
  "Plan energy cost and carbon note for 24/7 power draw",
  "Set expectations with household: noise, heat, desk space",
  "Pre-install Xcode CLT / Homebrew policy (if needed)",
  "Disk strategy: APFS volumes for models vs logs vs config",
  "RAM headroom for local models alongside Node gateway",
  "Cooling: stand, room airflow, dust schedule",
  "Written policy: no personal browsing or mail on agent Mac",
  // plan (20)
  "Pick primary chat surfaces: Telegram, Discord, Slack, Matrix, etc.",
  "Map each SNS to purpose: alerts vs deep work vs automation",
  "Bot naming convention: dev/stage/prod clarity",
  "Telegram: BotFather token lifecycle and command scopes plan",
  "Discord: application, intents, OAuth invite URL checklist",
  "Slack: workspace app, bot token, channel allowlist sketch",
  "Matrix: homeserver trust and bridge limitations review",
  "WhatsApp/Signal policy: official APIs vs bridge risk acceptance",
  "OpenClaw config layout: channels.* sections and env refs",
  "Pairing flows per channel: first DM, approval commands",
  "Group policies: allowlist vs open with mention gate",
  "Slash commands / native commands registration per provider",
  "Secrets storage: Keychain, env, or password manager CLI",
  "Backup ~/.openclaw before first destructive edit",
  "Migration from test bot to production bot without downtime",
  "Webhook vs polling choice given your network",
  "TLS termination if exposing services beyond localhost",
  "Logging redaction rules before enabling verbose logs",
  "Multi-human access: separate Telegram users or shared bot",
  "Runbook index: links to provider docs + OpenClaw docs",
  // execution (20)
  "Start gateway and verify openclaw status --channels",
  "Telegram: setMyCommands scopes for DM/group/admin",
  "Discord: Message Content Intent verification path",
  "Test DM pairing flow before inviting to groups",
  "Test group mention-gated replies to avoid spam",
  "Load test with long prompts and attachments cautiously",
  "Coexist Ollama/local model with gateway CPU/GPU limits",
  "Tail logs during first real conversation",
  "Verify restart path: gateway only vs full reboot",
  "Measure latency: SNS → model → reply",
  "Handle rate limits gracefully with user-visible messages",
  "Thread/reply metadata: avoid duplicate bot spam",
  "Mobile client testing from phone on same network",
  "Failover: model down → user-facing apology template",
  "Cron or launchd for periodic health checks",
  "Version pin Node/OpenClaw for reproducible runs",
  "Smoke test after macOS minor update",
  "Document ports: gateway, Ollama, metrics",
  "Secure clipboard when pasting tokens (clear after)",
  "Capture screenshots with tokens redacted for support",
  // postplan (20)
  "Weekly: disk free space and log size",
  "Monthly: rotate API tokens on calendar",
  "Quarterly: restore test from backup",
  "Review gateway error rate and top errors",
  "Track electricity usage if relevant",
  "Update skills/prompts with changelog",
  "Prune old logs per retention policy",
  "Check provider status pages after incidents",
  "Review allowlists as chats/servers change",
  "Skills git history: tag stable configs",
  "Incident notebook: dated anomalies and fixes",
  "User feedback: tag bad model outputs for tuning",
  "Model swap procedure: smaller model for outages",
  "Dependency upgrades with rollback plan",
  "Battery health check if laptop still on battery sometimes",
  "Network map refresh after router changes",
  "Verify backups are encrypted at rest",
  "Test pairing revocation and re-pair annually",
  "Celebrate stable uptime milestones",
  "Decide sunset criteria for experimental channels",
  // other (20)
  "SMB: correct smb://host syntax and favorites",
  "Finder Connect to Server: IP vs .lan hostname",
  "Separate user password for SMB vs iCloud password",
  "clipboard.txt ritual between two Macs",
  "Tailscale for cross-account file drop",
  "Telegram Saved Messages as quick bridge risks",
  "No Universal Clipboard across different Apple IDs — explain",
  "Secondary Apple ID for shared Notes — tradeoffs",
  "Sanitize support screenshots",
  "Reverse SSH tunnel risks and alternatives",
  "Syncthing encrypted folder outline",
  "Keyboard Maestro folder watch outline",
  "Firewall: allow only needed inbound",
  "Disable unnecessary macOS sharing services",
  "Screen sharing exposure audit",
  "Public Wi‑Fi: avoid admin tasks",
  "Legal: bot ToS for groups you join",
  "Content policy for automated replies",
  "Accessibility: readable bot responses",
  "Future: multi-host OpenClaw failover sketch",
];

if (titles.length !== 100) {
  throw new Error(`Expected 100 titles, got ${titles.length}`);
}

function audienceFor(i) {
  if (i % 3 === 0) return ["basic"];
  if (i % 3 === 1) return ["basic", "intermediate"];
  return ["basic", "intermediate", "advanced"];
}

function summaryFor(stage, title) {
  return `Apply “${title}” in the ${stage} phase for OpenClaw on a dedicated Mac with SNS bridges. Focus on practical, minimal-risk steps.`;
}

function stepsFor(stage, sub, title) {
  return [
    `Clarify the goal of “${title}” for your ${sub} context.`,
    `Align this step with your OpenClaw + SNS plan (${stage}).`,
    `Execute on the dedicated Mac; avoid mixing personal credentials.`,
    `Record what changed and where (config path, channel IDs).`,
    `Verify with a small test (DM, private channel, or health command).`,
  ];
}

const skills = titles.map((title, idx) => {
  const stage = stages[Math.floor(idx / 20)];
  const subList = subs[stage];
  const subcategory = subList[idx % subList.length];
  const n = idx + 1;
  return {
    id: `skill-${n}`,
    n,
    title,
    stage,
    subcategory,
    audience: audienceFor(idx),
    summary: summaryFor(stage, title),
    steps: stepsFor(stage, subcategory, title),
    checklist: [
      `${subcategory}: decision recorded`,
      "Config backed up or versioned",
      "Test performed in safe chat",
    ],
    references:
      stage === "plan" || title.toLowerCase().includes("telegram") || title.toLowerCase().includes("discord")
        ? [
            { label: "OpenClaw docs (channels)", href: "https://docs.openclaw.ai" },
            { label: "Telegram Bot API", href: "https://core.telegram.org/bots/api" },
            { label: "Discord Developer Portal", href: "https://discord.com/developers/applications" },
          ]
        : [{ label: "OpenClaw docs", href: "https://docs.openclaw.ai" }],
  };
});

const out = `/* eslint-disable max-len -- generated catalog */
import type { Skill } from "@/lib/types";

export const SKILLS: Skill[] = ${JSON.stringify(skills, null, 2)};
`;

const dest = path.join(__dirname, "..", "src", "data", "skillCatalog.ts");
fs.writeFileSync(dest, out);
console.log("Wrote", dest);
