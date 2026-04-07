# Tutorial: Using the Playbook

This tutorial walks through the app screen by screen so you can use it effectively with a **dedicated MacBook Pro** and **OpenClaw** (or similar) connected to **Telegram**, **Discord**, and other channels.

## What this app is for

- **Planning** isolation, tokens, pairing, and allowlists before you touch production chats.
- **Executing** gateway checks, DM vs group behavior, and mention gates.
- **Post-go-live** habits: logs, rotation, backups.
- **Cross-Mac workflows** (SMB, Tailscale, clipboard bridges) without mixing personal Apple IDs.

It does **not** replace official **OpenClaw** or provider docs; it organizes **skills** and **prompts** in one place.

---

## Part A — Explore the 100 skills

1. Open the app and scroll the **left sidebar**.
2. Skills are grouped by **lifecycle stage**:
   - **Preplan** — hardware, accounts, network, risk.
   - **Plan** — channels, tokens, pairing, commands.
   - **Execution** — gateway, Telegram/Discord patterns, models.
   - **Postplan** — monitoring, backups, rotation.
   - **Other** — macOS bridges, SMB, troubleshooting.
3. Under each stage, skills are subdivided by **subcategory** (e.g. *Hardware & power*, *Telegram patterns*).
4. Click a skill. The **main panel** shows:
   - **Title** and **audience tags** (which levels the skill is written for).
   - **Summary** — short context.
   - **Steps** — ordered actions.
   - **Checklist** — quick verification.
   - **References** — links to docs (no secrets).

**Tip:** Pick one skill per week and mark it done in your own tracker; the app does not persist checkboxes.

---

## Part B — Channel-specific prompts (top bar)

The **top bar** is separate from the sidebar. It drives **10 copy-pastable prompts** for a chosen **SNS channel** and **stage**.

### 1. Select a channel

Use the **Channel** pills: **Telegram**, **Discord**, **Slack**, **Matrix**, **Signal**, **WhatsApp**, **iMessage**, **Web / local UI**.

- The **title** and **subject line** adapt (e.g. Telegram vs Discord vocabulary).
- A **doc hint** reminds you where to read official integration docs.

### 2. Select “Stage (prompts)”

This is the **prompt pack** stage, not necessarily the same as the skill you selected in the sidebar:

| Stage | Typical use |
|-------|-------------|
| Preplan | Isolation, threat thinking, Mac prep |
| Plan | Tokens, pairing, allowlists, config outline |
| Execution | Gateway, testing, logs, first messages |
| Postplan | Health checks, rotation, backups |
| Other | SMB, Tailscale, Universal Clipboard limits, etc. |

### 3. Select audience

- **Basic** — shorter, “explain like I’m setting this up first time.”
- **Intermediate** — CLI, config shapes, runbooks.
- **Advanced** — threat modeling, SLOs, chaos, compliance-style questions.

### 4. Copy prompts

Each pack has **exactly 10** prompts. Click **Copy** and paste into:

- Your **LLM** on the dedicated Mac (for deeper answers).
- A **private note** in your bridge folder (SMB/Tailscale).
- **Never** paste tokens or pairing codes into untrusted web UIs.

---

## Part C — Typical workflows

### Workflow 1 — New Telegram bot + OpenClaw

1. Sidebar: **Plan** → subcategory around **Telegram** / **channels**.
2. Top bar: **Telegram**, **Plan**, **Intermediate**.
3. Copy prompts that mention pairing and allowlists; work through answers on the dedicated Mac.
4. Switch top bar to **Execution**, copy test and log prompts.

### Workflow 2 — Discord intents and guilds

1. Sidebar: **Execution** → **Discord patterns** (or **Plan** → **Credentials**).
2. Top bar: **Discord**, **Plan** then **Execution**.
3. Use **Advanced** if you are tuning allowlists and SLIs.

### Workflow 3 — Two Macs, no shared Apple ID

1. Sidebar: **Other** → **macOS bridges** / **Clipboard & files**.
2. Top bar: **Other**, **Basic** or **Intermediate**.
3. Copy prompts about SMB, `smb://` syntax, and Tailscale.

---

## Part D — Regenerating skill data (developers)

If you change `scripts/generate-skills.mjs`:

```bash
node scripts/generate-skills.mjs
```

Then reload the app. Prompts live in `src/data/prompts.ts` and are edited by hand.

---

## Troubleshooting (UI)

| Issue | What to try |
|-------|-------------|
| Sidebar empty | Hard refresh; confirm `src/data/skillCatalog.ts` exists and build succeeded |
| Prompts look wrong | Check **Channel**, **Stage (prompts)**, and **Audience** |
| Copy does nothing | Browser may block clipboard on HTTP; use `localhost` or HTTPS |

For build and deployment issues, see [Manual](MANUAL.md).
