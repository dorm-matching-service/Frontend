import ProfileDetailBox from "./ProfileDetailBox";
import TagList from "@src/components/ui/profile/TagList";
import ActionButton from "./Button";

interface ProfileDetailHeaderProps {
  department: string | null;
  age: number | null;
  tags: string[];
}

export default function ProfileDetailHeader({
  department,
  age,
  tags,
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
        hasChatRoom={false} 
        isMatched={false} 
        onChat={() => console.log("채팅하기 클릭")}
        onMatch={() => console.log("매칭하기 클릭")}
      />
    </ProfileDetailBox>
  );
}
