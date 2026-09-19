import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    if (clean(body.website)) return NextResponse.json({ ok: true, message: "Thanks." });

    const formType = body.formType === "contact" ? "contact" : "demo";
    const name = clean(body.name, 120);
    const organization = clean(body.organization, 160);
    const email = clean(body.email, 180);
    const message = clean(body.message, 2000);

    if (!name || !organization || !email || !emailPattern.test(email)) {
      return NextResponse.json({ ok: false, message: "Please complete the required fields with a valid email address." }, { status: 400 });
    }
    if (!message && formType === "contact") {
      return NextResponse.json({ ok: false, message: "Please add a message." }, { status: 400 });
    }
    if (formType === "demo" && (!clean(body.propertyName, 160) || !clean(body.propertyType, 80) || !clean(body.rooms, 20) || !clean(body.phone, 80))) {
      return NextResponse.json({ ok: false, message: "Please complete the required property and contact details." }, { status: 400 });
    }

    const endpoint = process.env.LEAD_ENDPOINT?.trim();
    if (!endpoint) {
      return NextResponse.json({ ok: false, message: "The contact workflow is not connected yet. Please configure LEAD_ENDPOINT before accepting submissions." }, { status: 503 });
    }

    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        formType,
        submittedAt: new Date().toISOString(),
        name,
        organization,
        propertyName: clean(body.propertyName, 160),
        propertyType: clean(body.propertyType, 80),
        rooms: clean(body.rooms, 20),
        email,
        phone: clean(body.phone, 80),
        subject: clean(body.subject, 180),
        message,
      }),
      cache: "no-store",
    });

    if (!upstream.ok) return NextResponse.json({ ok: false, message: "The contact service could not accept the request. Please try again later." }, { status: 502 });
    return NextResponse.json({ ok: true, message: formType === "demo" ? "Your demo request has been submitted through the configured contact workflow." : "Your message has been submitted through the configured contact workflow." });
  } catch {
    return NextResponse.json({ ok: false, message: "We could not process the request. Please try again." }, { status: 400 });
  }
}
