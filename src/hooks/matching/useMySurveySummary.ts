"use client";

import { useEffect, useState } from "react";
import { fetchMySurveySummary } from "@src/apis/checklist";
import type { MySurveySummaryResponse } from "@src/apis/checklist";

export function useMySurveySummary() {
  const [summary, setSummary] = useState<MySurveySummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await fetchMySurveySummary();
        setSummary(res);
        setError(null);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return { summary, loading, error };
}