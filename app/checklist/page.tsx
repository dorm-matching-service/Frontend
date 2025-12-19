import Link from "next/link";

export default function ChecklistIntroPage() {
  return (
    <div className="flex justify-center">
      <section className="w-full  bg-white p-10 ">
        <p className="text-center text-sm text-[#4CB7A5]">
          라이프 스타일 테스트
        </p>
        <h1 className="mt-2 text-center text-2xl font-semibold  text-gray-900">
          라이프스타일 매칭 테스트로 <br />
          함께 살기 좋은 룸메를 미리 만나보세요!
        </h1>
        <p className="mt-3 text-center text-sm text-[#5F5F5F]">
          <span className=" text-[#4CB7A5]">단 18문항!</span> 생활 습관 기반으로
          매칭 결과까지 한 번에
        </p>

        <div className="mt-10 flex justify-center">
          <div className="flex h-32 w-32 items-center justify-center ">
            <img src="checklisticon.svg" alt="체크리스트 아이콘" className="w-[128px] h-[128px]" />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/checklist/lifestyle-test"
            className="mb-10 rounded-lg bg-[#4CB7A5] px-8 py-3 text-sm font-bold text-[#FEFEFE] "
          >
            라이프 스타일 체크시작
          </Link>
        </div>
      </section>
    </div>
  );
}
