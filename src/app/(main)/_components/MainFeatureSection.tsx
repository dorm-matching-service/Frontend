import FeatureCard from "./FeatureCard";

export default function MainFeatureSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#F6FFFE] py-28 min-h-[1100px]">
      <img
        src="/mainpageicon.svg"
        alt="메인페이지아이콘"
        className="h-[233px] w-[233px]"
      />

      <p className="font-bold text-36">Knock은 이런 서비스에요</p>

      <div className="flex gap-4 mt-10">
        <FeatureCard
          title="생활 패턴 기반 매칭"
          description="기상·취침 시간, 생활 습관을 바탕으로 룸메이트를 추천해요"
        />
        <FeatureCard
          title="안심 매칭"
          description="학교 이메일로만 가입해 같은 기숙사 친구끼리 연결돼요"
        />
        <FeatureCard
          title="매칭 리포트 확인"
          description="매칭 리포트로 서로의 생활 성향과 공통점을 한눈에 확인해요"
        />
      </div>

    </div>
  );
}
