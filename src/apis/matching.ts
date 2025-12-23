import { fetchWithAuth } from "lib/fetchWithAuth";

import type {
  MatchingResponse,
  MatchingMode,
  MatchingStatusResponse,
  PastMatchingHistoryResponse,
} from "../types/matching";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// relaxed를 옵셔널 파라매터 mode에 넣은 이유는
//매칭 결과가 없을 때 뜨는 페이지에서 재 매칭을 눌렀을 때 기존 컷 70 에서 60으로 내려서 재매칭하기 위함
// MatchingMode normal => 컷 70 , relexed => 컷 60

export async function fetchMatchingResult(
  mode: MatchingMode = "normal"
): Promise<MatchingResponse> {
  // URL은 표준 Web API 객체이고 그 안에 있는 것이 URLSearchParams 라는 표준 객체이다
  // 쿼리스트링을 안전하게 다루기 위해 URLSearchParams 사용
  const url = new URL(`${API_BASE_URL}/matching`);

  if (mode) {
    url.searchParams.set("mode", mode);
  }

  // fetch에서 string으로 바꿔주긴하지만 암묵적 변환에 기대지 않고
  // URL 타입을 문자열 string을 변환하여 명시적으로 타입을 맞추어서 fetch에 넘겨줌
  const res = await fetchWithAuth(url.toString(), {
    method: "GET",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "매칭 요청 실패");
  }

  return res.json();
}

export async function fetchMatchingStatus(): Promise<MatchingStatusResponse> {
  const url = new URL(`${API_BASE_URL}/matching/status`);

  const res = await fetchWithAuth(url.toString(), {
    method: "GET",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "매칭 결과 조회 실패");
  }

  return res.json();
}

/*
 * 과거 매칭 기록 조회
 * - 최근 batch 제외
 * - REJECTED 제외
 */
export async function fetchPastMatchingHistory(): Promise<PastMatchingHistoryResponse> {
  const url = new URL(`${API_BASE_URL}/matching/history`);

  const res = await fetchWithAuth(url.toString(), {
    method: "GET",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "과거 매칭 기록 조회 실패");
  }

  return res.json();
}
