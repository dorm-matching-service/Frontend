// src/apis/user.ts
import { getAccessToken } from "@/lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function updatePrivacyConsent(version: number) {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API_BASE_URL}/users/consent/privacy`, {
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

export async function fetchMe() {
  const token = getAccessToken();

  if (!token) return null;

  const res = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    console.log("토큰 만료 혹은 인증 실패");
    return null;
  }
  
  const data = await res.json();

  if (!data.ok) return null;

  return data.user;
}
