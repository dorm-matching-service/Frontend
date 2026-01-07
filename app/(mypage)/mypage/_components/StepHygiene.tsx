import CircleOption from "./CircleOption";
import type {
  LifestyleSurvey,
  ShowerFreq,
  CleaningFreq,
} from "@/types/LifestyleSurvey";

type Props = {
  formState: Partial<LifestyleSurvey>;
  setFormState: React.Dispatch<React.SetStateAction<Partial<LifestyleSurvey>>>;
};

const SHOWER_OPTIONS: { label: string; value: ShowerFreq }[] = [
  { label: "하루에 한 번", value: "ONCE" },
  { label: "하루에 두 번", value: "TWICE" },
  { label: "이틀에 한 번", value: "TWO_DAYS" },
  { label: "며칠에 한 번", value: "RARE" },
];

const CLEANING_OPTIONS: { label: string; value: CleaningFreq }[] = [
  { label: "하루에 한 번", value: "ONCE" },
  { label: "하루에 두 번", value: "TWICE" },
  { label: "이틀에 한 번", value: "TWO_DAYS" },
  { label: "며칠에 한 번", value: "RARE" },
];

export default function StepHygiene({ formState, setFormState }: Props) {
  return (
    <div className="space-y-10">
      <div>
        <span className="text-sm font-semibold">7. 샤워는 얼마나 자주?</span>
        {SHOWER_OPTIONS.map((opt) => (
          <CircleOption
            key={opt.value}
            label={opt.label}
            selected={formState.showerFreq === opt.value}
            onClick={() =>
              setFormState((p) => ({ ...p, showerFreq: opt.value }))
            }
          />
        ))}
      </div>

      <div className="space-y-4">
        <span className="text-sm font-semibold">
          8. 방 청소는 얼마나 자주 하나요?
        </span>
        {CLEANING_OPTIONS.map((opt) => (
          <CircleOption
            key={opt.value}
            label={opt.label}
            selected={formState.cleaningFreq === opt.value}
            onClick={() =>
              setFormState((p) => ({ ...p, cleaningFreq: opt.value }))
            }
          />
        ))}
      </div>
    </div>
  );
}
