# Quickstart

Get the OpenClaw ↔ SNS Playbook running on your machine in a few minutes.

## 1. Clone or open the project

```bash
cd openclaw-sns-guide
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start the dev server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

- **`/`** — Marketing-style **landing page** with a scrollable left nav (desktop), section jumps, and a **GitHub** button (bottom-right). Use **Open full playbook** (or **Enter playbook workspace**) for the tool.
- **`/playbook`** — **Interactive playbook** (100 skills, prompts, copy buttons).

## 4. First actions in the UI (playbook)

Open [http://localhost:3000/playbook](http://localhost:3000/playbook), then:

1. **Left sidebar** — Pick any skill under **Preplan → Plan → Execution → Post-plan → Other**. The main panel shows steps and checklists.
2. **Top bar — Channel** — Choose **Telegram**, **Discord**, or another surface. The headline and subject line update for that channel.
3. **Stage (prompts)** — Choose **Preplan**, **Plan**, **Execution**, **Post-plan**, or **Other**. This selects which **10 prompts** load (not the sidebar skill stage; you can mix freely).
4. **Audience** — **Basic**, **Intermediate**, or **Advanced** changes tone and depth of the 10 prompts.
5. **Copy** — Use **Copy** next to any prompt to paste into your LLM or notes app on the dedicated Mac.

## 5. Production build (optional)

```bash
npm run build
npm run start
```

Visit the URL shown in the terminal (default **http://localhost:3000**).

## 6. Regenerate skills (optional)

Only if you edited `scripts/generate-skills.mjs`:

```bash
node scripts/generate-skills.mjs
```

## Next steps

- Full UI walkthrough: [Tutorial](TUTORIAL.md)
- Reference and ops: [Manual](MANUAL.md)
