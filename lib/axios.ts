//모든 API 요청에 자동으로 Bearer token 설정해주는 코드
import axios from "axios";
import { getAccessToken } from "./auth";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // refresh_token이 쿠키로 올 경우 필요
});

// 요청 인터셉터: 매 요청마다 Authorization 헤더 넣기
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
