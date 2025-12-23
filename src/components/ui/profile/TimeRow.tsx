// 프로필 기상, 취침 시간 UI

interface TimeRowProps {
  icon: string;
  label: string;
  value: string;
}

export default function TimeRow({ icon, label, value }: TimeRowProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <img src={icon} alt={label} className="w-[15.51px] h-[15.51px]" />

      <div className="flex items-center gap-1 flex-1 min-w-0">
        <span className="whitespace-nowrap">{label}</span>
        <span className="w-[70px] text-right tabular-nums shrink-0  whitespace-nowrap">
          {value}
        </span>
      </div>
    </div>
  );
}
