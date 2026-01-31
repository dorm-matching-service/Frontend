"use client";

import type { MatchingCardItem } from "@src/types/matching";
import { useLikeToggle } from "@src/hooks/like/useLikeToggle";

import ProfileBox from "@src/components/ui/profile/ProfileBox";
import ProfileBody from "@src/components/ui/profile/ProfileBody";

import MatchProfileHeader from "./MatchProfileHeader";
import MatchProfileFooter from "../../../../src/components/ui/profile/ProfileFooter";

interface MatchProfileCardProps {
  data: MatchingCardItem;
  onLikeChange: (userId: string, liked: boolean) => void;
}

export default function MatchProfileCard({
  data,
  onLikeChange,
}: MatchProfileCardProps) {

  const { liked, loading, toggleLike } = useLikeToggle(data.userId, {
    initialLiked: data.isLiked,
    onChange: (liked) => {
      onLikeChange(data.userId, liked);
      console.log("찜 상태 변경:", liked);
      // 여기서 부모 상태 갱신, 카운트 변경 가능
    },
  });
  return (
    <ProfileBox>
      {/* 상단: 매칭률 + 리포트 */}
      <MatchProfileHeader score={data.matchingScore} />

      {/* 중앙: 프로필 정보 */}
      <ProfileBody
        major={data.major}
        age={data.age}
        wakeTime={data.wakeTime}
        sleepTime={data.sleepTime}
        tags={data.tags}
      />

      {/* 하단: 찜하기 + 상세보기 */}
      <MatchProfileFooter
        liked={liked}
        loading={loading}
        onToggleLike={toggleLike}
        onActionClick={() => {
          console.log("상세보기 클릭:", data.userId);
        }}
        actionLabel="상세보기 클릭"
      />
    </ProfileBox>
  );
}
