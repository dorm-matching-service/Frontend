import { fetchWithAuth } from "lib/fetchWithAuth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 토글 좋아요 타입
export interface ToggleLikeResponse {
  liked: boolean;
}

// 내가 좋아요한 개수 조회 타입
export interface MyLikeCountResponse {
  count: number;
}

// 내가 찜한 유저 카드 타입
//나중에 TanStack Query, pagination, { cards: MyLikedCard[] } 구조로 바꿀 때를 위한 변경 범위 최소화
export interface MyLikedCard {
  targetUserId: string;
  isLiked: boolean;

  major: string;
  age: number;
  wakeTime: string;
  sleepTime: string;
  tags: string[];
}

// 내가 찜한 유저 카드 목록 응답 타입
export type MyLikedCardsResponse = MyLikedCard[];

/* ===== 좋아요 토글 ===== */
export async function toggleLike(
  toUserId: string
): Promise<ToggleLikeResponse> {
  const res = await fetchWithAuth(`${API_BASE_URL}/likes/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ toUserId }),
  });

  if (!res.ok) {
    throw new Error("좋아요 처리에 실패했습니다.");
  }

  return res.json();
}

/* ===== 내가 좋아요한 개수 조회 ===== */
export async function getMyLikeCount(): Promise<MyLikeCountResponse> {
  const res = await fetchWithAuth(`${API_BASE_URL}/likes/me/count`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("좋아요 개수 조회 실패");
  }

  return res.json();
}

/* ===== 내가 찜한 유저 카드 목록 조회 ===== */
export async function getMyLikedCards(): Promise<MyLikedCardsResponse> {
  const res = await fetchWithAuth(`${API_BASE_URL}/likes/cards`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("찜한 유저 카드 조회 실패");
  }

  return res.json();
}
