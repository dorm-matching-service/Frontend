// src/lib/fetchWithAuth.ts
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("access_token");

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,

    // fetch 레벨 캐시 차단
    cache: "no-store",

    headers,
  });

  if (res.status === 401) {
    localStorage.removeItem("access_token");
    window.location.href = "/google";
    throw new Error("인증 만료");
  }

  return res;
}
