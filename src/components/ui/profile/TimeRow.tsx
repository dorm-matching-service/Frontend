// 프로필 기상, 취침 시간 UI

interface TimeRowProps {
  icon: string;
  label: string;
  value: string;
}

export default function TimeRow({
  icon,
  label,
  value,
}: TimeRowProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <img
        src={icon}
        alt={label}
        className="w-[15.51px] h-[15.51px]"
      />

      <p className="flex items-center gap-1 text-gray-800 text-14">
        <span>{label}</span>
        <span className="inline-block w-[70px] text-right tabular-nums">
          {value}
        </span>
      </p>
    </div>
  );
}
