import MyPageProfileCard from "./MyPageProfileCard";
import { LikedProfileCard } from "@src/types/like";

interface InterestedProfileSectionProps {
 profiles: LikedProfileCard[]; 
  onLikeChange: (userId: string, liked: boolean) => void;
}

export default function InterestedProfileSection({
  profiles,
  onLikeChange,
}: InterestedProfileSectionProps) {
  return (
    <div className="flex flex-col w-full border shadow-profileCard rounded-[15px] p-6 space-y-6">
      <div className="flex justify-between">
        <section className="flex">
          <h2>
            관심 프로필
            <span className="font-bold text-18 text-main"> {profiles.length}</span>
          </h2>
        </section>
        <p>관심 프로필 모두 보기 &gt;</p>
      </div>
      <ul className="flex gap-6">
        {profiles.slice(0, 3).map((card) => (
          <li key={card.userId}>
            <MyPageProfileCard
              data={card}
              onLikeChange={onLikeChange}
              actionLabel="상세보기"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
