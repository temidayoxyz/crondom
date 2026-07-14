# crondom

A web UI for managing cron jobs — built with **Vite + React**, talking directly to **Turso** from the browser.

**Scheduler engine**: [crondom-scheduler](https://github.com/temidayoxyz/crondom-scheduler)

## Stack

- **Framework**: React 18 + React Router
- **Build**: Vite
- **Database**: Turso (via `@libsql/client/web` — browser HTTP client)
- **Hosting**: GitHub Pages (free)

## Setup

### 1. Get your Turso database URL and token

From the [Turso dashboard](https://turso.tech), grab your database URL and create an auth token.

### 2. Copy the env file

```bash
cp .env.example .env
```

Fill in your Turso URL and auth token.

### 3. Install and run

```bash
npm install
npm run dev
```

### 4. Deploy to GitHub Pages

Add your Turso secrets to GitHub → **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `VITE_TURSO_DATABASE_URL` | `libsql://crondom-xxx.turso.io` |
| `VITE_TURSO_AUTH_TOKEN` | Your Turso token |

Then push to `main` — the deploy workflow will build and push to `gh-pages` branch.

Your site will be live at: `https://temidayoxyz.github.io/crondom/`

## Security note

The Turso auth token is embedded in the JavaScript bundle at build time. For an MVP this is acceptable — Turso tokens can be scoped. For production, add a lightweight proxy layer.

---

**Scheduler repo**: [crondom-scheduler](https://github.com/temidayoxyz/crondom-scheduler)
