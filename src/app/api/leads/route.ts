import { NextResponse } from "next/server";
import { makeId, store, type Lead } from "@/lib/store";
import { notify } from "@/lib/notify";
import { clean, cleanMultiline, clientKey, isEmail, isPhone, rateLimited } from "@/lib/validate";
import { wizard } from "@/content/wizard";

const allowed = Object.fromEntries(wizard.steps.map((s) => [s.key, s.options.map((o) => o.value)]));

export async function POST(req: Request) {
  if (rateLimited(`lead:${clientKey(req)}`, 5)) {
    return NextResponse.json({ error: "Too many requests — please try again in a minute." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend it worked.
  if (clean(body.website)) return NextResponse.json({ ok: true, id: makeId("LEAD") });

  const service = clean(body.service, 80);
  const budget = clean(body.budget, 80);
  const name = clean(body.name, 80);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 120);
  const note = cleanMultiline(body.note, 1500);
  const source = clean(body.source, 40);

  if (!allowed.service?.includes(service)) return NextResponse.json({ error: "Pick what we're building." }, { status: 400 });
  if (!allowed.budget?.includes(budget)) return NextResponse.json({ error: "Pick a budget range." }, { status: 400 });
  if (name.length < 2) return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  if (!isPhone(phone)) return NextResponse.json({ error: "That WhatsApp number doesn't look right." }, { status: 400 });
  if (email && !isEmail(email)) return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });

  const lead: Lead = {
    id: makeId("LEAD"),
    createdAt: new Date().toISOString(),
    service,
    budget,
    name,
    phone,
    email: email || undefined,
    note: note || undefined,
    source: source || undefined,
  };

  try {
    await store().addLead(lead);
  } catch (err) {
    console.error("[leads] could not save lead:", err);
    return NextResponse.json({ error: "We couldn't save that just now." }, { status: 500 });
  }

  await notify(
    "lead",
    `🏠 New project enquiry — ${lead.name} (${lead.phone})\n• ${lead.service}\n• ${lead.budget}${lead.email ? `\n• ${lead.email}` : ""}${lead.note ? `\n• “${lead.note}”` : ""}`,
    lead,
  );

  return NextResponse.json({ ok: true, id: lead.id });
}
