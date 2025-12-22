import PreferenceTag from "./PreferenceTag";
import type { MatchingCardItem } from "@/types/matching";

interface MatchProfileCardProps {
  data: MatchingCardItem;
}

export default function MatchProfileCard({ data }: MatchProfileCardProps) {
  const tags = data.tags.slice(0, 5);

  return (
    <div className="shadow-profileCard w-[300px] rounded-[15px] overflow-hidden">
      <div className=" flex flex-col gap-5 px-6 py-6 justify-center">
        <div className="w-full flex justify-between items-center">
          {/* 매칭 점수를 매칭률로 표현 */}
          <span className="text-main font-bold text-16 ">
            매칭률 {data.matchingScore}%
          </span>

          {/* 아직 매칭 리포트 버튼 구현 안함 ui만 */}
          <button className="border-main text-main font-medium text-16 border px-1 py-1 rounded-[15px]">
            매칭 리포트
          </button>
        </div>

        <div className="flex flex-col">
          {/* 백엔드에서 닉네임 User테이블에 추가하면 이 자리에 p 태그로 유저 닉네임 추가해야함 */}
          
          <p className="font-medium text-16">{`${data.major} ${data.age}살`}</p>
        </div>

        <div className="text-gray-900 flex flex-col w-full">
          

          {/* 기상 시간 */}
          <div className="flex items-center gap-2">
            <img
              src="/sun.svg"
              alt="기상 시간"
              className="w-[15.51px] h-[15.51px]"
            />
            <span className="w-[64px]">기상 시간</span>
            <span className="tabular-nums">{data.wakeTime}</span>
          </div>

          {/* 취침 시간 */}
          <div className="flex items-center gap-2">
            <img
              src="/moon.svg"
              alt="취침 시간"
              className="w-[15.51px] h-[15.51px]"
            />
            <span className="w-[64px]">취침 시간</span>
            <span className="tabular-nums">{data.sleepTime}</span>
          </div>
        </div>

        {data.tags.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {tags.map((tag) => (
              <PreferenceTag key={tag} content={tag} />
            ))}
          </div>
        )}

        <div className="w-full flex justify-between">
          <img
            src="/like.svg"
            alt="취침 시간"
            className="w-[18.05px] h-[15.75px]"
          />

          <button className="text-15 font-medium text-gray-600">
            자세히 보기 &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
