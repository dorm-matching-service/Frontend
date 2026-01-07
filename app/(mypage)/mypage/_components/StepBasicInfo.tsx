import React from "react";
import type { LifestyleSurvey, EI, NS, TF, JP } from "@/types/LifestyleSurvey";


type Props = {
  formState: Partial<LifestyleSurvey>;
  setFormState: React.Dispatch<React.SetStateAction<Partial<LifestyleSurvey>>>;
};

export default function StepBasicInfo({ formState, setFormState }: Props) {
  // MBTI 자리 별 현재 값
  const mbti1 = formState.mbti1;
  const mbti2 = formState.mbti2;
  const mbti3 = formState.mbti3;
  const mbti4 = formState.mbti4;

  // 자리별 setter 
  const setMbti1 = (v: EI) => setFormState((p) => ({ ...p, mbti1: v }));
  const setMbti2 = (v: NS) => setFormState((p) => ({ ...p, mbti2: v }));
  const setMbti3 = (v: TF) => setFormState((p) => ({ ...p, mbti3: v }));
  const setMbti4 = (v: JP) => setFormState((p) => ({ ...p, mbti4: v }));

  return (
    <div className="space-y-8">
      {/* MBTI */}
      <div className="grid grid-cols-2 gap-4">
        {/* 1) E / I */}
        {(["E", "I"] as const).map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => setMbti1(char)}
            className={`h-11 rounded-xl border ${
              mbti1 === char ? "bg-black text-white" : "bg-white"
            }`}
          >
            {char}
          </button>
        ))}

        {/* 2) N / S */}
        {(["N", "S"] as const).map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => setMbti2(char)}
            className={`h-11 rounded-xl border ${
              mbti2 === char ? "bg-black text-white" : "bg-white"
            }`}
          >
            {char}
          </button>
        ))}

        {/* 3) T / F */}
        {(["T", "F"] as const).map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => setMbti3(char)}
            className={`h-11 rounded-xl border ${
              mbti3 === char ? "bg-black text-white" : "bg-white"
            }`}
          >
            {char}
          </button>
        ))}

        {/* 4) J / P */}
        {(["J", "P"] as const).map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => setMbti4(char)}
            className={`h-11 rounded-xl border ${
              mbti4 === char ? "bg-black text-white" : "bg-white"
            }`}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
}
