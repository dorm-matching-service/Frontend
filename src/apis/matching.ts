import { fetchWithAuth } from "lib/fetchWithAuth";
import type { MatchingResponse } from "../types/matching";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchMatchingResult(): Promise<MatchingResponse> {
  const res = await fetchWithAuth(`${API_BASE_URL}/matching`, {
    method: "GET",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "매칭 요청 실패");
  }

  return res.json();
}
