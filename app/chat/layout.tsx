import ChatRoomListWrapper from "./ChatRoomListWrapper";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* 왼쪽 목록 항상 고정 */}
      <ChatRoomListWrapper />

      {/* 오른쪽 영역 */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
