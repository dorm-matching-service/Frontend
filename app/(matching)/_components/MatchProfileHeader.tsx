// 매칭 프로필 헤더 UI (매칭률 + 리포트 버튼)

interface MatchProfileHeaderProps {
  score: number;
  onReportClick?: () => void;
}

export default function MatchProfileHeader({
  score,
  onReportClick,
}: MatchProfileHeaderProps) {
  return (
    <div className="w-full flex items-center justify-between">
      <span className="text-main font-bold text-16">매칭률 {score}%</span>

      <button
        type="button"
        onClick={onReportClick}
        className="border-main text-main font-medium text-16 border px-1 py-1 rounded-[15px]"
      >
        매칭 리포트
      </button>
    </div>
  );
}
