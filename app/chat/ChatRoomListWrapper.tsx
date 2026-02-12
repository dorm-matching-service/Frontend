"use client";

import { useParams } from "next/navigation";
import ChatRoomList from "./ChatRoomList";

export default function ChatRoomListWrapper() {
  const params = useParams();
  console.log("params:", params);

  const selectedRoomId =
    typeof params?.roomId === "string" ? params.roomId : null;

  return <ChatRoomList selectedRoomId={selectedRoomId} />;
}
