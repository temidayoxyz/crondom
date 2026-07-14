import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { turso } from "../lib/turso.js";

export default function Logs() {
  const { user } = useUser();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    Promise.all([
      turso.execute({
        sql: "SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?",
        args: [id, user.id],
      }),
      turso.execute({
        sql: `SELECT * FROM execution_logs
              WHERE job_id = ?
              ORDER BY started_at DESC
              LIMIT 100`,
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

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  if (!job) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Job not found</p>
        <Link to="/" className="text-orange-400 hover:text-orange-300 mt-2 inline-block">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  const statusIcon = {
    running: "⏳",
    success: "✅",
    failure: "❌",
  };

  const statusColor = {
    running: "text-yellow-400",
    success: "text-green-400",
    failure: "text-red-400",
  };

  return (
    <div>
      <Link to="/" className="text-sm text-gray-500 hover:text-gray-300 mb-4 inline-block">
        ← Back to Dashboard
      </Link>

      <div className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 mb-6">
        <h1 className="text-xl font-bold">{job.name}</h1>
        <p className="text-sm text-gray-400 font-mono mt-1">
          {job.expression} → {job.method} {job.url}
        </p>
      </div>

      <h2 className="text-lg font-semibold mb-4">
        Execution Logs{" "}
        <span className="text-gray-500 text-sm font-normal">(last 100)</span>
      </h2>

      {logs.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-700 rounded-xl">
          <p className="text-gray-500">No executions yet. Wait for the next scheduled run.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <details
              key={log.id}
              className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
            >
              <summary className="px-5 py-3 cursor-pointer hover:bg-gray-800/50 flex items-center gap-3 text-sm">
                <span className={statusColor[log.status] || "text-gray-400"}>
                  {statusIcon[log.status] || "?"}
                </span>
                <span className="font-mono text-gray-400 text-xs">
                  {new Date(log.started_at + "Z").toLocaleString()}
                </span>
                {log.status_code && (
                  <span className="font-mono text-xs text-gray-500">
                    [{log.status_code}]
                  </span>
                )}
                <span className="capitalize text-gray-300">{log.status}</span>
                {log.finished_at && (
                  <span className="text-xs text-gray-600 ml-auto">
                    {((new Date(log.finished_at + "Z") - new Date(log.started_at + "Z")) / 1000).toFixed(2)}s
                  </span>
                )}
              </summary>
              <div className="px-5 pb-4 text-sm">
                {log.output && (
                  <div>
                    <span className="text-gray-500 text-xs font-medium">Output</span>
                    <pre className="mt-1 p-3 bg-gray-950 rounded-lg text-gray-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                      {log.output}
                    </pre>
                  </div>
                )}
                {log.error && (
                  <div className="mt-3">
                    <span className="text-red-400 text-xs font-medium">Error</span>
                    <pre className="mt-1 p-3 bg-red-950/50 rounded-lg text-red-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                      {log.error}
                    </pre>
                  </div>
                )}
                {!log.output && !log.error && (
                  <p className="text-gray-600 italic">No output captured.</p>
                )}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
