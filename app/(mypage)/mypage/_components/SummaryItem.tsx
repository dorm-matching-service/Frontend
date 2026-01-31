interface SummaryItemProps {
  icon: string; // 아이콘 컴포넌트
  title: string; // 요청함 / 관심 프로필 / 지난 매칭 기록
  count: number; // 3 / 4 / 5
}

export default function SummaryItem({ icon, title, count }: SummaryItemProps) {
  return (
    <div className="flex flex-col w-full border shadow-profileCard rounded-[15px] p-6 space-y-6 gap-2 items-center justify-center">
      <img src={icon} alt="summary아이템 아이콘" className="mb-1" />
      <p className="text-15">{title}</p>
      <p className="text-main font-bold text-16">{count}</p>
    </div>
  );
}
