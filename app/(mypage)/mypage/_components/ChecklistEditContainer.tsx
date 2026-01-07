"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { StepTabs } from "app/(checklist)/_components/StepTabs";
import { useChecklistOrchestrator } from "@/hooks/checklist/useChecklistOrchestrator";

import StepBasicInfo from "./StepBasicInfo";
import StepRoutine from "./StepRoutine";
import StepHygiene from "./StepHygiene";
import StepLifestyle from "./StepLifestyle";
import StepHobby from "./StepHobby";
import StepRoommateWish from "./StepRoommateWish";
import StepSelfTag from "./StepSelfTag";

const STEPS = [
  "기본정보 4문항",
  "생활루틴 2문항",
  "위생청결 2문항",
  "생활습관 5문항",
  "취미여가 4문항",
  "룸메기대 1문항",
];

type Phase = "form" | "selfTag";

export default function ChecklistEditContainer() {
  const router = useRouter();
  const { loading, saving, formState, setFormState, save } =
    useChecklistOrchestrator();

  const [phase, setPhase] = React.useState<Phase>("form");
  const [currentStep, setCurrentStep] = React.useState(0);

  if (loading) return <div className="px-4 py-10">로딩 중...</div>;

  const handleNext = () => {
    if (currentStep === STEPS.length - 1) {
      setPhase("selfTag");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (phase === "selfTag") {
      setPhase("form");
      setCurrentStep(STEPS.length - 1);
      return;
    }
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  if (phase === "selfTag") {
    return (
      <StepSelfTag
        selfTags={formState.selfTags ?? []}
        setSelfTags={(tags) =>
          setFormState((prev) => ({ ...prev, selfTags: tags }))
        }
        saving={saving}
        onPrev={handlePrev}
        onSave={async () => {
          const res = await save();
          if (res) {
            alert("수정이 완료되었습니다.");
            router.back();
          }
        }}
      />
    );
  }

  return (
    <div className="mx-auto px-4 py-10">
      <section className="mt-6 rounded-2xl bg-white px-6 py-10 shadow-sm">
        <p className="mb-2 text-xs text-[#4CB7A5]">라이프 스타일 테스트</p>
        <h1 className="mb-2 text-2xl font-semibold">
          당신의 생활 습관에 맞게 선택해 주세요
        </h1>

        <StepTabs steps={STEPS} currentStep={currentStep} />

        <div className="mt-8 space-y-10">
          {currentStep === 0 && (
            <StepBasicInfo formState={formState} setFormState={setFormState} />
          )}
          {currentStep === 1 && (
            <StepRoutine formState={formState} setFormState={setFormState} />
          )}
          {currentStep === 2 && (
            <StepHygiene formState={formState} setFormState={setFormState} />
          )}
          {currentStep === 3 && (
            <StepLifestyle formState={formState} setFormState={setFormState} />
          )}
          {currentStep === 4 && (
            <StepHobby formState={formState} setFormState={setFormState} />
          )}
          {currentStep === 5 && (
            <StepRoommateWish
              value={formState.roommateWish ?? ""}
              onChange={(v) =>
                setFormState((prev) => ({ ...prev, roommateWish: v }))
              }
            />
          )}
        </div>

        <div className="mt-10 flex justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex-1 rounded-full bg-gray-100 py-3 text-sm"
          >
            이전
          </button>

          <button
            onClick={handleNext}
            className="flex-1 rounded-full bg-[#4CB7A5] py-3 text-sm text-white"
          >
            다음 단계
          </button>
        </div>
      </section>
    </div>
  );
}
