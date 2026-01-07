import { TagInput } from "app/(checklist)/_components/QuestionControls";

type Props = {
  selfTags: string[];
  setSelfTags: (v: string[]) => void;
  saving: boolean;
  onPrev: () => void;
  onSave: () => void;
};

export default function StepSelfTag({
  selfTags,
  setSelfTags,
  saving,
  onPrev,
  onSave,
}: Props) {
  return (
    <div className="mx-auto px-4 py-10">
      <section className="rounded-2xl bg-white px-6 py-10 shadow-sm">
        <h1 className="text-xl font-semibold">나를 표현하는 키워드</h1>

        <TagInput tags={selfTags} onChange={setSelfTags} maxTags={5} />

        <div className="mt-10 flex gap-4">
          <button
            onClick={onPrev}
            className="flex-1 rounded-full bg-gray-100 py-3"
          >
            이전
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex-1 rounded-full bg-[#4CB7A5] py-3 text-white"
          >
            수정 완료
          </button>
        </div>
      </section>
    </div>
  );
}
