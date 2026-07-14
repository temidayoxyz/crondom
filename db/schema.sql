-- Run this against your Turso database to initialize the schema.
-- You can use: turso db shell <db-name> < db/schema.sql

CREATE TABLE IF NOT EXISTS cron_jobs (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  name       TEXT NOT NULL,
  expression TEXT NOT NULL,
  url        TEXT NOT NULL,
  method     TEXT DEFAULT 'GET',
  headers    TEXT DEFAULT '{}',
  body       TEXT,
  enabled    INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS execution_logs (
  id          TEXT PRIMARY KEY,
  job_id      TEXT NOT NULL REFERENCES cron_jobs(id),
  status      TEXT NOT NULL,
  status_code INTEGER,
  output      TEXT,
  error       TEXT,
  started_at  TEXT DEFAULT (datetime('now')),
  finished_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_cron_jobs_enabled ON cron_jobs(enabled);
CREATE INDEX IF NOT EXISTS idx_execution_logs_job_id ON execution_logs(job_id);
CREATE INDEX IF NOT EXISTS idx_execution_logs_started_at ON execution_logs(started_at);
