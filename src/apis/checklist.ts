// src/apis/checklist.ts
import { fetchWithAuth } from "lib/fetchWithAuth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import { LifestyleSurvey } from "@/types/LifestyleSurvey";

/**
 * 백엔드 응답과 동일한 형태
 * {
 *   exists: boolean;
 *   survey: LifestyleSurvey | null;
 * }
 */

export interface MySurveyResponse {
  exists: boolean;
  survey: LifestyleSurvey | null;
}

export interface PatchSurveyResponse {
  success: boolean;
  survey: LifestyleSurvey;
}

export interface UserWholeSurveyResponse {
  exists: boolean;
  survey: LifestyleSurvey | null;
  isLiked: boolean;
}

export async function fetchChecklistStatus(): Promise<MySurveyResponse> {
  const res = await fetchWithAuth(`${API_BASE_URL}/lifestyle-survey/me`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("체크리스트 조회 실패");
  }

  return res.json();
}

/**
 * 유저 라이프스타일 설문 부분 수정
 */
export async function patchMySurvey(
  data: Partial<LifestyleSurvey>,
): Promise<PatchSurveyResponse> {
  const res = await fetchWithAuth(`${API_BASE_URL}/lifestyle-survey`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("체크리스트 수정 실패");
  }

  return res.json();
}

export interface MySurveySummaryResponse {
  exists: boolean;
  survey: {
    age: number | null;
    department: string | null;
    wakeTime: string | null;
    sleepTime: string | null;
    tags: string[];
  } | null;
}
/* ===== 유저 설문 요약 조회 ===== */
export async function fetchMySurveySummary(): Promise<MySurveySummaryResponse> {
  const res = await fetchWithAuth(
    `${API_BASE_URL}/lifestyle-survey/me/summary`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("설문 요약 조회 실패");
  }

  return res.json();
}

/* ===== 유저 설문 전체 조회 ===== */
export async function fetchUserSurvey(
  targetUserId: string,
): Promise<UserWholeSurveyResponse> {
  const res = await fetchWithAuth(
    `${API_BASE_URL}/lifestyle-survey/profile/${targetUserId}/survey`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("유저 설문 조회 실패");
  }

  return res.json();
}
