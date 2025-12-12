const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import { getAccessToken } from "@/lib/auth";

export interface ChecklistStatusResponse {
  hasChecklist: boolean;
}

export async function fetchChecklistStatus(): Promise<ChecklistStatusResponse> {
  const token = getAccessToken();

  if (!token) {
    throw new Error("인증 토큰이 없습니다.");
  }

  const res = await fetch(`${API_BASE_URL}/lifestyle-survey/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("체크리스트 상태 조회 실패");
  }

  return res.json();
}
