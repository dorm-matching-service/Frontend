// src/apis/user.ts
import { fetchWithAuth } from "lib/fetchWithAuth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function updatePrivacyConsent(version: number) {
  const res = await fetchWithAuth(`${API_BASE_URL}/users/consent/privacy`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ version }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "개인정보 동의 실패");
  }

  return res.json(); // { message, user }
}


/* 로그인 유저 정보 조회 (me) */
export async function fetchMe() {
  try {
    const res = await fetchWithAuth(`${API_BASE_URL}/users/me`);

    if (!res.ok) return null;

    const data = await res.json();

    // 백엔드에서 { email } 형태로 내려주므로 그대로 반환
    return data ?? null;
  } catch {
    // fetchWithAuth에서 401이면 이미 처리됨
    return null;
  }
}
