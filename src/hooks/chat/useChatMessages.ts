import { useEffect, useState } from "react";
import { fetchChatMessages } from "@src/apis/chat";
import { ChatMessage } from "@src/types/chat";

export function useChatMessages(roomId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchChatMessages(roomId).then((data) => {
      if (cancelled) return;
      setMessages(data);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [roomId]);
  return {
    messages,
    setMessages,
    loading,
  };
}
