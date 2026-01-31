"use client";

import { useEffect, useState } from "react";
import { fetchUserSurvey } from "@src/apis/checklist";
import type { LifestyleSurvey } from "@src/types/LifestyleSurvey";

export function useUserWholeSurvey(userId: string) {
  const [survey, setSurvey] = useState<LifestyleSurvey | null>(null);
  const [exists, setExists] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchUserSurvey(userId);
        setExists(res.exists);
        setSurvey(res.survey);
        setIsLiked(res.isLiked);
      } catch (err) {
        console.error("유저 설문 조회 실패", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [userId]);

  return {
    exists,
    survey,
    isLiked,
    loading,
    error,
  };
}
