import type { ChannelMeta } from "@/lib/types";

export const CHANNELS: ChannelMeta[] = [
  {
    id: "telegram",
    label: "Telegram",
    short: "Bot API, @BotFather, long poll / webhook, scopes",
    docHint: "docs.openclaw.ai — channels / telegram",
  },
  {
    id: "discord",
    label: "Discord",
    short: "Developer Portal, intents, guilds, mentions",
    docHint: "docs.openclaw.ai — channels / discord",
  },
  {
    id: "slack",
    label: "Slack",
    short: "App manifest, bot token, channels, OAuth",
    docHint: "Slack API + OpenClaw channel docs",
  },
  {
    id: "matrix",
    label: "Matrix",
    short: "Homeserver, appservice, E2EE considerations",
    docHint: "Matrix bridge patterns for self-hosted bots",
  },
  {
    id: "signal",
    label: "Signal",
    short: "Linked device / bridge constraints, privacy",
    docHint: "Use supported bridges only; verify trust model",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    short: "Business API vs unofficial — policy & risk",
    docHint: "Prefer official APIs; isolate credentials",
  },
  {
    id: "imessage",
    label: "iMessage",
    short: "macOS-only integrations, Apple ecosystem limits",
    docHint: "Local automation + privacy boundaries",
  },
  {
    id: "webchat",
    label: "Web / local UI",
    short: "Browser UI, localhost gateway, same-machine chat",
    docHint: "Loopback binding, TLS for LAN access",
  },
];
