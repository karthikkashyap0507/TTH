import "server-only";

/**
 * Optional instant alerts. Set NOTIFY_WEBHOOK_URL to a Slack / Discord /
 * Google Chat incoming-webhook, or a Zapier / Make / n8n catch hook, and
 * every new project enquiry (lead) is POSTed there.
 * Sends `text` (Slack/Google Chat) and `content` (Discord) plus raw `data`.
 */
export async function notify(kind: "lead", text: string, data: unknown) {
  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, text, content: text, data }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error("[notify] webhook failed:", err);
  }
}
