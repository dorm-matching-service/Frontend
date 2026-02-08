import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@src/apis/user";
export function useMyProfile() {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 30,    // 30분
    retry: false,             // 401 등에서 재시도 X
  });
}