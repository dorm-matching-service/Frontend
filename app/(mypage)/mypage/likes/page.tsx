"use client";

import { useMyLikedCards } from "@/hooks/like/useMyLikedCards";
import MyPageProfileCard from "../_components/MyPageProfileCard";

export default function LikesPage() {
  const { cards, loading, error, setCards } = useMyLikedCards();

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  const handleLikeChange = (userId: string, liked: boolean) => {
    if (!liked) {
      // 찜 해제 시 목록에서 제거
      setCards((prev) => prev.filter((c) => c.userId !== userId));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <ul className="flex gap-6">
        {cards.map((card) => (
          <li key={card.userId}>
            <MyPageProfileCard
              data={card}
              onLikeChange={handleLikeChange}
              actionLabel="상세보기"
              onActionClick={(userId) => {
                console.log("상세보기:", userId);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
