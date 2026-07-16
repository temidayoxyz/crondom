const INNGEST_EVENT_KEY = import.meta.env.VITE_INNGEST_EVENT_KEY;
const INNGEST_API = "https://api.inngest.com/v1/events";

export async function registerInngestJob(jobData) {
  if (!INNGEST_EVENT_KEY) {
    console.warn("VITE_INNGEST_EVENT_KEY not set — skipping Inngest registration");
    return;
  }

  const response = await fetch(INNGEST_API, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${INNGEST_EVENT_KEY}`,
    },
    body: JSON.stringify([
      {
        name: "job/execute",
        data: {
          jobId: jobData.jobId,
          url: jobData.url,
          method: jobData.method || "GET",
          headers: JSON.parse(jobData.headers || "{}"),
          body: jobData.body || "",
          expression: jobData.expression,
        },
        user: { id: jobData.user_id },
      },
    ]),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Inngest error: ${text}`);
  }
}
