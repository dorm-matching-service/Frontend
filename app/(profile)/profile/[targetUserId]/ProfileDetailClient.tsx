"use client";

import { useUserWholeSurvey } from "@src/hooks/checklist/useUserWholeSurvey";
import ProfileDetailHeader from "../_components/ProfileDetailHeader";

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


    

    <ProfileDetailHeader department={survey.department} age={survey.age}  tags={survey.selfTags}/>

      {/* 나머지 필드는 이후 추가 */}
    </div>
  );
}
