interface LikeButtonProps {
  liked: boolean;
  loading?: boolean;
  onToggle: () => void;
}

export default function LikeButton({
  liked,
  loading = false,
  onToggle,
}: LikeButtonProps) {
  return (
    <button
      onClick={onToggle}
      disabled={loading}
      className="disabled:opacity-50"
    >
      <img
        src={liked ? "/redlike.svg" : "/emptylike.svg"}
        alt="찜 아이콘"
        className="w-[18px] h-[16px]"
      />
    </button>
  );
}
