# crondom

A web UI for managing cron jobs — built with **Vite + React**, talking directly to **Turso** from the browser.

**Scheduler engine**: [crondom-scheduler](https://github.com/temidayoxyz/crondom-scheduler)

## Stack

- **Framework**: React 18 + React Router
- **Auth**: Clerk (free — 10K users)
- **Build**: Vite
- **Database**: Turso (via `@libsql/client/web`)
- **Hosting**: GitHub Pages

## Setup

### 1. Create a Clerk application

Go to [clerk.com](https://clerk.com) → **Add Application** → name it `crondom` → copy the **Publishable Key** (starts with `pk_live_`)

### 2. Set up environment

```bash
cp .env.example .env
```

Fill in your Turso DB URL, Turso token, and Clerk publishable key.

### 3. Install and run

```bash
npm install
npm run dev
```

### 4. Deploy to GitHub Pages

Add these secrets to **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `VITE_TURSO_DATABASE_URL` | Your Turso DB URL |
| `VITE_TURSO_AUTH_TOKEN` | Your Turso token |
| `VITE_CLERK_PUBLISHABLE_KEY` | Your Clerk publishable key |

Push to `main` — deploy workflow builds and pushes to `gh-pages`.

Your site: `https://temidayoxyz.github.io/crondom/`

---

**Scheduler repo**: [crondom-scheduler](https://github.com/temidayoxyz/crondom-scheduler)
