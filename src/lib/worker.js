const WORKER_URL = import.meta.env.VITE_WORKER_URL;

export async function createJob(jobData) {
  if (!WORKER_URL) {
    throw new Error("VITE_WORKER_URL is not set");
  }

  const res = await fetch(`${WORKER_URL}/api/jobs`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(jobData),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to create job");
  }

  return res.json();
}

export async function deleteJobViaWorker(jobId) {
  if (!WORKER_URL) return;

  await fetch(`${WORKER_URL}/api/jobs/${jobId}`, {
    method: "DELETE",
  });
}
