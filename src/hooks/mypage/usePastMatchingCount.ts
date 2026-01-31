"use client";


import { useEffect, useState } from "react";
import { fetchPastMatchingCount } from "@src/apis/matching";

export function usePastMatchingCount() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);
        const res = await fetchPastMatchingCount();
        setCount(res.count);
        setError(null);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  return { count, loading, error };
}