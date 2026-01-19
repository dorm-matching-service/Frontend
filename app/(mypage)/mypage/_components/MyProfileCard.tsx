"use client";
import { useRouter } from "next/navigation";

import ProfileBox from "@/components/ui/profile/ProfileBox";
import ProfileBody from "@/components/ui/profile/ProfileBody";

import Button from "@/components/ui/Button";

export interface MyProfileCardItem {
  major: string;
  age: number;
  wakeTime: string;
  sleepTime: string;
  tags?: string[];
}

interface MyProfileCardProps {
  data: MyProfileCardItem;
}

export default function MyProfileCard({ data }: MyProfileCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/mypage/checklist-edit");
  };
  return (
    <ProfileBox>
      <ProfileBody
        major={data.major}
        age={data.age}
        wakeTime={data.wakeTime}
        sleepTime={data.sleepTime}
        tags={data.tags}
      />

      <Button variant="primary" onClick={handleClick}>
        상세보기
      </Button>
    </ProfileBox>
  );
}
