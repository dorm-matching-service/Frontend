"use client";



import { usePastMatchingCount } from "./usePastMatchingCount";
import { useMyLikeCount } from "./useMyLikeCount";

export function useMyPageData() {
  const pastMatching = usePastMatchingCount();
  const likeCount = useMyLikeCount();

  // 하나라도 로딩 중이면 전체 로딩
  const loading =
    pastMatching.loading ||
    likeCount.loading;

  // 하나라도 에러면 전체 에러
  const error =
    pastMatching.error ||
    likeCount.error;

  return {
    loading,
    error,

    pastMatchingCount: pastMatching.count,
    likeCount: likeCount.count,
  };
}
