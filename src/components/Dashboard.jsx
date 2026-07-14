import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { turso } from "../lib/turso.js";

export default function Dashboard() {
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function loadJobs() {
    if (!user) return;
    setLoading(true);
    turso
      .execute({
        sql: "SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY created_at DESC",
        args: [user.id],
      })
      .then((res) => setJobs(res.rows))
      .catch((err) => setError(err.message))
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
      alert("Failed to toggle job: " + err.message);
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
      alert("Failed to delete job: " + err.message);
    }
  }

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-400">Error: {error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          to="/new"
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-sm font-medium transition-colors"
        >
          + New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-gray-700 rounded-xl">
          <p className="text-gray-500 mb-2">No cron jobs yet</p>
          <Link to="/new" className="text-orange-400 hover:text-orange-300">
            Create your first job →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center gap-4"
            >
              {/* Status dot */}
              <button
                onClick={() => toggleJob(job)}
                className={`w-3 h-3 rounded-full shrink-0 transition-colors ${
                  job.enabled ? "bg-green-500" : "bg-gray-600"
                }`}
                title={job.enabled ? "Running — click to pause" : "Paused — click to resume"}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{job.name}</div>
                <div className="text-sm text-gray-400 font-mono truncate">
                  {job.expression}{" "}
                  <span className="text-gray-600">→</span>{" "}
                  {job.method} {job.url}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <Link
                  to={`/logs/${job.id}`}
                  className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                >
                  Logs
                </Link>
                <Link
                  to={`/edit/${job.id}`}
                  className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteJob(job.id)}
                  className="px-3 py-1.5 text-sm bg-red-900/50 hover:bg-red-800 rounded-md transition-colors text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
