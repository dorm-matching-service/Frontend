"use client";
import Button from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";
import { useChecklistStatus } from "@/src/hooks/checklist/useChecklistStatus";

export default function MainHeroSection() {
  const router = useRouter();

  const { hasChecklist, loading } = useChecklistStatus();

  const handleClick = () => {
    if (loading) return;

    if (hasChecklist) {
      //체크리스트 완료 → 매칭 페이지
      router.push("/matching");
    } else {
      //미완료 → 체크리스트 페이지
      router.push("/checklist");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-20 min-h-[1100px]">
      <p className="text-24 text-gray-800">
        기숙사 라이프스타일 기준으로 편안한 룸메를 연결합니다.
      </p>
      <p className="text-40 text-gray-900">
        기숙사 생활, 잘 맞는 사람과 시작하고 싶은 당신을 위한
      </p>
      <p className="text-40 text-gray-900 font-bold">
        룸메이트 매칭 서비스 Knock
      </p>
      <Button variant="primary" className="mt-16" onClick={handleClick}>
        룸메 매칭 시작하기
      </Button>
    </div>
  );
}
