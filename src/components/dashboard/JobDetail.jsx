import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { ArrowLeft, Play, Pause, Edit3, Trash2, Clock, Globe, Terminal } from "lucide-react";
import { turso } from "../../lib/turso.js";
import { cronLabel } from "../../lib/labels.js";

export default function JobDetail() {
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) return;
    Promise.all([
      turso.execute({
        sql: "SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?",
        args: [id, user.id],
      }),
      turso.execute({
        sql: `SELECT * FROM execution_logs WHERE job_id = ? ORDER BY started_at DESC LIMIT 20`,
        args: [id],
      }),
    ])
      .then(([jobRes, logRes]) => {
        setJob(jobRes.rows[0] || null);
        setLogs(logRes.rows);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, user]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-[var(--color-bg-secondary)] rounded-xl animate-pulse w-48" />
        <div className="h-32 bg-[var(--color-bg-secondary)] rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">Job not found</p>
        <Link to="/dashboard/jobs" className="text-sm text-[var(--color-green-strong)] hover:underline">← Back to jobs</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/jobs" className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-secondary)] transition-all">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[var(--color-text-main)]">{job.name}</h1>
            <p className="text-xs text-[var(--color-text-muted)] font-mono">{job.url}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to={`/dashboard/jobs/${id}/edit`} className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-secondary)] transition-all">
            <Edit3 size={16} />
          </Link>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: "Schedule", value: cronLabel(job.expression) },
          { icon: Globe, label: "Method", value: job.method },
          { icon: Terminal, label: "Status", value: job.enabled ? "Active" : "Paused" },
          { icon: Activity, label: "Executions", value: logs.length },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className="text-[var(--color-text-muted)]" />
                <span className="text-xs text-[var(--color-text-muted)]">{item.label}</span>
              </div>
              <p className="text-sm font-mono font-medium text-[var(--color-text-main)]">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Logs */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-text-main)] mb-4">Recent executions</h2>
        {logs.length === 0 ? (
          <p className="text-sm text-[var(--color-text-muted)]">No executions yet.</p>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    log.status === "success" ? "bg-[var(--color-green-signal)]" :
                    log.status === "failure" ? "bg-[var(--color-red-error)]" :
                    "bg-[var(--color-amber-warning)]"
                  }`} />
                  <span className="text-xs text-[var(--color-text-secondary)] font-mono">
                    {new Date(log.started_at + "Z").toLocaleString()}
                  </span>
                </div>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">
                  {log.status_code || "—"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
