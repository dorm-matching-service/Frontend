"use client";

import { useRouter } from "next/navigation";

import { useMyLikedCards } from "@src/hooks/like/useMyLikedCards";
import MyPageProfileCard from "../_components/MyPageProfileCard";

export default function LikesPage() {
  const router = useRouter();
  const { cards, loading, error, setCards } = useMyLikedCards();

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  const handleLikeChange = (userId: string, liked: boolean) => {
    if (!liked) {
      // 찜 해제 시 목록에서 제거
      setCards((prev) => prev.filter((c) => c.userId !== userId));
    }
  };
  const handleGoDetail = (targetUserId: string) => {
    router.push(`/profile/${targetUserId}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <ul className="grid grid-cols-3 gap-6 items-stretch">
        {cards.map((card) => (
          <li key={card.userId}>
            <MyPageProfileCard
              data={card}
              onLikeChange={handleLikeChange}
              actionLabel="상세보기"
              onActionClick={handleGoDetail}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
