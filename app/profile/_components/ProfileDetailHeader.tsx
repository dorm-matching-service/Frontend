import ProfileDetailBox from "./ProfileDetailBox";
import TagList from "@src/components/ui/profile/TagList";
import ActionButton from "./Button";

interface ProfileDetailHeaderProps {
  department: string | null;
  age: number | null;
  tags: string[];

  isLiked: boolean;

  matchStatus: "PENDING" | "MATCHED" | "REJECTED" | null;
  hasRequested: boolean;
  canRespond: boolean;
  canRequest: boolean;
  hasChatRoom: boolean;

  onRequestMatch: () => void;
  onStartChat: () => void;
  onGoChat: () => void;
}

export default function ProfileDetailHeader({
  department,
  age,
  tags,
  isLiked,

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
      {/* 상단: 이름 + 좋아요 */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <p className="text-lg font-semibold ">
            {department} {age}살
          </p>

          {/* 좋아요 버튼 */}
          <img
            src={isLiked ? "/redlike.svg" : "/emptylike.svg"}
            alt="찜 아이콘"
            className="w-[18px] h-[16px]"
          />
        </div>

        <div className="w-full">
          <div className="mt-2 flex justify-between">
            <TagList tags={tags} />
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
          </div>
        </div>
      </div>
    </ProfileDetailBox>
  );
}
