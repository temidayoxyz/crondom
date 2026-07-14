import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { turso } from "../lib/turso.js";

export default function JobForm() {
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

  // Load existing job for editing
  useEffect(() => {
    if (!id) return;
    turso
      .execute({ sql: "SELECT * FROM cron_jobs WHERE id = ?", args: [id] })
      .then((res) => {
        if (res.rows.length === 0) {
          navigate("/");
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
  }, [id]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Basic validation
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
                WHERE id = ?`,
          args: [
            form.name, form.expression, form.url, form.method,
            form.headers, form.body, id,
          ],
        });
      } else {
        await turso.execute({
          sql: `INSERT INTO cron_jobs (id, user_id, name, expression, url, method, headers, body)
                VALUES (?, 'default', ?, ?, ?, ?, ?, ?)`,
          args: [
            crypto.randomUUID(),
            form.name, form.expression, form.url,
            form.method, form.headers, form.body,
          ],
        });
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Job" : "New Cron Job"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="My daily backup"
            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
          />
        </div>

        {/* Cron expression */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Cron Expression
            <span className="text-gray-600 ml-1">— */5 * * * * = every 5 minutes</span>
          </label>
          <input
            type="text"
            value={form.expression}
            onChange={(e) => update("expression", e.target.value)}
            placeholder="*/5 * * * *"
            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 font-mono text-sm"
          />
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">URL</label>
          <input
            type="url"
            value={form.url}
            onChange={(e) => update("url", e.target.value)}
            placeholder="https://api.example.com/backup"
            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
          />
        </div>

        {/* Method */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Method</label>
          <select
            value={form.method}
            onChange={(e) => update("method", e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
          >
            {methods.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Headers */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Headers <span className="text-gray-600">(JSON)</span>
          </label>
          <textarea
            value={form.headers}
            onChange={(e) => update("headers", e.target.value)}
            rows={3}
            placeholder='{"Authorization": "Bearer xxx"}'
            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 font-mono text-sm"
          />
        </div>

        {/* Body */}
        {form.method !== "GET" && form.method !== "HEAD" && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Body</label>
            <textarea
              value={form.body}
              onChange={(e) => update("body", e.target.value)}
              rows={4}
              placeholder='{"key": "value"}'
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 font-mono text-sm"
            />
          </div>
        )}

        {error && (
          <div className="text-red-400 text-sm bg-red-900/20 px-4 py-2 rounded-lg">{error}</div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 rounded-lg text-sm font-medium transition-colors"
          >
            {saving ? "Saving..." : isEdit ? "Update Job" : "Create Job"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
