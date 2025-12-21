"use client";

import { useRouter } from "next/navigation";

import { fetchMatchingResult } from "@/apis/matching";

import Button from "@/components/ui/Button";

export default function NoMatchingResult() {
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  const relaxedMatching = async () => {
    await fetchMatchingResult("relaxed");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <p className="text-24 font-bold">지금은 추천할 룸메이트가 없어요</p>
      <p className="text-16 font-normal text-gray-800">
        매칭률이 조금 낮은 사람과 먼저 연결해볼까요?
      </p>

      <img
        src="/nomatchingresult.svg"
        alt="매칭 결과 없음 아이콘"
        className="w-[181px] h-[181px]"
      />

      <div className="flex gap-8">
        <Button variant="secondary" onClick={goToHome}>
          메인 홈으로 가기
        </Button>

        <Button variant="primary" onClick={relaxedMatching}>
          재매칭 시작
        </Button>
      </div>
    </div>
  );
}
