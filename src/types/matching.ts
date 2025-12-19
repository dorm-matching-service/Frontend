// 프론트 - 매칭 카드 1개
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
