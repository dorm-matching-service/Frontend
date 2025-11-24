const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function sendEmail(email: string) {
  const res = await fetch(`${API_BASE_URL}/auth/email/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok || !data?.ok) {
    throw new Error(data?.message || data?.error || "이메일 전송 실패");
  }

  return {
    ok: data.ok,
    message: data.message,
    expiresAt: data.expiresAt,
  };
}

export async function verifyEmail({
  email,
  code,
}: {
  email: string;
  code: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/email/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  const data = await res.json();
  if (!res.ok || !data?.ok) {
    throw new Error(data?.message || data?.error || "인증 실패");
  }

  return data;
}
