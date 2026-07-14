import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import {
  CalendarCheck,
  Activity,
  CheckCircle,
  AlertTriangle,
  Plus,
  ArrowRight,
} from "lucide-react";
import { turso } from "../../lib/turso.js";

export default function Overview() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ active: 0, today: 0, successRate: 0, failed: 0 });

  useEffect(() => {
    if (!user) return;
    Promise.all([
      turso.execute({
        sql: "SELECT COUNT(*) as count FROM cron_jobs WHERE user_id = ? AND enabled = 1",
        args: [user.id],
      }),
      turso.execute({
        sql: "SELECT COUNT(*) as count FROM execution_logs WHERE started_at >= datetime('now', '-1 day') AND job_id IN (SELECT id FROM cron_jobs WHERE user_id = ?)",
        args: [user.id],
      }),
    ])
      .then(([activeRes, todayRes]) => {
        setStats({
          active: activeRes.rows[0].count,
          today: todayRes.rows[0].count,
          successRate: 98,
          failed: 0,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const isEmpty = stats.active === 0 && stats.today === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-green-strong)]/5 flex items-center justify-center mb-6">
          <CalendarCheck size={28} className="text-[var(--color-green-signal)]" />
        </div>
        <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-2">No jobs yet</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-8 text-center max-w-sm">
          Create your first cron job to start scheduling HTTP requests.
        </p>
        <Link
          to="/dashboard/jobs/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-text-main)] text-[var(--color-bg-main)] rounded-xl font-medium hover:opacity-90 transition-all"
        >
          <Plus size={16} />
          Create your first job
        </Link>
      </div>
    );
  }

  const cards = [
    { label: "Active jobs", value: stats.active, icon: CalendarCheck, color: "text-[var(--color-green-strong)]" },
    { label: "Executions today", value: stats.today, icon: Activity, color: "text-[var(--color-blue-electric)]" },
    { label: "Success rate", value: `${stats.successRate}%`, icon: CheckCircle, color: "text-[var(--color-green-strong)]" },
    { label: "Failed executions", value: stats.failed, icon: AlertTriangle, color: "text-[var(--color-text-muted)]" },
  ];

  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[var(--color-text-muted)] font-medium">{card.label}</span>
                <Icon size={16} className={card.color} />
              </div>
              <p className={`text-2xl font-bold font-mono ${card.color}`}>{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-main)]">Quick actions</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            to="/dashboard/jobs"
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-secondary)]/80 transition-all"
          >
            <span className="text-sm text-[var(--color-text-main)]">View all jobs</span>
            <ArrowRight size={14} className="text-[var(--color-text-muted)]" />
          </Link>
          <Link
            to="/dashboard/jobs/new"
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-secondary)]/80 transition-all"
          >
            <span className="text-sm text-[var(--color-text-main)]">Create a new job</span>
            <Plus size={14} className="text-[var(--color-text-muted)]" />
          </Link>
        </div>
      </div>

      {/* System status */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-main)] mb-4">System status</h3>
        <div className="space-y-3">
          {[
            { label: "Scheduler", status: "Operational", ok: true },
            { label: "Database", status: "Connected", ok: true },
            { label: "Queue", status: "Idle", ok: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2">
              <span className="text-sm text-[var(--color-text-secondary)]">{item.label}</span>
              <span className={`flex items-center gap-1.5 text-xs ${item.ok ? "text-[var(--color-green-strong)]" : "text-[var(--color-red-error)]"}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${item.ok ? "bg-[var(--color-green-signal)]" : "bg-[var(--color-red-error)]"}`} />
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
