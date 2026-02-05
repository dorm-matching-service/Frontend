import { useRef, useState } from "react";
import { readChatRoom } from "@src/apis/chat";

export function useReadChatRoom() {
  const [reading, setReading] = useState(false);

  // 마지막으로 읽음 처리한 메시지 ID 기억
  const lastReadMessageIdRef = useRef<string | null>(null);

  const read = async (roomId: string, lastMessageId: string) => {
    // 같은 메시지면 다시 안 보냄
    if (lastReadMessageIdRef.current === lastMessageId) return;

    if (reading) return;

    setReading(true);
    try {
      await readChatRoom({ roomId, lastMessageId });
      lastReadMessageIdRef.current = lastMessageId;
    } finally {
      setReading(false);
    }
  };

  return {
    read,
    reading,
  };
}
