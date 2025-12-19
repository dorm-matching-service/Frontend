"use client";

import MatchProfileCard from "../_components/MatchProfileCard";
import { useMatching } from "@/hooks/matching/useMatching";
import { matchingDummy } from "./mock/matchingDummy";

export default function MatchingPage() {
  const { data, loading, error } = useMatching();

  const dummyResults = matchingDummy.results;

  if (loading) {
    return <div>매칭 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  if (!data) return <div>결과가 없습니다.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <p className="text-gray-800 text-24 font-medium">
        매칭률이 놓은 룸메이트 {data.count} 명을 찾았어요!
      </p>

      <p className="text-gray-900 text-24 font-bold">
        마음에 드는 카드를 눌러 자세히 알아보세요.
      </p>

      <ul className="w-full flex items-center justify-center gap-6">
        {/* {data.results.map((match, idx) => (
          <li key={idx}>
            <MatchProfileCard data={match} />
          </li>
        ))} */}

        {dummyResults.map((match, idx) => (
          <li key={idx}>
            <MatchProfileCard data={match} />
          </li>
        ))}
      </ul>

      <button className="flex items-center justify-center gap-2 rounded-[15px] bg-main min-w-[296px] min-h-[65px]">
        <img src="/rematch.svg" alt="" className="w-[26px] h-[24px]" />
        <span className="text-white text-16 font-bold w-min-[296px] h-min-[65px]">
          다음 룸메이트 보기
        </span>
      </button>
    </div>
  );
}
