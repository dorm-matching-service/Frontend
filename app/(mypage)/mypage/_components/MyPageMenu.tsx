"use client";

import { useRouter } from "next/navigation";

const MY_PAGE_ROUTES = {
  REQUESTS: "/mypage/roommate-requests",
  LIKED: "/mypage/likes",
  HISTORY: "/mypage/history",
  CHAT: "/chat",
  ACCOUNT: "/mypage/account",
  CHECKLIST: "/mypage/checklist-edit",
} as const;

export default function MyPageMenu() {
  const router = useRouter();

  const go = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col w-[320px] border shadow-profileCard rounded-[15px] p-6 space-y-6">
      <section className="space-y-2">
        <h3 className="text-18 text-gray-900 font-bold">내 활동</h3>

        <p onClick={() => go(MY_PAGE_ROUTES.REQUESTS)} className="text-16 text-gray-700">
          요청함
        </p>
        <p onClick={() => go(MY_PAGE_ROUTES.LIKED)} className="text-16 text-gray-700">
          관심 프로필
        </p>
        <p onClick={() => go(MY_PAGE_ROUTES.HISTORY)} className="text-16 text-gray-700">
          지난 매칭 기록
        </p>
      
      </section>

      <section className="space-y-2">
        <h3 className="text-18 text-gray-900 font-bold">나의 정보</h3>

      
        <p onClick={() => go(MY_PAGE_ROUTES.CHECKLIST)} className="text-16 text-gray-700">
          체크리스트 수정
        </p>
      </section>
    </div>
  );
}
