"use client";

import { useMyPageData } from "@/hooks/mypage/useMypageData";
import { useMyLikedCards } from "@/hooks/like/useMyLikedCards";

import SummaryCardSection from "./_components/SummaryCardSection";
import InterestedProfileSection from "./_components/InterestedProfileSection";

export default function MyPage() {
  // 좋아요 카드 목록
  const { cards: likedCards, setCards: setLikedCards } = useMyLikedCards();

  // 마이페이지 메인 요약 데이터
  const { loading, error, pastMatchingCount, likeCount } = useMyPageData();

  const handleLikeChange = (userId: string, liked: boolean) => {
    setLikedCards((prev) =>
      prev.map((card) =>
        card.userId === userId ? { ...card, isLiked: liked } : card
      )
    );
  };

  if (loading) {
    return <div>마이페이지 불러오는 중...</div>;
  }

  if (error) {
    return <div>마이페이지 데이터를 불러오지 못했어요.</div>;
  }

  

  return (
    <div className="min-h-screen flex flex-col gap-8">
      <SummaryCardSection
        counts={{
          requestCount: likedCards.length,
          likedCount: likeCount ?? 0,
          pastMatchCount: pastMatchingCount ?? 0,
        }}
      />

      <InterestedProfileSection
        profiles={likedCards}
        onLikeChange={handleLikeChange}
      />
    </div>
  );
}
