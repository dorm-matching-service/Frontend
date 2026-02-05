"use client";

import { useChatMessages } from "@src/hooks/chat/useChatMessages";
import { useSendChatMessage } from "@src/hooks/chat/useSendChatMessage";
import { useReadChatRoom } from "@src/hooks/chat/useReadChatRoom";
import { useEffect, useState } from "react";
import { getSocket } from "../../../../lib/socket";

import { ChatMessage, MessageReadEvent } from "@src/types/chat";

interface Props {
  roomId: string;
}

export default function ChatRoom({ roomId }: Props) {
  const { messages, setMessages, loading } = useChatMessages(roomId);
  const { read } = useReadChatRoom();

  const [input, setInput] = useState("");
  const myUserId = "me";

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

  //  초기 로딩 완료 후 마지막 메시지까지 읽음 처리
  useEffect(() => {
    if (!messages.length) return;

    const lastMessageId = messages[messages.length - 1].id;
    read(roomId, lastMessageId);
  }, [messages, roomId, read]);

  //socket 실시간 처리
  useEffect(() => {
    const socket = getSocket();

    const handleReceiveMessage = (message: ChatMessage) => {
      // [유지/개선] 정렬 포함해서 상태 반영
      setMessages((prev) =>
        [...prev, message].sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        ),
      );

      read(roomId, message.id);
    };

    const handleMessageRead = (data: MessageReadEvent) => {
      console.log("상대가 읽음:", data);
    };

    const handleConnectError = (err: Error) => {
      console.error("socket error:", err.message);
    };

    socket.emit("join_room", roomId);

    socket.on("receive_message", handleReceiveMessage);
    socket.on("message_read", handleMessageRead);
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("message_read", handleMessageRead);
      socket.off("connect_error", handleConnectError);
    };
  }, [roomId, setMessages, read]);
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
