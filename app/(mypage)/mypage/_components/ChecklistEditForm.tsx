// app/checklist/edit/_components/ChecklistEditForm.tsx
"use client";

import { useState } from "react";
import type { LifestyleSurvey } from "@/types/LifestyleSurvey";

const STEPS = [
  "기본정보",
  "생활루틴",
  "위생청결",
  "생활습관",
  "취미여가",
  "룸메기대",
];

interface ChecklistEditFormProps {
  formState: Partial<LifestyleSurvey>;
  setFormState: React.Dispatch<
    React.SetStateAction<Partial<LifestyleSurvey>>
  >;
  saving: boolean;
  onSubmit: () => Promise<unknown>;
}

export default function ChecklistEditForm({
  formState,
  setFormState,
  saving,
  onSubmit,
}: ChecklistEditFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  /* =========================
     step 이동
  ========================= */
  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  /* =========================
     제출
  ========================= */
  const handleSubmit = async () => {
    await onSubmit();
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      {/* ===== 제목 ===== */}
      <h1 className="mb-6 text-2xl font-bold">
        체크리스트 수정
      </h1>

      {/* ===== 스텝 표시 ===== */}
      <div className="mb-8 flex gap-2 text-sm text-gray-500">
        {STEPS.map((label, idx) => (
          <span
            key={label}
            className={
              idx === currentStep
                ? "font-semibold text-black"
                : ""
            }
          >
            {label}
          </span>
        ))}
      </div>

      {/* ===== step UI ===== */}
      <section className="mb-10">
        {currentStep === 0 && (
          <div>
            {/* StepBasicInfo */}
            {/* TODO: 기존 UI 그대로 이식 */}
          </div>
        )}

        {currentStep === 1 && (
          <div>
            {/* StepRoutine */}
          </div>
        )}

        {currentStep === 2 && (
          <div>
            {/* StepHygiene */}
          </div>
        )}

        {currentStep === 3 && (
          <div>
            {/* StepLifestyle */}
          </div>
        )}

        {currentStep === 4 && (
          <div>
            {/* StepHobby */}
          </div>
        )}

        {currentStep === 5 && (
          <div>
            {/* StepRoommateWish */}
          </div>
        )}
      </section>

      {/* ===== 버튼 영역 ===== */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentStep === 0}
          className="flex-1 rounded-lg bg-gray-100 py-3 text-sm disabled:opacity-40"
        >
          이전
        </button>

        {currentStep === STEPS.length - 1 ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 rounded-lg bg-black py-3 text-sm text-white disabled:opacity-40"
          >
            {saving ? "저장 중..." : "수정 완료"}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="flex-1 rounded-lg bg-black py-3 text-sm text-white"
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
}
