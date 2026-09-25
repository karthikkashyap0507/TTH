import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { store } from "@/lib/store";
import { statusKeys, type ApplicationStatus } from "@/content/careers";
import { cleanMultiline } from "@/lib/validate";

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const { id } = await ctx.params;
  const body = (await req.json().catch(() => ({}))) as { status?: string; adminNote?: string };

  const patch: { status?: ApplicationStatus; adminNote?: string } = {};
  if (body.status !== undefined) {
    if (!statusKeys.includes(body.status as ApplicationStatus)) {
      return NextResponse.json({ error: "Unknown status." }, { status: 400 });
    }
    patch.status = body.status as ApplicationStatus;
  }
  if (body.adminNote !== undefined) patch.adminNote = cleanMultiline(body.adminNote, 2000);

  const updated = await store().updateApplication(id, patch);
  if (!updated) return NextResponse.json({ error: "Application not found." }, { status: 404 });
  return NextResponse.json({ ok: true, application: updated });
}
