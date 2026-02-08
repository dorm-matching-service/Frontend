"use client";

import { useEffect, useState } from "react";
import {
  fetchReceivedRoommateRequests,
  acceptRoommateRequest,
  rejectRoommateRequest,
} from "@src/apis/matching";

import type { ReceivedRoommateRequestsResponse } from "@src/types/matching";

export function useReceivedRoommateRequests() {
  const [requests, setRequests] =
    useState<ReceivedRoommateRequestsResponse["requests"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await fetchReceivedRoommateRequests();
      setRequests(data.requests);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "룸메 요청 조회 실패",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  /** 수락 */
  const accept = async (matchId: string) => {
    await acceptRoommateRequest(matchId);

    // optimistic update
    setRequests((prev) =>
      prev.filter((r) => r.matchId !== matchId),
    );
  };

  /** 거절 */
  const reject = async (matchId: string) => {
    await rejectRoommateRequest(matchId);

    // optimistic update
    setRequests((prev) =>
      prev.filter((r) => r.matchId !== matchId),
    );
  };

  return {
    requests,
    loading,
    error,

    refetch: fetchRequests,
    accept,
    reject,
  };
}
