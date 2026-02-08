// lib/socket.ts
import { io, Socket } from "socket.io-client";
import { getAccessToken } from "./auth";

let socket: Socket | null = null;

export function getSocket() {
  const url = process.env.NEXT_PUBLIC_SOCKET_URL!;
  const token = getAccessToken();

  // 토큰 없으면 소켓 만들지 말고, 호출부에서 로그인 유도/대기
  if (!token) return null;

  if (!socket) {
    socket = io(url, {
      transports: ["websocket"],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 500,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      auth: { token }, // 최초 토큰
    });
  }

  // 매번 최신 토큰을 auth에 주입 (재연결/재접속 대비)
  socket.auth = { token: getAccessToken() };

  if (!socket.connected) {
    socket.connect();
  }
  return socket;
}
