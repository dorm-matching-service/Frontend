"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { fetchChecklistStatus, patchMySurvey } from "@/apis/checklist";
import type { PatchSurveyResponse } from "@/apis/checklist";

import { LifestyleSurvey } from "@/types/LifestyleSurvey";

export function useChecklistOrchestrator() {
  const router = useRouter();

  const [saving, setSaving] = useState(false); //PATCH 진행 상태
  const [loading, setLoading] = useState(true); // 최초 GET 상태
  const [error, setError] = useState<Error | null>(null);

  // 서버에서 받은 체크리스트 original 값
  const [originalSurvey, setOriginalSurvey] = useState<LifestyleSurvey | null>(
    null
  );

  // page.tsx form에서 수정한 값
  const [formState, setFormState] = useState<Partial<LifestyleSurvey>>({});

  // 최초 페이지 렌더링 시: 체크리스트 조회
  useEffect(() => {
    const init = async () => {
      try {
        setError(null);

        const res = await fetchChecklistStatus();

        if (!res.exists || !res.survey) {
          alert("체크리스트 정보가 없습니다.");
          router.replace("/");
          return;
        }

        setOriginalSurvey(res.survey);
        setFormState(res.survey);
      } catch (err) {
        console.log("체크리스트 조회 실패", err);
        setError(err as Error);
        alert("체크리스트 조회 중 오류가 발생했습니다.");
        router.replace("/");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router]);

  // 서버에서 받아온 체크리스트 정보와 form 값 비교 로직
  const getChangedFeilds = (
    original: LifestyleSurvey,
    current: Partial<LifestyleSurvey>
  ): Partial<LifestyleSurvey> => {
    const diff: Partial<LifestyleSurvey> = {};

    // current에 들어올 수 있는 키는 LifestyleSurvey의 키 중 일부
    (Object.keys(current) as (keyof LifestyleSurvey)[]).forEach((key) => {
      const currentValue = current[key];

      if (currentValue === undefined) return;
      // value값 current와 original 비교 다른게 있으면
      if (currentValue !== original[key]) {
        (diff as Partial<Record<keyof LifestyleSurvey, unknown>>)[key] =
          currentValue;
      }
    });
    return diff;
  };

  // 저장 (체크리스트 patch api 실행)
  const save = async (): Promise<PatchSurveyResponse | null> => {
    if (!originalSurvey) return null;

    const changedData = getChangedFeilds(originalSurvey, formState);

    if (Object.keys(changedData).length === 0) {
      alert("변경된 내용이 없습니다.");
      return null;
    }

    try {
      setSaving(true);
      setError(null);

      const res = await patchMySurvey(changedData);

      // PATCH 요청의 응답값을 설문 데이터의 유일한 기준(source of truth)으로 사용
      setOriginalSurvey(res.survey);
      setFormState(res.survey);

      return res;
    } catch (err) {
      console.error("체크리스트 수정 실패", err);
      setError(err as Error);
      alert("체크리스트 저장에 실패했습니다.");
      return null;
    } finally {
      setSaving(false);
    }
  };

  return {
    loading,
    saving,
    error,
    formState,
    setFormState,
    save,
  };
}
