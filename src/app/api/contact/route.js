/**
 * Receives multi-step contact wizard submissions from the website.
 * In production, persists to DB or forwards to studio inbox / CRM.
 * For now, validates and returns success so the UI flow is verifiable.
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const required = ["projectType", "name", "email", "phone"];
    const missing = required.filter((k) => !body?.[k]);
    if (missing.length) {
      return Response.json(
        { ok: false, error: `Missing fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(body.email)) {
      return Response.json(
        { ok: false, error: "Invalid email" },
        { status: 400 },
      );
    }

    // TODO: persist to DB / email studio
    console.log("[contact] new enquiry", {
      type: body.projectType,
      name: body.name,
      location: body.spaceLocation,
      sqft: body.sqft,
      budget: body.budget,
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[contact] error", e);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
