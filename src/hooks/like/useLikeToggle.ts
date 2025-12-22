// hooks/like/useLikeToggle.ts
import { useState } from "react";
import { toggleLike } from "@/apis/like";

interface UseLikeToggleOptions {
  initialLiked?: boolean;
  onChange?: (liked: boolean) => void;
}

export function useLikeToggle(
  targetUserId: string,
  options: UseLikeToggleOptions = {}
) {
  const { initialLiked = false, onChange } = options;

  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [loading, setLoading] = useState<boolean>(false);

  const handleToggleLike = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // 서버 값을 반영함 (단점 조금 시간이 지연됨)
      const res = await toggleLike(targetUserId);

      // 서버 응답 기준으로 상태 반영
      setLiked(res.liked);

      // 외부(부모, 리스트 등)에 알림
      onChange?.(res.liked);
    } catch (error) {
      console.error("좋아요 토글 실패", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    liked,
    loading,
    toggleLike: handleToggleLike,
  };
}
