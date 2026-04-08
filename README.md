# OpenClaw ↔ SNS Playbook

A **Next.js** web app that bundles **100 lifecycle skills**, **channel-specific copy-pastable prompts** (Telegram, Discord, Slack, Matrix, and more), and audience tiers (**Basic · Intermediate · Advanced**) for running **OpenClaw-style agents** on a **dedicated MacBook Pro** without mixing personal credentials with your agent workspace.

## Documentation

| Doc | Purpose |
|-----|---------|
| [Docs index](docs/README.md) | Table of contents for everything below |
| [Quickstart](docs/QUICKSTART.md) | Install, run locally, and first actions in under 10 minutes |
| [Tutorial](docs/TUTORIAL.md) | Guided walkthrough of the UI and workflows |
| [Manual](docs/MANUAL.md) | Full reference: data model, scripts, deployment, troubleshooting |
| [Marketing copy](docs/marketing/README.md) | Ready-to-paste ads and posts (Facebook, Instagram, Threads, blogs, newsletter, email) |

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (ships with Node)

## Commands

```bash
npm install    # once
npm run dev    # development — http://localhost:3000
npm run build  # production build
npm run start  # run production build
npm run lint   # ESLint
```

## Routes

| Path | What |
|------|------|
| **`/`** | Visual **landing page**: section nav, features, channel tiles, prompt preview, docs links, floating **GitHub** button |
| **`/playbook`** | Full **interactive playbook** (100 skills sidebar, channel/stage prompts, copy buttons) |

Optional: set **`NEXT_PUBLIC_GITHUB_URL`** to your fork’s repo URL so the landing page docs links and GitHub FAB point to the right place.

## Regenerating the 100-skill catalog

Skill titles and structure are generated from `scripts/generate-skills.mjs`. After editing that script:

```bash
node scripts/generate-skills.mjs
```

This overwrites `src/data/skillCatalog.ts`.

## Project layout (short)

- `src/app/` — App Router: `/` landing, `/playbook` tool
- `src/components/landing/` — Landing page, GitHub FAB
- `src/components/guide/` — Interactive playbook UI (sidebar, prompts, skill detail)
- `src/data/skillCatalog.ts` — 100 skills
- `src/data/prompts.ts` — `getPrompts(channel, stage, audience)`
- `src/data/caseStudies.ts` — `getCaseStudies(...)` (1:1 with prompts; exemplar narratives for Telegram · Execution · Advanced)
- `src/components/caseStudy/CaseStudyCards.tsx` — expandable case study cards
- `src/data/channels.ts` — SNS metadata

## Security note

This app is an **educational playbook**. Do not paste real **bot tokens**, **API keys**, or **pairing codes** into public forums. Keep secrets in environment variables or a vault on the dedicated Mac only.

## License

Private / use as you like within your team unless you add a separate license file.
