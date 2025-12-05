// src/lib/socket.ts
import { io } from "socket.io-client";
import { getAccessToken } from "./auth";

export function createSocket() {
  return io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
    auth: {
      token: getAccessToken(), // 저장된 access_token 자동첨부
    },
  });
}

export const socket = createSocket();
