import type { Metadata } from "next";
import { GuideShell } from "@/components/guide/GuideShell";

export const metadata: Metadata = {
  title: "Interactive playbook — OpenClaw ↔ SNS",
  description: "100 skills, channels, and copy-pastable prompts for dedicated Mac agent workspaces.",
};

export default function PlaybookPage() {
  return <GuideShell />;
}
