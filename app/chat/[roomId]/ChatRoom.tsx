"use client";

import { useChatMessages } from "@src/hooks/chat/useChatMessages";
import { useSendChatMessage } from "@src/hooks/chat/useSendChatMessage";
import { useReadChatRoom } from "@src/hooks/chat/useReadChatRoom";
import { useEffect, useState } from "react";
import { getSocket } from "lib/socket";
import type { Socket } from "socket.io-client";
import { useMyProfile } from "@src/hooks/user/useMe";

import { ChatMessage, MessageReadEvent } from "@src/types/chat";

interface Props {
  roomId: string;
}

export default function ChatRoom({ roomId }: Props) {
  const { messages, setMessages, loading } = useChatMessages(roomId);
  const { read } = useReadChatRoom();
  const { data: me, isLoading, error } = useMyProfile();
  const myUserId = me?.id;
  const [input, setInput] = useState("");
 

  const { send, sending } = useSendChatMessage();

  const sendMessage = async () => {
    if (!input.trim() || sending) return;

    try {
      await send(roomId, input);
      setInput("");
    } catch (e) {
      console.error("메시지 전송 실패", e);
    }
  };
  /* ===============================
   * 초기 메시지 로딩 후 읽음 처리
   * =============================== */
  useEffect(() => {
    if (!messages.length) return;

    const lastMessageId = messages[messages.length - 1].id;
    read(roomId, lastMessageId);
  }, [messages, roomId, read]);

  /* ===============================
   * Socket.IO 실시간 처리
   * =============================== */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return; // 토큰 없음 등 예외 케이스

    /* --- 연결 완료 후 방 입장 --- */
    const handleConnect = () => {
      console.log("✅ socket connected:", socket.id);
      socket.emit("join_room", roomId);
    };

    const handleDisconnect = (reason: Socket.DisconnectReason) => {
      console.log("❌ socket disconnected:", reason);
    };

    const handleConnectError = (err: Error) => {
      console.error("❌ socket connect_error:", err.message);
    };

    const handleReceiveMessage = (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
      read(roomId, message.id);
    };

    const handleMessageRead = (data: MessageReadEvent) => {
      if (data.userId === myUserId) return;
      console.log("상대가 읽음:", data);
    };

    /* --- 이벤트 바인딩 --- */
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    socket.on("receive_message", handleReceiveMessage);
    socket.on("message_read", handleMessageRead);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);

      socket.off("receive_message", handleReceiveMessage);
      socket.off("message_read", handleMessageRead);
    };
  }, [roomId, myUserId,  setMessages, read]);

  if (loading) return <div>로딩 중...</div>;
  return (
    <div className="flex flex-col h-full">
      {/* ===============================
       * 메시지 리스트
       * =============================== */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m) => {
          //  내 / 상대 메시지 구분
          const isMine = m.sender_id === myUserId;

          return (
            <div
              key={m.id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-[70%] ${
                  isMine ? "bg-main text-white" : "bg-gray-200 text-black"
                }`}
              >
                {m.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===============================
       * 입력창
       * =============================== */}
      <div className="flex gap-2 p-3 border-t">
        <input
          value={input}
          disabled={sending} // 전송 중 비활성화
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          className="flex-1 border rounded px-3 py-2"
          placeholder="메시지를 입력하세요"
        />

        <button
          onClick={sendMessage}
          disabled={sending || !input.trim()}
          className="px-4 py-2 bg-main text-white rounded disabled:opacity-50"
        >
          보내기
        </button>
      </div>
    </div>
  );
}
