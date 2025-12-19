// src/apis/user.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function updatePrivacyConsent(version: number) {
  const res = await fetchWithAuth(
    `${API_BASE_URL}/users/consent/privacy`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ version }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "개인정보 동의 실패");
  }

  return res.json(); // { message, user }
}

import { fetchWithAuth } from "lib/fetchWithAuth";

export async function fetchMe() {
  try {
    const res = await fetchWithAuth(`${API_BASE_URL}/users/me`);

    if (!res.ok) return null;

    const data = await res.json();

    return data.user ?? null;

  } catch {
    // fetchWithAuth에서 401이면 이미 처리됨
    return null;
  }
}
