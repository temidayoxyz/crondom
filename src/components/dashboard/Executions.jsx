import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Search, Filter } from "lucide-react";
import { turso } from "../../lib/turso.js";

export default function Executions() {
  const { user } = useUser();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    turso
      .execute({
        sql: `SELECT el.*, cj.name as job_name, cj.method as job_method
              FROM execution_logs el
              LEFT JOIN cron_jobs cj ON el.job_id = cj.id
              WHERE cj.user_id = ?
              ORDER BY el.started_at DESC
              LIMIT 50`,
        args: [user.id],
      })
      .then((res) => setLogs(res.rows))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case "success": return "text-[var(--color-green-strong)]";
      case "failure": return "text-[var(--color-red-error)]";
      case "running": return "text-[var(--color-amber-warning)]";
      default: return "text-[var(--color-text-muted)]";
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-[var(--color-bg-secondary)] rounded-xl animate-pulse w-48" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-[var(--color-bg-secondary)] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[var(--color-text-main)]">Executions</h1>
        <button className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-all">
          <Filter size={14} />
          Filter
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          type="text"
          placeholder="Search executions..."
          className="w-full pl-9 pr-4 py-2.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-green-strong)] transition-colors"
        />
      </div>

      {logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl">
          <p className="text-sm text-[var(--color-text-secondary)]">No executions yet.</p>
        </div>
      ) : (
        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)]">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)]">Job</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)]">Method</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)]">Code</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)]">Started</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)]">Duration</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-secondary)] transition-colors">
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium capitalize ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-main)]">{log.job_name || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-2 py-0.5 rounded">
                        {log.job_method || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--color-text-secondary)]">{log.status_code || "—"}</td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-secondary)] font-mono">
                      {log.started_at ? new Date(log.started_at + "Z").toLocaleTimeString() : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-secondary)] font-mono">
                      {log.finished_at && log.started_at
                        ? ((new Date(log.finished_at + "Z") - new Date(log.started_at + "Z")) / 1000).toFixed(1) + "s"
                        : "—"}
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
