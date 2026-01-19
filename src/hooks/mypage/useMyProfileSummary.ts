"use client";

import { useMySurveySummary } from "./useMySurveySummary";

export function useMyProfileSummary() {
  const { loading, error, summary } = useMySurveySummary();

  return {
    loading,
    error,
    summary,
  };
}
