"use client";

import { useEffect, useState } from "react";

import { fetchPastMatchingHistory } from "@src/apis/matching";
import type { PastMatchingCard } from "@src/types/matching";

export function usePastMatchingHistory() {
  const [cards, setCards] = useState<PastMatchingCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await fetchPastMatchingHistory();

        setCards(res.results);
        setError(null);
      } catch (err) {
        console.error("과거 매칭 기록 조회 실패", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return {
    cards,
    setCards,
    loading,
    error,
  };
}
