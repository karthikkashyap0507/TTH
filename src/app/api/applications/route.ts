import { NextResponse } from "next/server";
import { makeId, store, type Application } from "@/lib/store";
import { notify } from "@/lib/notify";
import { availabilityOptions, experienceLevels, getRole } from "@/content/careers";
import {
  clean,
  cleanMultiline,
  clientKey,
  isEmail,
  isPhone,
  normaliseUrl,
  rateLimited,
  stringArray,
} from "@/lib/validate";

export async function POST(req: Request) {
  if (rateLimited(`apply:${clientKey(req)}`, 4)) {
    return NextResponse.json({ error: "Too many submissions — please try again in a minute." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(body.company)) return NextResponse.json({ ok: true, id: makeId() }); // honeypot

  const role = getRole(clean(body.role, 80));
  if (!role) return NextResponse.json({ error: "That role isn't open any more." }, { status: 400 });

  const errors: Record<string, string> = {};
  const name = clean(body.name, 80);
  const email = clean(body.email, 120).toLowerCase();
  const phone = clean(body.phone, 30);
  const city = clean(body.city, 80);
  const profileUrl = normaliseUrl(clean(body.profileUrl, 300));
  const skills = stringArray(body.skills, role.skills);
  const experience = clean(body.experience, 40);
  const projectUrl = normaliseUrl(clean(body.projectUrl, 300));
  const secondRaw = clean(body.secondProjectUrl, 300);
  const secondProjectUrl = normaliseUrl(secondRaw);
  const projectNote = cleanMultiline(body.projectNote, 1500);
  const videoUrl = normaliseUrl(clean(body.videoUrl, 300));
  const why = cleanMultiline(body.why, 1500);
  const availability = clean(body.availability, 40);

  if (name.length < 2) errors.name = "Please add your full name.";
  if (!isEmail(email)) errors.email = "Enter a valid email.";
  if (!isPhone(phone)) errors.phone = "Enter a valid WhatsApp number.";
  if (city.length < 2) errors.city = "Which city are you in?";
  if (!profileUrl) errors.profileUrl = "Add a working link (portfolio, LinkedIn, GitHub…).";
  if (!skills.length) errors.skills = "Pick at least one skill.";
  if (!experienceLevels.includes(experience)) errors.experience = "Pick your experience level.";
  if (!projectUrl) errors.projectUrl = "Add a link to your best work.";
  if (secondRaw && !secondProjectUrl) errors.secondProjectUrl = "That link doesn't look right.";
  if (projectNote.length < 20) errors.projectNote = "Tell us a little more (20+ characters).";
  if (!videoUrl) errors.videoUrl = "Add a link to your intro video.";
  if (!availabilityOptions.includes(availability)) errors.availability = "When could you start?";

  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fields: errors }, { status: 400 });
  }

  const now = new Date().toISOString();
  const app: Application = {
    id: makeId(),
    createdAt: now,
    updatedAt: now,
    status: "received",
    role: role.slug,
    roleTitle: role.title,
    name,
    email,
    phone,
    city,
    profileUrl,
    skills,
    experience,
    projectUrl,
    secondProjectUrl: secondProjectUrl || undefined,
    projectNote,
    videoUrl,
    why: why || undefined,
    availability,
  };

  try {
    await store().addApplication(app);
  } catch (err) {
    console.error("[applications] could not save:", err);
    return NextResponse.json({ error: "We couldn't save your application just now. Please try again." }, { status: 500 });
  }

  await notify(
    "application",
    `🧑‍💻 New application ${app.id} — ${app.roleTitle}\n• ${app.name} (${app.city}) · ${app.experience}\n• ${app.email} · ${app.phone}\n• Work: ${app.projectUrl}\n• Video: ${app.videoUrl}`,
    app,
  );

  return NextResponse.json({ ok: true, id: app.id });
}
