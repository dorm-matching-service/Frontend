type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function StepRoommateWish({ value, onChange }: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border p-4 text-sm"
      maxLength={150}
    />
  );
}
