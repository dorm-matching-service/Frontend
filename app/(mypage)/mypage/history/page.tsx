"use client";

import { useRouter } from "next/navigation";
import { usePastMatchingHistory } from "@src/hooks/matching/usePastMatching";
import MyPageProfileCard from "../_components/MyPageProfileCard";

export default function HistoryPage() {
  const router = useRouter();
  const { cards, loading, error, setCards } = usePastMatchingHistory();

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  const handleLikeChange = (userId: string, liked: boolean) => {
    // 과거 매칭에서 "찜 해제 시" 목록 제거가 필요하다면
    if (!liked) {
      setCards((prev) => prev.filter((c) => c.userId !== userId));
    }
  };
  const handleGoDetail = (targetUserId: string) => {
    router.push(`/profile/${targetUserId}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <ul className="flex gap-6 flex-wrap">
        {cards.map((card) => (
          <li key={card.userId}>
            <MyPageProfileCard
              data={card}
              onLikeChange={handleLikeChange}
              actionLabel="기록 보기"
              onActionClick={handleGoDetail}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
