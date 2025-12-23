"use client";

import { usePastMatchingHistory } from "@/hooks/matching/usePastMatching";
import MyProfileCard from "../_components/MyProfileCard";

export default function HistoryPage() {
  const { cards, loading, error, setCards } = usePastMatchingHistory();

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <ul className="flex gap-6">
        {cards.map((card) => (
          <li key={card.targetUserId}>
            <MyProfileCard
              targetUserId={card.targetUserId}
              user={card}
              onUnlike={(targetUserId) => {
                setCards((prev) =>
                  prev.filter((c) => c.targetUserId !== targetUserId)
                );
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
