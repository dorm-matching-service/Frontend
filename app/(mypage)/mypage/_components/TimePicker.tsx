import { useMemo } from "react";

type Props = {
  label: string;
  valueText: string;
  onChangeText: (v: string) => void;
};

export default function TimePicker({
  label,
  valueText,
  onChangeText,
}: Props) {
  const parsed = useMemo(() => {
    const m = valueText.match(/(오전|오후)\s*(\d{1,2})시\s*(\d{1,2})분/);
    if (!m) return { period: "오전", hour: "", minute: "" };
    return { period: m[1], hour: m[2], minute: m[3] };
  }, [valueText]);

  const emitChange = (
    period: string,
    hour: string,
    minute: string
  ) => {
    if (hour && minute !== "") {
      onChangeText(`${period} ${hour}시 ${minute}분`);
    }
  };

  return (
    <div className="space-y-2">
      <span className="text-sm font-semibold">{label}</span>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            const next =
              parsed.period === "오전" ? "오후" : "오전";
            emitChange(next, parsed.hour, parsed.minute);
          }}
          className="h-10 w-20 rounded-full border bg-white text-xs"
        >
          {parsed.period}
        </button>

        <select
          value={parsed.hour}
          onChange={(e) =>
            emitChange(parsed.period, e.target.value, parsed.minute)
          }
          className="h-10 flex-1 rounded-full border px-4 text-xs"
        >
          <option value="">시</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={String(i + 1)}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          value={parsed.minute}
          onChange={(e) =>
            emitChange(parsed.period, parsed.hour, e.target.value)
          }
          className="h-10 flex-1 rounded-full border px-4 text-xs"
        >
          <option value="">분</option>
          {Array.from({ length: 60 }, (_, i) => {
            const v = String(i).padStart(2, "0");
            return (
              <option key={v} value={v}>
                {v}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
