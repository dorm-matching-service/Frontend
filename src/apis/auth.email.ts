const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function sendEmail(email: string) {
  const res = await fetch(`${API_BASE_URL}/auth/email/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  const data = await res.json()
  if (!res.ok || !data?.ok) {
    throw new Error(data?.message || data?.error || '이메일 전송 실패')
  }

  return data.message || '인증 코드가 이메일로 전송됐어요.'
}


export async function verifyEmail({
  email,
  code,
  name,
}: {
  email: string
  code: string
  name: string
}) {
  const res = await fetch(`${API_BASE_URL}/auth/email/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code, name }),
  })

  const data = await res.json()
  if (!res.ok || !data?.ok) {
    throw new Error(data?.message || data?.error || '인증 실패')
  }


  return data.message || '로그인 성공!'
}
