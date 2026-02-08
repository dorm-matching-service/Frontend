const buttonClass = {
  base: "w-[173px] h-[48px] rounded-xl font-semibold transition border border-main rounded-[15px]",
  normal: "bg-white text-black",
  hover: "hover:bg-main hover:text-white",
};
interface ActionButtonProps {
  matchStatus: "PENDING" | "MATCHED" | "REJECTED" | null;
  hasRequested: boolean;
  canRespond: boolean;
  canRequest: boolean;
  hasChatRoom: boolean;

  onRequestMatch: () => void;
  onStartChat: () => void;
  onGoChat: () => void;
}

export default function ActionButton({
  matchStatus,
  hasRequested,
  canRespond,
  canRequest,
  hasChatRoom,
  onRequestMatch,
  onStartChat,
  onGoChat,
}: ActionButtonProps) {

  console.log({
  matchStatus,
  hasRequested,
  canRespond,
  canRequest,
  hasChatRoom,
});
  
  // 매칭 완료
  if (matchStatus === "MATCHED") {
    return (
      <button disabled className={`${buttonClass.base} ${buttonClass.normal}`}>
        매칭 완료
      </button>
    );
  }

  // 채팅방 X + 요청 가능 → 채팅하기
  if (!hasChatRoom && canRequest) {
    return (
      <button
        onClick={onStartChat}
        className={`${buttonClass.base} ${buttonClass.normal} ${buttonClass.hover}`}
      >
        채팅 시작하기
      </button>
    );
  }

  // 채팅방 O + 요청 가능 → 룸메 요청
  if (hasChatRoom && canRequest) {
    return (
      <button
        onClick={onRequestMatch}
        className={`${buttonClass.base} ${buttonClass.normal} ${buttonClass.hover}`}
      >
        룸메 요청
      </button>
    );
  }

  // 요청 보낸 상태
  if (hasRequested) {
    return (
      <button disabled className={`${buttonClass.base} ${buttonClass.normal}`}>
        요청 보냄
      </button>
    );
  }


  return null;
}
