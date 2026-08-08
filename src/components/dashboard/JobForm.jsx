import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { turso } from "../../lib/turso.js";
import { cronPresets } from "../../lib/labels.js";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

function emptyForm() {
  return {
    name: "",
    expression: "*/5 * * * *",
    url: "",
    method: "GET",
    headers: "{}",
    body: "",
  };
}

export default function JobForm() {
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const userId = user?.id;

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Depend on userId (stable string), not the whole Clerk `user` object.
  // Re-running this effect mid-edit reloads from the DB and wipes local changes.
  useEffect(() => {
    if (!isEdit || !userId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    turso
      .execute({
        sql: "SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?",
        args: [id, userId],
      })
      .then((res) => {
        if (cancelled) return;
        if (res.rows.length === 0) {
          navigate("/dashboard/jobs");
          return;
        }
        const job = res.rows[0];
        setForm({
          name: job.name ?? "",
          expression: job.expression ?? "*/5 * * * *",
          url: job.url ?? "",
          method: String(job.method || "GET").toUpperCase(),
          headers: job.headers != null && job.headers !== "" ? String(job.headers) : "{}",
          body: job.body != null ? String(job.body) : "",
        });
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, userId, isEdit, navigate]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userId) {
      setError("You must be signed in to save a job.");
      return;
    }

    setSaving(true);
    setError(null);

    const name = form.name.trim();
    const url = form.url.trim();
    if (!name || !url) {
      setError("Name and URL are required.");
      setSaving(false);
      return;
    }

    // Validate headers JSON so we don't silently store garbage
    let headers = form.headers?.trim() || "{}";
    try {
      const parsed = JSON.parse(headers);
      if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Headers must be a JSON object.");
      }
      headers = JSON.stringify(parsed);
    } catch (err) {
      setError(err instanceof SyntaxError ? "Headers must be valid JSON." : err.message);
      setSaving(false);
      return;
    }

    const method = String(form.method || "GET").toUpperCase();
    const body = form.method === "GET" || form.method === "HEAD" ? "" : form.body || "";

    try {
      if (isEdit) {
        const result = await turso.execute({
          sql: `UPDATE cron_jobs
                SET name = ?, expression = ?, url = ?, method = ?,
                    headers = ?, body = ?, updated_at = datetime('now')
                WHERE id = ? AND user_id = ?`,
          args: [name, form.expression, url, method, headers, body, id, userId],
        });
        // LibSQL does not throw when WHERE matches nothing — treat as failure
        if (result.rowsAffected === 0) {
          throw new Error("Job was not updated. It may have been deleted or you may not own it.");
        }
      } else {
        const jobId = crypto.randomUUID();
        await turso.execute({
          sql: `INSERT INTO cron_jobs (id, user_id, name, expression, url, method, headers, body)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [jobId, userId, name, form.expression, url, method, headers, body],
        });
      }
      navigate("/dashboard/jobs");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  // If this job uses a cron expression that is not in the preset list, still show it
  const expressionOptions = (() => {
    if (cronPresets.some((p) => p.value === form.expression)) return cronPresets;
    return [{ value: form.expression, label: `Custom (${form.expression})` }, ...cronPresets];
  })();

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="h-8 bg-[var(--color-bg-secondary)] rounded-xl animate-pulse w-48" />
        <div className="h-48 bg-[var(--color-bg-secondary)] rounded-2xl animate-pulse" />
        <div className="h-32 bg-[var(--color-bg-secondary)] rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => navigate("/dashboard/jobs")}
          className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-secondary)] transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-bold text-[var(--color-text-main)]">
          {isEdit ? "Edit Job" : "New Job"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-[var(--color-text-main)]">Basic details</h2>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Job name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="API health check"
              className="w-full px-3.5 py-2.5 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-green-strong)] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Endpoint URL</label>
            <input
              type="text"
              inputMode="url"
              value={form.url}
              onChange={(e) => update("url", e.target.value)}
              placeholder="https://api.example.com/health"
              className="w-full px-3.5 py-2.5 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-main)] font-mono focus:outline-none focus:border-[var(--color-green-strong)] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">HTTP method</label>
            <div className="flex gap-2 flex-wrap">
              {METHODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => update("method", m)}
                  className={`px-4 py-2 text-xs font-mono font-medium rounded-xl border transition-all ${
                    form.method === m
                      ? "bg-[var(--color-green-strong)]/5 border-[var(--color-green-strong)]/20 text-[var(--color-green-strong)]"
                      : "bg-[var(--color-bg-secondary)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-[var(--color-text-main)]">Schedule</h2>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">How often should this run?</label>
            <select
              value={form.expression}
              onChange={(e) => update("expression", e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-green-strong)] transition-colors appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238A909B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                paddingRight: "36px",
              }}
            >
              {expressionOptions.map((preset) => (
                <option key={preset.value} value={preset.value}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-[var(--color-text-main)]">Request</h2>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Headers (JSON)</label>
            <textarea
              value={form.headers}
              onChange={(e) => update("headers", e.target.value)}
              rows={3}
              placeholder='{"Authorization": "Bearer xxx"}'
              className="w-full px-3.5 py-2.5 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-main)] font-mono focus:outline-none focus:border-[var(--color-green-strong)] transition-colors"
            />
          </div>
          {form.method !== "GET" && form.method !== "HEAD" && (
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Body</label>
              <textarea
                value={form.body}
                onChange={(e) => update("body", e.target.value)}
                rows={4}
                placeholder='{"key": "value"}'
                className="w-full px-3.5 py-2.5 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-main)] font-mono focus:outline-none focus:border-[var(--color-green-strong)] transition-colors"
              />
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 bg-[var(--color-red-error)]/5 border border-[var(--color-red-error)]/20 rounded-xl text-sm text-[var(--color-red-error)]">
            <AlertTriangle size={14} />
            {error}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-[var(--color-text-main)] text-[var(--color-bg-main)] rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {saving ? "Saving..." : isEdit ? "Update job" : "Create job"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard/jobs")}
            className="px-6 py-2.5 border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-xl text-sm hover:bg-[var(--color-bg-secondary)] transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
