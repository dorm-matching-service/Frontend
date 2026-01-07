type Props = {
  label: string;
  value: "yes" | "no" | "";
  onChange: (v: "yes" | "no") => void;
};

export default function ToggleYesNo({ label, value, onChange }: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-gray-800">{label}</span>
      <div className="inline-flex rounded-full bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => onChange("yes")}
          className={`h-8 rounded-full px-4 text-xs font-medium transition ${
            value === "yes" ? "bg-[#4CB7A5] text-white" : "text-gray-500"
          }`}
        >
          네
        </button>
        <button
          type="button"
          onClick={() => onChange("no")}
          className={`h-8 rounded-full px-4 text-xs font-medium transition ${
            value === "no" ? "bg-[#4CB7A5] text-white" : "text-gray-500"
          }`}
        >
          아니요
        </button>
      </div>
    </div>
  );
}
