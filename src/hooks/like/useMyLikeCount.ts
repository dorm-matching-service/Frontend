import { useEffect, useState } from "react";
import { getMyLikeCount } from "@src/apis/like";

export function useMyLikeCount() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCount = async () => {
    try {
      setLoading(true);
      const res = await getMyLikeCount();
      setCount(res.count);
      setError(null);
    } catch (err) {
      console.error("좋아요 개수 조회 실패", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // 최초 1회 조회
  useEffect(() => {
    fetchCount();
  }, []);

  return {
    count,
    loading,
    error,
    refetch: fetchCount, // 서버 기준으로 다시 맞추고 싶을 때를 위함
    setCount,            // 서버 응답 기다리지 않고 토글 즉시 반영 위한 값
    
  };
}
