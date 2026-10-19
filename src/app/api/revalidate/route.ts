import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { PROJECTS_TAG } from "@/lib/github";

/**
 * GitHub webhook target. Add it to each project repo (push events, JSON payload)
 * with the same secret as REVALIDATE_SECRET. A valid push marks project data stale,
 * so the next visit rebuilds it from the repos' latest site.json.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return Response.json({ error: "REVALIDATE_SECRET is not set" }, { status: 500 });

  const body = await request.text();
  const signature = request.headers.get("x-hub-signature-256") ?? "";
  const expected = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  // GitHub sends a ping when the webhook is first added; acknowledge it.
  if (request.headers.get("x-github-event") === "ping") return Response.json({ ok: true, pong: true });

  revalidateTag(PROJECTS_TAG, "max");
  return Response.json({ ok: true, revalidated: PROJECTS_TAG });
}
