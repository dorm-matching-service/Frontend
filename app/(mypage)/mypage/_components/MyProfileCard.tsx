"use client";
import { useRouter } from "next/navigation";

import ProfileBox from "@src/components/ui/profile/ProfileBox";
import ProfileBody from "@src/components/ui/profile/ProfileBody";

import Button from "@src/components/ui/Button";

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

      <Button variant="primary" onClick={handleClick} className="w-full h-[50px] text-18">
        상세보기
      </Button>
    </ProfileBox>
  );
}
