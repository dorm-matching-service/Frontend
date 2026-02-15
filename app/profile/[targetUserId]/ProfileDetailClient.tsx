"use client";
import { useRouter } from "next/navigation";

import useMatchStatusWithUser from "@src/hooks/matching/useMatchStatusWithUser";
import { useUserWholeSurvey } from "@src/hooks/checklist/useUserWholeSurvey";
import ProfileDetailHeader from "../_components/ProfileDetailHeader";
import useCreateChatRoom from "@src/hooks/chat/useCreateChatRoom";
import ProfileSection from "../_components/ProfileSection";
import TagList from "@src/components/ui/profile/TagList";

interface ProfileDetailClientProps {
  targetUserId: string;
}

export default function ProfileDetailClient({
  targetUserId,
}: ProfileDetailClientProps) {
  const router = useRouter();

  const {
    survey,
    exists,
    isLiked,
    loading: surveyLoading,
    error: surveyError,
  } = useUserWholeSurvey(targetUserId);

  const {
    status,
    loading: statusLoading,
    error: statusError,
  } = useMatchStatusWithUser(targetUserId);

  const { startChat } = useCreateChatRoom(targetUserId);
  if (!status) {
    return <div>로딩 중...</div>;
  }

  if (surveyLoading || statusLoading) {
    return <div>로딩 중...</div>;
  }

  if (surveyError || statusError) {
    return <div>에러 발생</div>;
  }

  if (!exists || !survey) {
    return <div>설문 정보가 없습니다</div>;
  }

  const handleRequestMatch = () => {
    console.log("룸메 요청");
  };

  const handleStartChat = async () => {
    try {
      await startChat();
    } catch (e) {
      alert("채팅 시작 실패");
    }
  };

  const handleGoChat = () => {
    if (!status.chatRoomId) {
      alert("채팅방 정보가 없습니다");
      return;
    }

    router.push(`/chat/${status.chatRoomId}`);
  };

  const mbti = `${survey.mbti1}${survey.mbti2}${survey.mbti3}${survey.mbti4}`;

  const formatTime = (minutes: number) => {
    const hour = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hour.toString().padStart(2, "0")}:${min
      .toString()
      .padStart(2, "0")}`;
  };

  const wakeTime = formatTime(survey.wakeTimeMinutes);
  const sleepTime = formatTime(survey.sleepTimeMinutes);
  return (
  <div className="px-6 py-8 bg-gray-50 min-h-screen space-y-6">

    <ProfileDetailHeader
      department={survey.department}
      age={survey.age}
      tags={survey.selfTags}
      isLiked={isLiked}
      matchStatus={status.matchStatus}
      hasRequested={status.hasRequested}
      canRespond={status.canRespond}
      canRequest={status.canRequest}
      hasChatRoom={status.hasChatRoom}
      onRequestMatch={handleRequestMatch}
      onStartChat={handleStartChat}
      onGoChat={handleGoChat}
    />

    {/* 2컬럼 레이아웃 */}
    <div className="grid grid-cols-2 gap-6">

      {/* 기본정보 */}
      <ProfileSection title="기본정보">
        <div className="space-y-2 text-sm">
          <p>나이: {survey.age}살</p>
          <p>학부: {survey.department}</p>
          <p>성별: {survey.gender}</p>
          <p>MBTI: {mbti}</p>
        </div>
      </ProfileSection>

      {/* 취미 */}
      <ProfileSection title="취미">
        <div className="space-y-2 text-sm">
          <p>게임 빈도: {survey.gamingTime}</p>
          <p>음주 빈도: {survey.drinkFreq}</p>
          <p>외출 빈도: {survey.outgoingFreq}</p>
          <div className="mt-2">
            <TagList tags={survey.hobbies} />
          </div>
        </div>
      </ProfileSection>

      {/* 생활패턴 */}
      <ProfileSection title="생활패턴">
        <div className="space-y-2 text-sm">
          <p>기상시간: {wakeTime}</p>
          <p>취침시간: {sleepTime}</p>
          <p>활동성향: {survey.activityLevel}</p>
        </div>
      </ProfileSection>

      {/* 위생청결 */}
      <ProfileSection title="위생청결">
        <div className="space-y-2 text-sm">
          <p>샤워 빈도: {survey.showerFreq}</p>
          <p>청소 빈도: {survey.cleaningFreq}</p>
        </div>
      </ProfileSection>

      {/* 생활습관 */}
      <ProfileSection title="생활습관">
        <TagList tags={survey.homeStyle} />
      </ProfileSection>

      {/* 룸메 바라는 점 */}
      <ProfileSection title="룸메에게 바라는 점">
        <p className="text-sm leading-relaxed">
          {survey.roommateWish}
        </p>
      </ProfileSection>

    </div>

  </div>
);

}
