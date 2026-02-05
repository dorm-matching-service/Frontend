"use client";
import { useRouter } from "next/navigation";

import useMatchStatusWithUser from "@src/hooks/matching/useMatchStatusWithUser";
import { useUserWholeSurvey } from "@src/hooks/checklist/useUserWholeSurvey";
import ProfileDetailHeader from "../_components/ProfileDetailHeader";
import useCreateChatRoom from "@src/hooks/chat/useCreateChatRoom";

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
  return (
    <div>
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

      {/* 나머지 필드는 이후 추가 */}
    </div>
  );
}
