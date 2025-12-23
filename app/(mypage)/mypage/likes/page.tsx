"use client";

import { useMyLikedCards } from "@/hooks/like/useMyLikedCards";
import MyProfileCard from "../_components/MyProfileCard";

export default function LikesPage() {
  const { cards, loading, error, setCards } = useMyLikedCards();

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <ul>
      {cards.map((card) => (
        <MyProfileCard
          key={card.targetUserId}
          targetUserId={card.targetUserId}
          user={card}
          onUnlike={(targetUserId) => {
            setCards((prev) =>
              prev.filter((c) => c.targetUserId !== targetUserId)
            );
          }}
        />
      ))}
    </ul>
  );
}
