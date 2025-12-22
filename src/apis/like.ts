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
