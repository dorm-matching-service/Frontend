"use client";

import { useMatching } from "@src/hooks/matching/useMatching";

import MatchProfileCard from "./_components/MatchProfileCard";
import NoMatchingResult from "./_components/NoMatchingResult";

import Button from "@src/components/ui/Button";


export default function MatchingPage() {

  const { data, loading, error, rematch, setData } = useMatching();



  if (loading) {
    return <div>매칭 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  if (!data) {
    return <div>매칭 데이터를 불러오지 못했습니다.</div>;
  }

  const handleLikeChange = (userId: string, liked: boolean) => {
    setData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        results: prev.results.map((item) =>
          item.userId === userId ? { ...item, isLiked: liked } : item
        ),
      };
    });
  };

  // 매칭 로직 실행했는데 결과가 0 일 때 NoMatchingResult 띄움
  if (data.count === 0) {
    return <NoMatchingResult onRelaxedRematch={() => rematch("relaxed")} />;
  }

  // 기존 혹은 새 매칭 결과가 있을 때
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-800 text-24 font-medium">
          매칭률이 놓은 룸메이트 {data.count} 명을 찾았어요!
        </p>

        <p className="text-gray-900 text-24 font-bold">
          마음에 드는 카드를 눌러 자세히 알아보세요.
        </p>
      </div>

      <ul className="w-full flex items-center justify-center gap-6">
        {data.results.slice(0, 3).map((match) => (
          <li key={match.userId}>
            <MatchProfileCard data={match} onLikeChange={handleLikeChange} />
          </li>
        ))}
      </ul>

      <Button
        onClick={() => rematch("normal")}
        className="flex items-center justify-center gap-2 rounded-[15px] bg-main max-w-[200px]"
      >
        <img src="/rematch.svg" alt="재 매칭" className="w-[26px] h-[24px]" />
        다음 룸메이트 보기
      </Button>
    </div>
  );
}
