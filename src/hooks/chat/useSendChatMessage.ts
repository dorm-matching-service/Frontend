// useSendChatMessage.ts
import { useState } from "react";
import { sendChatMessage } from "@src/apis/chat";

export function useSendChatMessage() {
  const [sending, setSending] = useState(false);

  const send = async (roomId: string, content: string) => {
    if (!content.trim() || sending) return;

    setSending(true);
    try {
      await sendChatMessage({ roomId, content });
    } finally {
      setSending(false);
    }
  };

  return {
    send,
    sending,
  };
}
