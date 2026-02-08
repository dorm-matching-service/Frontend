// src/hooks/user/useMe.ts
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@src/apis/user";

export function useFetchMe() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: false,
  });

  return {
    user: data ?? null,
    loading: isLoading,
    isError,
  };
}
