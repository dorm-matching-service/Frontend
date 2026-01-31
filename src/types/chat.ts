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