import SummaryItem from "./SummaryItem";
interface SummaryCounts {
  requestCount: number;
  likedCount: number;
  pastMatchCount: number;
}

interface SummaryCardSectionProps {
  counts: SummaryCounts;
}
export default function SummaryCardSection({
  counts,
}: SummaryCardSectionProps) {
  return (
    <div className="w-full flex gap-3">
      <SummaryItem icon="/mail.svg" title="요청함" count={3} />

      <SummaryItem icon="/heart.svg" title="관심 프로필" count={counts.likedCount} />

      <SummaryItem icon="time.svg" title="지난 매칭 기록" count={counts.pastMatchCount} />
    </div>
  );
}
