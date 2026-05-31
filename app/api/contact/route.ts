const WINDOW_MS = 60_000;
const MAX_MESSAGE_LENGTH = 2_000;

const recentSubmissions = new Map<string, number>();

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}

function clean(value: unknown, maxLength = 200) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function clientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwardedFor?.split(",")[0]?.trim() || realIp || "local";
}

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const name = clean(payload.name, 100);
  const email = clean(payload.email, 160).toLowerCase();
  const subject = clean(payload.subject, 160) || "New message from portfolio";
  const message = clean(payload.message, MAX_MESSAGE_LENGTH);

  if (name.length < 2) {
    return jsonError("Name must be at least 2 characters.", 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError("Please enter a valid email address.", 400);
  }

  if (message.length < 10) {
    return jsonError("Message must be at least 10 characters.", 400);
  }

  const now = Date.now();
  const key = clientKey(request);
  const lastSubmission = recentSubmissions.get(key);

  if (lastSubmission && now - lastSubmission < WINDOW_MS) {
    const remaining = Math.ceil((WINDOW_MS - (now - lastSubmission)) / 1000);
    return jsonError(`Please wait ${remaining}s before sending another message.`, 429);
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "chandanua56@gmail.com";

  if (!serviceId || !templateId || !publicKey) {
    return jsonError("Contact service is not configured yet.", 503);
  }

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        title: subject,
        name,
        email,
        message,
        to_email: toEmail,
      },
    }),
  });

  if (!response.ok) {
    return jsonError("Something went wrong. Try emailing me directly.", 502);
  }

  recentSubmissions.set(key, now);

  for (const [ip, timestamp] of recentSubmissions) {
    if (now - timestamp > WINDOW_MS) recentSubmissions.delete(ip);
  }

  return Response.json({ ok: true });
}
