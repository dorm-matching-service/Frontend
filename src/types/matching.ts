// 매칭 결과 1건
export interface RoommateMatch {
  id: string;
  requesterId: string;
  candidateId: string;

  baseScore: number;
  finalScore: number;

  createdAt: string; // ISO string
}

// 매칭 API 전체 응답
export interface MatchingResponse {
  count: number;
  results: RoommateMatch[];
}
