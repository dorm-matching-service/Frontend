"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex max-w-[1280px] justify-between py-10">
        <div className="flex items-center">
          <Link href="/" className="flex gap-2 mr-20">
            <img src="/Knock.svg" alt="Knock 로고" className="h-6 w-auto" />
          </Link>
        </div>

        <div className="flex items-center gap-6 text-m text-[#1B1B1B]">
          
          {/* 채팅 */}
          <Link
            href="/chat"
            className="flex items-center gap-1 hover:text-emerald-500"
          >
            <img src="/messageicon.svg" alt="채팅 아이콘" className="h-6 w-6" />
            <span className="text-20">채팅</span>
          </Link>

          {/* 마이페이지 */}
          <Link
            href="/mypage"
            className="flex items-center gap-1 hover:text-emerald-500"
          >
            <img src="/user.svg" alt="마이 아이콘" className="h-6 w-6" />
            <span className="text-20">마이</span>
          </Link>

        </div>
      </div>
    </header>
  );
}
