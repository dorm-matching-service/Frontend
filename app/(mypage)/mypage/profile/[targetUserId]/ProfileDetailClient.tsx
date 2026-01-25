"use client";

import { useUserWholeSurvey } from "@/hooks/checklist/useUserWholeSurvey";

interface ProfileDetailClientProps {
    targetUserId: string;
}
export default function ProfileDetailClient({
  targetUserId
}: ProfileDetailClientProps) {

  const { survey, exists, isLiked, loading, error } =
    useUserWholeSurvey(targetUserId);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생</div>;
  }

  if (!exists || !survey) {
    return <div>설문 정보가 없습니다</div>;
  }

  return (
    <div>
      <h1>프로필 상세</h1>

      {isLiked && <div>❤️ 관심 있음</div>}

      {/* 설문 데이터 렌더링 */}
      <div>나이: {survey.age}</div>
      <div>학과: {survey.department}</div>

      {/* 나머지 필드는 이후 추가 */}
    </div>
  );
}
