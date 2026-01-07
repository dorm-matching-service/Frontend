import TimePicker from "./TimePicker";
import type { LifestyleSurvey } from "@/types/LifestyleSurvey";
import {
  convertTimeTextToMinutes,
  convertMinutesToTimeText,
} from "@/utils/time";

type Props = {
  formState: Partial<LifestyleSurvey>;
  setFormState: React.Dispatch<
    React.SetStateAction<Partial<LifestyleSurvey>>
  >;
};

export default function StepRoutine({ formState, setFormState }: Props) {
  return (
    <div className="space-y-8">
      <TimePicker
        label="5. 기상 시간대를 선택해주세요."
        valueText={convertMinutesToTimeText(formState.wakeTimeMinutes)}
        onChangeText={(text) =>
          setFormState((prev) => ({
            ...prev,
            wakeTimeMinutes: convertTimeTextToMinutes(text),
          }))
        }
      />

      <TimePicker
        label="6. 취침 시간대를 선택해주세요."
        valueText={convertMinutesToTimeText(formState.sleepTimeMinutes)}
        onChangeText={(text) =>
          setFormState((prev) => ({
            ...prev,
            sleepTimeMinutes: convertTimeTextToMinutes(text),
          }))
        }
      />
    </div>
  );
}
