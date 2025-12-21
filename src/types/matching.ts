export type MatchingMode = "normal" | "relaxed";

// 프론트 - 매칭 카드
export interface MatchingCardItem {
  matchingScore: number;
  major: string;
  age: number;
  wakeTime: string;
  sleepTime: string;
  tags: string[];
}

// 매칭 API 응답
export interface MatchingResponse {
  count: number;
  results: MatchingCardItem[];
}

// 매칭 조회 결과
export interface MatchingStatusResponse extends MatchingResponse {
  hasResult: boolean;
}