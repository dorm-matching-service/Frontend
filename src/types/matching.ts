export type MatchingMode = "normal" | "relaxed";

// 프론트 - 매칭 카드
export interface MatchingCardItem {
  userId: string;
  isLiked: boolean;

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

// 지난 매칭 조회 결과
export interface PastMatchingCard {
  userId: string;
  isLiked: boolean;
  major: string;
  age: number;
  wakeTime: string;
  sleepTime: string;
  tags: string[];
}


export interface PastMatchingHistoryResponse {
  count: number;
  results: PastMatchingCard[];
}

export interface PastMatchingCountResponse {
  count: number;
}


export interface MatchStatusResponse {
  matchStatus: "PENDING" | "MATCHED" | "REJECTED" | null;
  hasRequested: boolean;
  canRespond: boolean;
  canRequest: boolean;
  hasChatRoom: boolean; 
  chatRoomId: string | null;
}


/* ===== 받은 룸메 요청 목록 ===== */
export interface ReceivedRoommateRequestsResponse {
  count: number;
  requests: {
    matchId: string;
    createdAt: string;
    requester: {
      userId: string;
      age: number | null;
      department: string;
      tags: string[];
    };
  }[];
}

/* ===== 수락 / 거절 공통 응답 ===== */
export interface RoommateRequestActionResponse {
  success: boolean;
  message: string;
}