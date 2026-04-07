# Manual — OpenClaw ↔ SNS Playbook

Reference for operators and developers maintaining this Next.js application.

## 1. Purpose

The app is a **static, client-heavy guide**:

- **Skills** (`src/data/skillCatalog.ts`) — 100 items with lifecycle stage, subcategory, audience tags, steps, checklist, references.
- **Prompts** (`src/data/prompts.ts`) — function `getPrompts(channel, stage, audience)` returns **10** strings per combination.
- **Channels** (`src/data/channels.ts`) — labels and doc hints for each SNS surface.

No backend database; no user accounts.

## 2. Requirements

- **Node.js** 20+
- **npm** 10+

## 3. Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Optimized production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## 4. Environment

No `.env` is required for the default UI. If you deploy behind a custom domain, set hosting variables per your provider (e.g. Vercel).

## 5. Regenerating skills

1. Edit `scripts/generate-skills.mjs` (titles, stage mapping, references).
2. Run:

   ```bash
   node scripts/generate-skills.mjs
   ```

3. Commit the updated `src/data/skillCatalog.ts`.

The script writes **TypeScript** with `/* eslint-disable max-len */` for long lines.

## 6. Editing prompts

Edit **`src/data/prompts.ts`** only. The function **`getPrompts`** must:

- Accept `ChannelId`, `LifecycleStage`, `AudienceLevel`.
- Return an array of **length 10** (the UI assumes ten items).

`ChannelId` and stages are defined in `src/lib/types.ts`.

## 7. Architecture

| Path | Role |
|------|------|
| `src/app/page.tsx` | Renders `GuideShell` |
| `src/components/guide/GuideShell.tsx` | Sidebar, header, prompts, skill detail |
| `src/components/guide/CopyButton.tsx` | Clipboard copy for prompts |

`GuideShell` is a **client component** (`"use client"`).

## 8. Styling

- **Tailwind CSS v4** with `@import "tailwindcss"` in `src/app/globals.css`.
- Dark mode follows **prefers-color-scheme** via `:root` in `globals.css`.

## 9. Deployment

### Static-friendly

The app is a **static** site (`○ /` in build output). You can deploy to:

- **Vercel** — connect repo; default Next.js settings.
- **Netlify** — Next.js runtime.
- **Any Node host** — `npm run build && npm run start`.

### Turbopack root

`next.config.ts` sets `turbopack.root` to reduce workspace warnings when multiple `package-lock.json` files exist above the project.

## 10. Security

- The app **never** stores tokens. Users must not embed secrets in skill text if you fork the repo publicly.
- References point to public docs (e.g. OpenClaw, Telegram Bot API). Replace with your internal wiki if needed.

## 11. Troubleshooting

| Symptom | Cause / fix |
|---------|----------------|
| Build fails on types | Run `npm run build`; fix imports in `src/lib/types.ts` |
| Clipboard copy fails | Some browsers block clipboard on non-HTTPS non-localhost |
| Wrong Turbopack root | Adjust `next.config.ts` `turbopack.root` |

## 12. Related docs

- [Quickstart](QUICKSTART.md)
- [Tutorial](TUTORIAL.md)
- [Marketing assets](marketing/README.md)
