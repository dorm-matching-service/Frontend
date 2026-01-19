"use client";

import { useLikeToggle } from "@/hooks/like/useLikeToggle";

import ProfileBox from "@/components/ui/profile/ProfileBox";
import ProfileBody from "@/components/ui/profile/ProfileBody";
import ProfileFooter from "@/components/ui/profile/ProfileFooter";

export interface MyPageProfileCardItem {
  userId: string;
  isLiked: boolean;
  major: string;
  age: number;
  wakeTime: string;
  sleepTime: string;
  tags?: string[];
}

interface MyPageProfileCardProps {
  data: MyPageProfileCardItem; // ✅ 여기!
  onLikeChange?: (userId: string, liked: boolean) => void;
  actionLabel?: string;
  onActionClick?: (userId: string) => void;
}

export default function MyPageProfileCard({
  data,
  onLikeChange,
  actionLabel = "상세보기",
  onActionClick,
}: MyPageProfileCardProps) {
 const { liked, loading, toggleLike } = useLikeToggle(data.userId, {
    initialLiked: data.isLiked,
    onChange: (liked) => {
      onLikeChange?.(data.userId, liked);
    },
  });
  return (
    <ProfileBox>
      <ProfileBody
        major={data.major}
        age={data.age}
        wakeTime={data.wakeTime}
        sleepTime={data.sleepTime}
        tags={data.tags}
      />

      <ProfileFooter
        liked={liked}
        loading={loading}
        onToggleLike={toggleLike}
        actionLabel={actionLabel}
        onActionClick={() => onActionClick?.(data.userId)}
      />
    </ProfileBox>
  );
}
