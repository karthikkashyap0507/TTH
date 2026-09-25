import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { getStatus } from "@/content/careers";
import { clean, clientKey, rateLimited } from "@/lib/validate";

/** Look up an application by ID + the email it was submitted with. */
export async function POST(req: Request) {
  if (rateLimited(`status:${clientKey(req)}`, 12)) {
    return NextResponse.json({ error: "Too many lookups — please wait a minute." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const id = clean(body.id, 20).toUpperCase();
  const email = clean(body.email, 120).toLowerCase();
  if (!id || !email) return NextResponse.json({ error: "Enter your application ID and email." }, { status: 400 });

  const app = await store().getApplication(id);
  // Same message for "no such ID" and "wrong email" so IDs can't be probed
  if (!app || app.email.toLowerCase() !== email) {
    return NextResponse.json({ error: "We couldn't find an application with that ID and email." }, { status: 404 });
  }

  const status = getStatus(app.status);
  return NextResponse.json({
    id: app.id,
    name: app.name.split(" ")[0],
    roleTitle: app.roleTitle,
    status: app.status,
    statusLabel: status.label,
    statusBody: status.body,
    createdAt: app.createdAt,
    updatedAt: app.updatedAt,
  });
}
