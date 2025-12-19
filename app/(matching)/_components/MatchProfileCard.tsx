import PreferenceTag from "./PreferenceTag";
import type { MatchingCardItem } from "@/types/matching";


interface MatchProfileCardProps {
  data: MatchingCardItem;
}


export default function MatchProfileCard({
  data
}: MatchProfileCardProps) {
  return (
    <div className="shadow-profileCard flex flex-col gap-2 px-6 py-6 bg-white items-center justify-center w-full max-w-[319px]">
      <div className="w-full flex justify-between">
       
        {/* 매칭 점수를 매칭률로 표현 */}
        <span className="text-main font-bold text-16">
          매칭률 {data.matchingScore}%
        </span>

        {/* 아직 매칭 리포트 버튼 구현 안함 ui만 */}
        <button className="bg-main font-medium text-16 rounded text-white">매칭 리포트</button>
      </div>
      <div className="flex flex-col text-gray-900">
        {/* 백엔드에서 닉네임 User테이블에 추가하면 이 자리에 p 태그로 유저 닉네임 추가해야함 */}
        <p className="font-medium text-16">{`${data.major} ${data.age}살`}</p>
      </div>
      <div className="text-gray-900">
        <div className="flex">
          <img
            src="/sun.svg"
            alt="기상 시간"
            className="w-[15.51px] h-[15.51px]"
          />
          <p>기상 시간 {data.wakeTime}</p>
        </div>
        <div className="flex">
          <img
            src="/moon.svg"
            alt="취침 시간"
            className="w-[15.51px] h-[15.51px]"
          />
          <p>취침시간 {data.sleepTime}</p>
        </div>
      </div>

      {data.tags.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          {data.tags.map((tag) => (
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

        <button className="text-15 font-medium text-gray-600">자세히 보기 &gt;</button>
      </div>
    </div>
  );
}
