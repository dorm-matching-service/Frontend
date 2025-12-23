// 매칭 프로필 푸터 UI (찜 아이콘 + 자세히보기 > 버튼)

interface MatchProfileFooterProps {
  liked: boolean;
  loading?: boolean;
  onToggleLike: () => void;
  onDetailClick?: () => void;
}

export default function MatchProfileFooter({
  liked,
  loading = false,
  onToggleLike,
  onDetailClick,
}: MatchProfileFooterProps) {
  return (
    <div className="w-full flex justify-between">
      <button
        onClick={onToggleLike}
        disabled={loading}
        className="disabled:opacity-50"
      >
        <img
          src={liked ? "/redlike.svg" : "/emptylike.svg"}
          alt="찜 아이콘"
          className="w-[18px] h-[16px]"
        />
      </button>

      <button
        type="button"
        onClick={onDetailClick}
        className="text-15 font-medium text-gray-600"
      >
        자세히 보기 &gt;
      </button>
    </div>
  );
}
