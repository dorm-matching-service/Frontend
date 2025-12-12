// src/apis/user.ts

export async function updatePrivacyConsent(version: number) {
  const token = localStorage.getItem("access_token"); 

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/consent/privacy`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ version }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "개인정보 동의 실패");
  }

  return res.json(); // { message, user }
}
