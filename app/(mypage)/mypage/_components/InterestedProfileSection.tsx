import MatchProfileCard from "app/(matching)/matching/_components/MatchProfileCard";
import type { MatchingResponse } from "@/types/matching";

interface InterestedProfileSectionProps {
  data: MatchingResponse; 
  onLikeChange: (userId: string, liked: boolean) => void;
}


export default function InterestedProfileSection({
  data,
  onLikeChange,
}: InterestedProfileSectionProps) {
  return (
    <div className="flex flex-col w-full border shadow-profileCard rounded-[15px] p-6 space-y-6">
      <div className="flex justify-between">
        <section className="flex">
          <h2>
            관심 프로필
            <span className="font-bold text-18 text-main">{data.count}</span>
          </h2>
        </section>
        <p>관심 프로필 모두 보기 &gt;</p>
      </div>
      <ul className="flex gap-6">
        {data.results.slice(0, 3).map((profile) => (
          <li key={profile.userId}>
            <MatchProfileCard data={profile} onLikeChange={onLikeChange} />
          </li>
        ))}
      </ul>
    </div>
  );
}
