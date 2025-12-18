"use client";

import { useMatching } from "@/src/hooks/matching/useMatching";

export default function MatchingPage() {
  const { data, loading, error } = useMatching();

  if (loading) {
    return <div>매칭 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  if (!data) return <div>결과가 없습니다.</div>;

  return (
    <div>
      <h1>룸메이트 매칭 결과</h1>

      <p>총 {data.count}명 추천</p>

      <ul>
        {data.results.map((match) => (
          <li key={match.id}>
            <div>상대 유저 ID: {match.candidateId}</div>
            <div>최종 점수: {match.finalScore}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
