const buttonClass = {
  base: "w-[173px] h-[48px] rounded-xl font-semibold transition border border-main rounded-[15px]",
  normal: "bg-white text-black",
  hover: "hover:bg-main text-white",
};
interface ActionButtonProps {
  hasChatRoom: boolean;
  isMatched: boolean;
  onChat: () => void;
  onMatch: () => void;
}

export default function ActionButton({
  hasChatRoom,
  isMatched,
  onChat,
  onMatch,
}: ActionButtonProps) {
  if (isMatched) {
    return (
      <button disabled className={`${buttonClass.base} ${buttonClass.normal} ${buttonClass.hover}`}>
        매칭 완료
      </button>
    );
  }

  if (hasChatRoom) {
    return (
      <button onClick={onMatch} className={`${buttonClass.base} ${buttonClass.normal} ${buttonClass.hover}`}>
        매칭하기
      </button>
    );
  }

  return (
    <button onClick={onChat} className={`${buttonClass.base} ${buttonClass.normal} ${buttonClass.hover}`}>
      채팅하기
    </button>
  );
}
