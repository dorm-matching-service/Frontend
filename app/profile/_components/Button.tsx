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
  // 1️. 이미 매칭됨 → 채팅
  if (matchStatus === "MATCHED") {
    return hasChatRoom ? (
      <button
        onClick={onGoChat}
        className={`${buttonClass.base} ${buttonClass.normal} ${buttonClass.hover}`}
      >
        채팅으로 이동
      </button>
    ) : (
      <button
        onClick={onStartChat}
        className={`${buttonClass.base} ${buttonClass.normal} ${buttonClass.hover}`}
      >
        채팅 시작하기
      </button>
    );
  }

  // 2. 요청 받은 상태 (상세페이지에서는 표시만)
  if (canRespond) {
    return (
      <button disabled className={`${buttonClass.base} ${buttonClass.normal}`}>
        요청 받음
      </button>
    );
  }

  // 3. 요청 보낸 상태
  if (hasRequested) {
    return (
      <button disabled className={`${buttonClass.base} ${buttonClass.normal}`}>
        요청 보냄
      </button>
    );
  }

  // 4️. 아무 관계 없음
  if (canRequest) {
    return (
      <button
        onClick={onRequestMatch}
        className={`${buttonClass.base} ${buttonClass.normal} ${buttonClass.hover}`}
      >
        매칭 요청
      </button>
    );
  }

  return null;
}
