const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchMe() {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    credentials: "include",
  });
  return res.json();
}