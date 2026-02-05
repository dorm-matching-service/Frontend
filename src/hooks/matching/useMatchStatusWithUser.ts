"use client";

import { useEffect, useState } from "react";
import { fetchMatchStatusWithUser } from "@src/apis/matching";

import { MatchStatusResponse } from "@src/types/matching";


export default function useMatchStatusWithUser(opponentId: string) {
  const [status, setStatus] = useState<MatchStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!opponentId) console.log("상대 ID없음");

    let mounted = true;

    const fetch = async () => {
      try {
        setLoading(true);
        const data = await fetchMatchStatusWithUser(opponentId);
        if (mounted) setStatus(data);
      } catch (e) {
        if (mounted) setError(e as Error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetch();
    return () => {
      mounted = false;
    };
  }, [opponentId]);

  return {
    status,
    loading,
    error,
  };
}
