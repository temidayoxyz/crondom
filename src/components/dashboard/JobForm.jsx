import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { ArrowLeft } from "lucide-react";
import { turso } from "../../lib/turso.js";
import { cronPresets } from "../../lib/labels.js";
import { createJob } from "../../lib/worker.js";

export default function JobForm() {
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    expression: "*/5 * * * *",
    url: "",
    method: "GET",
    headers: "{}",
    body: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !user) return;
    turso
      .execute({
        sql: "SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?",
        args: [id, user.id],
      })
      .then((res) => {
        if (res.rows.length === 0) {
          navigate("/dashboard/jobs");
          return;
        }
        const job = res.rows[0];
        setForm({
          name: job.name,
          expression: job.expression,
          url: job.url,
          method: job.method,
          headers: job.headers,
          body: job.body || "",
        });
      })
      .catch((err) => setError(err.message));
  }, [id, user]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!form.name.trim() || !form.url.trim()) {
      setError("Name and URL are required.");
      setSaving(false);
      return;
    }

    try {
      if (isEdit) {
        await turso.execute({
          sql: `UPDATE cron_jobs
                SET name = ?, expression = ?, url = ?, method = ?,
                    headers = ?, body = ?, updated_at = datetime('now')
                WHERE id = ? AND user_id = ?`,
          args: [form.name, form.expression, form.url, form.method, form.headers, form.body, id, user.id],
        });
      } else {
        const jobId = crypto.randomUUID();
        await turso.execute({
          sql: `INSERT INTO cron_jobs (id, user_id, name, expression, url, method, headers, body)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [jobId, user.id, form.name, form.expression, form.url, form.method, form.headers, form.body],
        });
        // Register with Inngest
        createJob({
          user_id: user.id,
          name: form.name,
          expression: form.expression,
          url: form.url,
          method: form.method,
          headers: form.headers,
          body: form.body,
        }).catch((err) => console.error("Inngest registration:", err));
      }
      navigate("/dashboard/jobs");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate("/dashboard/jobs")} className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-secondary)] transition-all">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-bold text-[var(--color-text-main)]">
          {isEdit ? "Edit Job" : "New Job"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-[var(--color-text-main)]">Basic details</h2>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Job name</label>
            <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)}
              placeholder="API health check"
              className="w-full px-3.5 py-2.5 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-green-strong)] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Endpoint URL</label>
            <input type="url" value={form.url} onChange={(e) => update("url", e.target.value)}
              placeholder="https://api.example.com/health"
              className="w-full px-3.5 py-2.5 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-main)] font-mono focus:outline-none focus:border-[var(--color-green-strong)] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">HTTP method</label>
            <div className="flex gap-2">
              {methods.map((m) => (
                <button key={m} type="button" onClick={() => update("method", m)}
                  className={`px-4 py-2 text-xs font-mono font-medium rounded-xl border transition-all ${
                    form.method === m
                      ? "bg-[var(--color-green-strong)]/5 border-[var(--color-green-strong)]/20 text-[var(--color-green-strong)]"
                      : "bg-[var(--color-bg-secondary)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                  }`}>
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
            <select value={form.expression} onChange={(e) => update("expression", e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-green-strong)] transition-colors appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238A909B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: '36px',
              }}>
              {cronPresets.map((preset) => (
                <option key={preset.value} value={preset.value}>{preset.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-[var(--color-text-main)]">Request</h2>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Headers (JSON)</label>
            <textarea value={form.headers} onChange={(e) => update("headers", e.target.value)} rows={3}
              placeholder='{"Authorization": "Bearer xxx"}'
              className="w-full px-3.5 py-2.5 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-main)] font-mono focus:outline-none focus:border-[var(--color-green-strong)] transition-colors" />
          </div>
          {form.method !== "GET" && form.method !== "HEAD" && (
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Body</label>
              <textarea value={form.body} onChange={(e) => update("body", e.target.value)} rows={4}
                placeholder='{"key": "value"}'
                className="w-full px-3.5 py-2.5 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-main)] font-mono focus:outline-none focus:border-[var(--color-green-strong)] transition-colors" />
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
          <button type="submit" disabled={saving}
            className="px-6 py-2.5 bg-[var(--color-text-main)] text-[var(--color-bg-main)] rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all">
            {saving ? "Saving..." : isEdit ? "Update job" : "Create job"}
          </button>
          <button type="button" onClick={() => navigate("/dashboard/jobs")}
            className="px-6 py-2.5 border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-xl text-sm hover:bg-[var(--color-bg-secondary)] transition-all">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
