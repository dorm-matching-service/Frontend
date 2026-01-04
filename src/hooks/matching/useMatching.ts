// orchestration 훅(useMatching)

/*
  1. 매칭 페이지 진입 시 조회 API 조회
  2. 조회 결과가 있으면 결과 return(matching/page.tsx 화면에서 보여줌)
  3. 조회 결과가 없으면 매칭 API 실행
  4. 매칭 결과가 count == 0 이면 NoMatchingResult(매칭 결과가 없음)를 matching/page.tsx에서 보여줌
*/

// 리액트 임포트
import { useEffect, useState } from "react";

// api 임포트
import { fetchMatchingStatus, fetchMatchingResult } from "@/apis/matching";
import { fetchChecklistStatus } from "@/apis/checklist";

// 타입 임포트
import type {
  MatchingResponse,
  MatchingStatusResponse,
  MatchingMode,
} from "@/types/matching";

export function useMatching() {
  const [blockedByChecklist, setBlockedByChecklist] = useState(false);

  const [data, setData] = useState<MatchingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** 최초 매칭 화면 진입용: 조회 → 없으면 매칭 */
  const runInitialMatchingFlow = async () => {
    setLoading(true);
    setError(null);

    try {
      // 체크리스트 작성 여부 확인
      const checklistRes = await fetchChecklistStatus();

      // 체크리스트가 없으면 매칭 로직 실행하지 않음
      if (!checklistRes.exists) {
         setBlockedByChecklist(true);
        // data를 null로 유지 (페이지 쪽에서 checklist로 보내거나 처리)
        return;
      }

      // 기존 매칭 결과 조회
      const status: MatchingStatusResponse = await fetchMatchingStatus();

      // 조회 결과가 있으면 그대로 사용
      if (status.count > 0) {
        setData({
          count: status.count,
          results: status.results,
        });

        console.log("기존 매칭 결과 조회 시:", status);

        return;
      }

      // 조회 결과가 없으면 매칭 실행
      const result: MatchingResponse = await fetchMatchingResult("normal");

      // 매칭 결과 사용 (count === 0 이면 matching/page.tsx에서 NoMatchingResult 띄움)
      setData(result);
      console.log("현재 매칭 결과:", result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류");
      }
    } finally {
      setLoading(false);
    }
  };

  /** 재매칭용: 매칭 API만 실행 */
  const rematch = async (mode: MatchingMode) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchMatchingResult(mode);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runInitialMatchingFlow();
  }, []);

  return { data, loading, error, rematch, setData, blockedByChecklist };
}
