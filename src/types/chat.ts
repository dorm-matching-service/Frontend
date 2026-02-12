export interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  created_at: string; // ISO string으로 들어옴
}


export interface MessageReadEvent {
  roomId: string;
  userId: string;
  messageId: string;
}

export interface ChatRoomListItem {
  roomId: string;

  opponent: {
    id: string;
    email: string;
    age: number | null;
    department: string | null;
  };

  lastMessage: {
    id: string;
    content: string;
    createdAt: string;
  } | null;

  unreadCount: number;
}

export interface ChatRoomListResponse {
  count: number;
  rooms: ChatRoomListItem[];
}
