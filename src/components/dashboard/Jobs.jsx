import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Plus, Search, Play, Pause, Trash2, ExternalLink, CalendarCheck, Activity } from "lucide-react";
import { turso } from "../../lib/turso.js";

export default function Jobs() {
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  function loadJobs() {
    if (!user) return;
    setLoading(true);
    turso
      .execute({
        sql: "SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY created_at DESC",
        args: [user.id],
      })
      .then((res) => setJobs(res.rows))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  useEffect(loadJobs, [user]);

  async function toggleJob(job) {
    try {
      await turso.execute({
        sql: "UPDATE cron_jobs SET enabled = ?, updated_at = datetime('now') WHERE id = ? AND user_id = ?",
        args: [job.enabled ? 0 : 1, job.id, user.id],
      });
      loadJobs();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteJob(id) {
    if (!confirm("Delete this job?")) return;
    try {
      await turso.execute({
        sql: "DELETE FROM cron_jobs WHERE id = ? AND user_id = ?",
        args: [id, user.id],
      });
      loadJobs();
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-[var(--color-bg-secondary)] rounded-xl animate-pulse w-48" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-[var(--color-bg-secondary)] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const isEmpty = jobs.length === 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[var(--color-text-main)]">Jobs</h1>
        <Link
          to="/dashboard/jobs/new"
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-text-main)] text-[var(--color-bg-main)] rounded-xl text-sm font-medium hover:opacity-90 transition-all"
        >
          <Plus size={16} />
          New Job
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full pl-9 pr-4 py-2.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-green-strong)] transition-colors"
        />
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-16 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl">
          <CalendarCheck size={32} className="text-[var(--color-text-muted)] mb-4" />
          <h3 className="text-sm font-semibold text-[var(--color-text-main)] mb-1">No jobs found</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">Create your first scheduled job.</p>
          <Link
            to="/dashboard/jobs/new"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-text-main)] text-[var(--color-bg-main)] rounded-xl text-sm font-medium hover:opacity-90"
          >
            <Plus size={16} />
            New Job
          </Link>
        </div>
      ) : (
        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)]">Job</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)]">Schedule</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)]">Method</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)]">Endpoint</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)]">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-[var(--color-text-muted)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-secondary)] transition-colors">
                    <td className="px-4 py-3">
                      <Link to={`/dashboard/jobs/${job.id}`} className="text-sm font-medium text-[var(--color-text-main)] hover:text-[var(--color-green-strong)]">
                        {job.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--color-text-secondary)]">{job.expression}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-2 py-0.5 rounded">
                        {job.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-muted)] font-mono max-w-[200px] truncate">{job.url}</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1.5 text-xs ${job.enabled ? "text-[var(--color-green-strong)]" : "text-[var(--color-text-muted)]"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${job.enabled ? "bg-[var(--color-green-signal)]" : "bg-[var(--color-border-strong)]"}`} />
                        {job.enabled ? "Active" : "Paused"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleJob(job)}
                          className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-secondary)] transition-all"
                          title={job.enabled ? "Pause" : "Activate"}
                        >
                          {job.enabled ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                        <Link
                          to={`/dashboard/jobs/${job.id}`}
                          className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-secondary)] transition-all"
                        >
                          <ExternalLink size={14} />
                        </Link>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-red-error)] hover:bg-[var(--color-red-error)]/5 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}


