// 매칭 프로필 푸터 UI (찜 아이콘 + 자세히보기 > 버튼)


interface MatchProfileFooterProps {
  liked?: boolean;
  loading?: boolean;
  onToggleLike?: () => void;

  actionLabel?: string; // ← 버튼 글씨 전달
  onActionClick?: () => void; // ← 클릭 핸들러 전달

  showLike?: boolean;
}

export default function ProfileFooter({
  liked,
  loading = false,
  onToggleLike,
  onActionClick,
  actionLabel,
  showLike = true,
}: MatchProfileFooterProps) {
  return (
    <div className="w-full flex justify-between">
      {showLike && (
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
      )}

      {onActionClick && (
        <button
          type="button"
          onClick={onActionClick}
          className="text-15 font-medium text-gray-600"
        >
          {actionLabel} &gt;
        </button>
      )}
    </div>
  );
}
