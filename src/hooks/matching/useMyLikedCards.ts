"use client";

import { useEffect, useState } from "react";
import { getMyLikedCards } from "@src/apis/like";
import type { MyLikedCard } from "@src/apis/like";

export function useMyLikedCards() {
  const [cards, setCards] = useState<MyLikedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const res = await getMyLikedCards();
        setCards(res);
        setError(null);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return { cards, loading, error };
}