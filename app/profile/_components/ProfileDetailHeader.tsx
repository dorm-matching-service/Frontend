import ProfileDetailBox from "./ProfileDetailBox";
import TagList from "@src/components/ui/profile/TagList";
import ActionButton from "./Button";

interface ProfileDetailHeaderProps {
  department: string | null;
  age: number | null;
  tags: string[];

  isLiked: boolean;

  // 매칭/채팅 상태
  matchStatus: "PENDING" | "MATCHED" | "REJECTED" | null;
  hasRequested: boolean;
  canRespond: boolean;
  canRequest: boolean;
  hasChatRoom: boolean;

  // 액션
  onRequestMatch: () => void;
  onStartChat: () => void;
  onGoChat: () => void;
}

export default function ProfileDetailHeader({
  department,
  age,
  tags,

  matchStatus,
  hasRequested,
  canRespond,
  canRequest,
  hasChatRoom,

  onRequestMatch,
  onStartChat,
  onGoChat,
}: ProfileDetailHeaderProps) {
  return (
    <ProfileDetailBox>
      <p>
        {department} {age}살
      </p>

      <div>
        <TagList tags={tags} />
      </div>

      <ActionButton
        matchStatus={matchStatus}
        hasRequested={hasRequested}
        canRespond={canRespond}
        canRequest={canRequest}
        hasChatRoom={hasChatRoom}
        onRequestMatch={onRequestMatch}
        onStartChat={onStartChat}
        onGoChat={onGoChat}
      />
    </ProfileDetailBox>
  );
}
