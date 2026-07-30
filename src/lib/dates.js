/**
 * Parse timestamps from Turso / the engine.
 * - Engine writes ISO: 2026-07-29T23:26:25.595Z
 * - SQLite datetime('now'): 2026-07-29 23:26:25
 */
export function parseDbDate(value) {
  if (value == null || value === "") return null;

  let s = String(value).trim();

  // Already timezone-aware (ISO with Z or offset)
  if (/[zZ]$|[+-]\d{2}:\d{2}$/.test(s)) {
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  // SQLite-style "YYYY-MM-DD HH:MM:SS" → ISO UTC
  if (s.includes(" ") && !s.includes("T")) {
    s = s.replace(" ", "T");
  }

  if (!/[zZ]$|[+-]\d{2}:\d{2}$/.test(s)) {
    s += "Z";
  }

  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDateTime(value) {
  const d = parseDbDate(value);
  return d ? d.toLocaleString() : "—";
}

export function formatDurationSeconds(startedAt, finishedAt) {
  const start = parseDbDate(startedAt);
  const end = parseDbDate(finishedAt);
  if (!start || !end) return "—";
  const sec = (end - start) / 1000;
  if (Number.isNaN(sec) || sec < 0) return "—";
  return `${sec.toFixed(1)}s`;
}
