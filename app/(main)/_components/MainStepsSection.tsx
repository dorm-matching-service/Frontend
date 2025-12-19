import StepCard from "./StepCard";

export default function MainStepsSection() {
  return (
    <div className="bg-main w-full flex flex-col rounded-t-[150px] py-20 items-center justify-center gap-14 min-h-[1100px]">
      <div className="flex flex-col gap-1 items-center justify-center">
        <p className="font-bold text-36">몇 단계만 거치면,</p>
        <p className="font-bold text-36">
          나와 꼭 맞는 룸메이트를 바로 만날 수 있어요
        </p>
        <p className="font-medium text-24">
          복잡한 절차는 이제 그만, 몇 가지 체크만으로 내 성향에 꼭 맞는
          룸메이트를 찾아드려요.
        </p>
      </div>

      <div className="flex gap-6">
        <StepCard
          stepNumber="Step.01"
          title="나를 표현하기"
          description="생활 습관과 취향을 간단히 체크해요.기숙사에서의 나를 보여주는 첫 단계예요"
        />
        <StepCard
          stepNumber="Step.02"
          title="맞춤형 매칭"
          description="입력한 정보를 바탕으로나와 가장 잘 맞는 룸메이트를 추천해드려요"
        />
        <StepCard
          stepNumber="Step.03"
          title="채팅으로 연결"
          description="마음에 드는 룸메와 대화하고서로의 룸메로 연결돼요"
        />
      </div>
    </div>
  );
}
