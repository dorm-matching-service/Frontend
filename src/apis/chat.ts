import { fetchWithAuth } from "lib/fetchWithAuth";

import { API_BASE_URL } from "@src/config/env";

/* =========================
   채팅방 생성
========================= */
export async function createChatRoom(
  opponentId: string,
): Promise<{ roomId: string }> {
  const res = await fetchWithAuth(
    `${API_BASE_URL}/chat/rooms`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ opponentId }),
    },
  );

  const data = await res.json();

  if (!res.ok || !data?.roomId) {
    throw new Error(data?.message || "채팅방 생성 실패");
  }

  return { roomId: data.roomId };
}

/* =========================
   채팅 메시지 목록 조회
========================= */
export async function fetchChatMessages(
  roomId: string,
  cursor?: string,
) {
  const query = cursor ? `?cursor=${cursor}` : "";

  const res = await fetchWithAuth(
    `${API_BASE_URL}/chat/rooms/${roomId}/messages${query}`,
    {
      method: "GET",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "메시지 조회 실패");
  }

  return data;
}

/* =========================
   메시지 전송
========================= */
export async function sendChatMessage({
  roomId,
  content,
}: {
  roomId: string;
  content: string;
}) {
  const res = await fetchWithAuth(
    `${API_BASE_URL}/chat/messages/${roomId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, content }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "메시지 전송 실패");
  }

  return data;
}

/* =========================
   읽음 처리
========================= */
export async function readChatRoom({
  roomId,
  lastMessageId,
}: {
  roomId: string;
  lastMessageId: string;
}) {
  const res = await fetchWithAuth(
    `${API_BASE_URL}/chat/rooms/${roomId}/read`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lastMessageId }),
    },
  );

  const data = await res.json();

  if (!res.ok || !data?.ok) {
    throw new Error(data?.message || "읽음 처리 실패");
  }

  return data;
}
