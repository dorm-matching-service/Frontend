"use client";

import { useEffect, useState } from "react";


import { fetchMyChatRooms } from "@src/apis/chat";
import type { ChatRoomListItem } from "@src/types/chat";

export default function useMyChatRooms() {
  const [rooms, setRooms] = useState<ChatRoomListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchMyChatRooms();

      setRooms(data.rooms);
    } catch (err) {
      setError("채팅방 목록 불러오기 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    loading,
    error,
    refetch: fetchRooms,
  };
}
