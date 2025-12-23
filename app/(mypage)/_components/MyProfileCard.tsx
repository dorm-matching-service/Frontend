import ProfileBox from "@/components/ui/profile/ProfileBox";
import ProfileBody from "@/components/ui/profile/ProfileBody";

interface MyProfileCardProps {
  user: {
    major: string;
    age: number;
    wakeTime: string;
    sleepTime: string;
    tags?: string[];
  };
}

export default function MyProfileCard({ user }: MyProfileCardProps) {
  return (
    <ProfileBox>
      <ProfileBody
        major={user.major}
        age={user.age}
        wakeTime={user.wakeTime}
        sleepTime={user.sleepTime}
        tags={user.tags}
      />
    </ProfileBox>
  );
}
