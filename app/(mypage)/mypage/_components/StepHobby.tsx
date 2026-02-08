import CircleOption from "./CircleOption";
import type { LifestyleSurvey, GamingTime } from "@src/types/LifestyleSurvey";

type Props = {
  formState: Partial<LifestyleSurvey>;
  setFormState: React.Dispatch<React.SetStateAction<Partial<LifestyleSurvey>>>;
};

const GAMING_OPTIONS: { label: string; value: GamingTime }[] = [
  { label: "게임 안 함", value: "NONE" },
  { label: "주 1회 미만", value: "ONE_MINUS" },
  { label: "주 1~3회", value: "ONE_TO_THREE" },
  { label: "주 3회 이상", value: "THREE_PLUS" },
];

export default function StepHobby({ formState, setFormState }: Props) {
  return (
    <div className="space-y-6">
      {/* 질문 */}
      <span className="text-sm font-semibold">
        12. 게임 빈도를 선택해주세요.
      </span>

      {/* 선택지 */}
      <div className="space-y-3">
        {GAMING_OPTIONS.map((opt) => (
          <CircleOption
            key={opt.value}
            label={opt.label}
            selected={formState.gamingTime === opt.value}
            onClick={() =>
              setFormState((p) => ({ ...p, gamingTime: opt.value }))
            }
          />
        ))}
      </div>
    </div>
  );
}
