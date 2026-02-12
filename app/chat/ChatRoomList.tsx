"use client";

import { useRouter } from "next/navigation";
import useMyChatRooms from "@src/hooks/chat/useMyChatRooms";

interface Props {
  selectedRoomId: string | null;
}
export default function ChatRoomList({ selectedRoomId }: Props) {
  const { rooms, loading } = useMyChatRooms();
  const router = useRouter();

  if (loading) return <div className="w-[320px]">로딩 중...</div>;

  return (
    <div className="w-[320px] border-r overflow-y-auto">
      <h2 className="p-4 font-bold text-lg">채팅 목록</h2>

      {rooms.map((room) => {
        const isSelected = room.roomId === selectedRoomId;

        return (
          <div
            key={room.roomId}
            onClick={() => router.push(`/chat/${room.roomId}`)}
            className={`p-4 cursor-pointer transition ${
              isSelected
                ? "bg-main text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="flex justify-between">
              <span className="font-semibold">
                {room.opponent.department} {room.opponent.age}살
              </span>
              <span className="text-xs">
                {room.lastMessage?.createdAt?.slice(5, 16)}
              </span>
            </div>

            <p className="text-sm truncate">
              {room.lastMessage?.content ?? "메시지 없음"}
            </p>

            {room.unreadCount > 0 && (
              <span className="text-xs bg-red-500 text-white rounded-full px-2 ml-2">
                {room.unreadCount}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
