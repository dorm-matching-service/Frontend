"use client";

import { useEffect, useState } from "react";
import { getSocket } from "../../../../lib/socket";

import { ChatMessage, MessageReadEvent } from "@src/types/chat";

interface Props {
  roomId: string;
}

interface SendMessagePayload {
  roomId: string;
  content: string;
}

export default function ChatRoom({ roomId }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const socket = getSocket();

    socket.emit("join_room", roomId);

    socket.on("receive_message", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);

      // 내가 보고 있는 상태라면 읽음 처리
      socket.emit("read_message", {
        roomId,
        messageId: message.id,
      });
    });

    socket.on("message_read", (data: MessageReadEvent) => {
      console.log("상대가 읽음:", data);
    });

    socket.on("connect_error", (err) => {
      console.error("socket error:", err.message);
    });

    return () => {
      socket.off("receive_message");
      socket.off("message_read");
      socket.off("connect_error");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const payload: SendMessagePayload = {
      roomId,
      content: input,
    };

    getSocket().emit("send_message", payload);
    setInput("");
  };

  return (
    <div>
      <div>
        {messages.map((m) => (
          <div key={m.id}>{m.content}</div>
        ))}
      </div>

      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>보내기</button>
    </div>
  );
}
