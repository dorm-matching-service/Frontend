type Props = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export default function CircleOption({ label, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 py-2"
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
          selected ? "border-[#4CB7A5]" : "border-gray-300"
        }`}
      >
        {selected && (
          <span className="block h-2.5 w-2.5 rounded-full bg-[#4CB7A5]" />
        )}
      </span>
      <span className="text-sm text-gray-800">{label}</span>
    </button>
  );
}
