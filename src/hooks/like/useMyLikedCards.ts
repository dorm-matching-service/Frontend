import { useEffect, useState } from "react";
import { getMyLikedCards } from "@src/apis/like";
import type { MyLikedCard } from "@src/apis/like";

export function useMyLikedCards() {
  const [cards, setCards] = useState<MyLikedCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const res = await getMyLikedCards();
      setCards(res);
      setError(null);
    } catch (err) {
      console.error("찜한 유저 카드 조회 실패", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // 최초 1회 조회
  useEffect(() => {
    fetchCards();
  }, []);

  return {
    cards,
    loading,
    error,
    refetch: fetchCards, // 서버 기준으로 다시 동기화
    setCards, // optimistic update 용도
  };
}
