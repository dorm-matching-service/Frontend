"use client";

import { useLikeToggle } from "@/hooks/like/useLikeToggle";

import ProfileBox from "@/components/ui/profile/ProfileBox";
import ProfileBody from "@/components/ui/profile/ProfileBody";
import ProfileFooter from "@/components/ui/profile/ProfileFooter";

interface MyProfileCardProps {
  targetUserId: string;
  user: {
    major: string;
    age: number;
    wakeTime: string;
    sleepTime: string;
    tags?: string[];
  };
  onUnlike?: (userId: string) => void;
}

export default function MyProfileCard({
  targetUserId,
  user,
  onUnlike,
}: MyProfileCardProps) {
  const { liked, loading, toggleLike } = useLikeToggle(targetUserId, {
    initialLiked: true,
    onChange: (liked) => {
      if (!liked) {
        onUnlike?.(targetUserId);
      }
    },
  });
  return (
    <ProfileBox>
      <ProfileBody
        major={user.major}
        age={user.age}
        wakeTime={user.wakeTime}
        sleepTime={user.sleepTime}
        tags={user.tags}
      />
      <ProfileFooter
        liked={liked}
        loading={loading}
        onToggleLike={toggleLike}
        onDetailClick={() => {
          console.log("상세보기:", targetUserId);
        }}
      />
    </ProfileBox>
  );
}
