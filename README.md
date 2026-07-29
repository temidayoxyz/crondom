# crondom

A **$0 stack** HTTP cron job manager — create, schedule, and monitor jobs from the browser.

**Live app:** [https://crondom.temidayo.xyz/](https://crondom.temidayo.xyz/)

## What this repo is

This is the **web UI**. Users sign in, manage cron jobs, and view execution history. The browser talks to **Turso** directly.

Jobs are executed by a separate always-on process:

| Repo | Role | Deploy |
|---|---|---|
| **crondom** (this repo) | Dashboard UI | GitHub Pages |
| **[crondom-engine](https://github.com/temidayoxyz/crondom-engine)** | Runs due jobs every 60s | GCP e2-micro (free tier) |

```
Browser (this app) ──► Turso (cron_jobs, execution_logs)
                              ▲
                              │
                      crondom-engine (VM)
                           every 60s
                           fetch due URLs
```

Both apps share the **same Turso database**. The UI writes jobs; the engine executes them and writes logs.

## Stack

- **UI:** React 18 + React Router + Vite
- **Auth:** Clerk
- **Database:** Turso (`@libsql/client/web`)
- **Hosting:** GitHub Pages (custom domain)

## Setup

### 1. Clerk

Create an application at [clerk.com](https://clerk.com) and copy the **Publishable Key** (`pk_live_…` or `pk_test_…`).

### 2. Environment

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_TURSO_DATABASE_URL` | Turso libsql URL |
| `VITE_TURSO_AUTH_TOKEN` | Turso auth token (read/write) |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |

Use the **same** Turso URL and token in [crondom-engine](https://github.com/temidayoxyz/crondom-engine).

### 3. Run locally

```bash
npm install
npm run dev
```

The engine is not required for browsing the UI, but jobs will not fire until the engine is running against the same database.

### 4. Database schema

Tables live in Turso (`cron_jobs`, `execution_logs`). Initialize once via the engine:

```bash
# in the crondom-engine repo
npm run db:init
```

Or apply `db/schema.sql` from this repo with the Turso CLI.

### 5. Deploy (GitHub Pages)

Add repository secrets under **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `VITE_TURSO_DATABASE_URL` | Turso URL |
| `VITE_TURSO_AUTH_TOKEN` | Turso token |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk key |

Push to `main` — the deploy workflow builds and publishes to `gh-pages`.

## Related

- **Live app:** [crondom.temidayo.xyz](https://crondom.temidayo.xyz/)
- **Engine:** [github.com/temidayoxyz/crondom-engine](https://github.com/temidayoxyz/crondom-engine)
