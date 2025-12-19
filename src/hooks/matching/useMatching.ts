import { useEffect, useState } from "react";
import { fetchMatchingResult } from "@/apis/matching";

import type { MatchingResponse } from "@/types/matching";

export function useMatching() {
  const [data, setData] = useState<MatchingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const result = await fetchMatchingResult();
        console.log("매칭 결과:", result);
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError("알 수 없는 오류");
        }
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return { data, loading, error };
}
