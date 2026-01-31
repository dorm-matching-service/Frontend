import CircleOption from "./CircleOption";
import ToggleYesNo from "./ToggleYesNo";
import type {
  LifestyleSurvey,
  OutgoingFreq,
  ActivityLevel,
} from "@src/types/LifestyleSurvey";

type Props = {
  formState: Partial<LifestyleSurvey>;
  setFormState: React.Dispatch<React.SetStateAction<Partial<LifestyleSurvey>>>;
};

const OUTGOING_OPTIONS: { label: string; value: OutgoingFreq }[] = [
  { label: "매주 외출", value: "EVERY_WEEK" },
  { label: "2주에 한 번", value: "TWO_WEEKS" },
  { label: "주말만 외출", value: "WEEKENDS" },
  { label: "방학 때만 외출", value: "VACATION" },
];


export default function StepLifestyle({ formState, setFormState }: Props) {
  return (
   <div className="space-y-10">
      {/* 외출 빈도 */}
      <div className="space-y-4">
        <span className="text-sm font-semibold">
          9. 외출 빈도를 선택해주세요.
        </span>
        {OUTGOING_OPTIONS.map((opt) => (
          <CircleOption
            key={opt.value}
            label={opt.label}
            selected={formState.outgoingFreq === opt.value}
            onClick={() =>
              setFormState((p) => ({ ...p, outgoingFreq: opt.value }))
            }
          />
        ))}
      </div>

      {/* 흡연 여부 */}
      <ToggleYesNo
        label="흡연을 하나요?"
        value={
          formState.activityLevel === "SMOKER"
            ? "yes"
            : formState.activityLevel === "NON_SMOKER"
            ? "no"
            : ""
        }
        onChange={(v) =>
          setFormState((p) => ({
            ...p,
            activityLevel: v === "yes" ? "SMOKER" : "NON_SMOKER",
          }))
        }
      />

      {/* 온도 민감도 */}
      <ToggleYesNo
        label="추위를 타는 편인가요?"
        value={formState.coldSensitivity ? "yes" : "no"}
        onChange={(v) =>
          setFormState((p) => ({
            ...p,
            coldSensitivity: v === "yes",
          }))
        }
      />

      <ToggleYesNo
        label="더위를 타는 편인가요?"
        value={formState.hotSensitivity ? "yes" : "no"}
        onChange={(v) =>
          setFormState((p) => ({
            ...p,
            hotSensitivity: v === "yes",
          }))
        }
      />
    </div>
  );
}
