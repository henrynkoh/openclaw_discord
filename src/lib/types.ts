export type LifecycleStage = "preplan" | "plan" | "execution" | "postplan" | "other";

export type AudienceLevel = "basic" | "intermediate" | "advanced";

export type ChannelId =
  | "telegram"
  | "discord"
  | "slack"
  | "matrix"
  | "signal"
  | "whatsapp"
  | "imessage"
  | "webchat";

export interface Skill {
  id: string;
  n: number;
  title: string;
  stage: LifecycleStage;
  subcategory: string;
  audience: AudienceLevel[];
  summary: string;
  steps: string[];
  checklist?: string[];
  references?: { label: string; href: string }[];
}

export interface ChannelMeta {
  id: ChannelId;
  label: string;
  short: string;
  docHint: string;
}
