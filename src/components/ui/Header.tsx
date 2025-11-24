"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-10">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/Knock.svg"
            alt="Knock 로고"
            className="h-6 w-auto"
          />
        </Link>

        <nav className="flex gap-8 text-m text-[#5F5F5F]">
          <button className="hover:text-[#1B1B1B]">노크란?</button>
          <button className="hover:text-[#1B1B1B]">FAQ</button>
          <button className="hover:text-[#1B1B1B]">공지사항</button>
        </nav>
        <div className="flex items-center gap-6 text-m text-[#1B1B1B]">
          <button className="flex items-center gap-1 hover:text-emerald-500">
            <img
              src="/messageicon.svg"
              alt="채팅 아이콘"
              className="h-5 w-5"
            />
            <span>채팅</span>
          </button>
          <button className="flex items-center gap-1 hover:text-emerald-500">
            <img
              src="/user.svg"
              alt="마이 아이콘"
              className="h-5 w-5"
            />
            <span>마이</span>
          </button>
        </div>
      </div>
    </header>
  );
}
