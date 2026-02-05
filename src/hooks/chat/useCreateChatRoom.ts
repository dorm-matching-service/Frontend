import { useRouter } from "next/navigation"; 
import { createChatRoom } from "@src/apis/chat";


export default function useCreateChatRoom(opponentId: string) {
  const router = useRouter();

  const startChat = async () => {
    if (!opponentId) {
        throw new Error("opponentId 없습니다")
    }

    const { roomId } = await createChatRoom(opponentId);

    //채팅방으로 이동
    router.push(`/chats/${roomId}`);
  };

  return {
    startChat,
  }
}
