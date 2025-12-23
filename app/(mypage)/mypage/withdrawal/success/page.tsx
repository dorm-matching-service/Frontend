"use client";

import { useRouter } from "next/navigation";

export default function WithdrawalSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-teal-500 mb-4">Knock</h1>

      <p className="text-lg font-semibold mb-2">
        회원탈퇴가 완료되었습니다.
      </p>

      <p className="text-sm text-gray-600 mb-6">
        함께한 시간 동안 Knock와 함께해주셔서 감사해요.
        <br />
        언제든 다시 편한 인연을 찾고 싶을 때 Knock이 기다리고 있을게요.
      </p>

      <button
        onClick={() => router.replace("/")}
        className="px-6 h-11 rounded-md bg-teal-500 text-white font-medium hover:bg-teal-600"
      >
        확인
      </button>
    </div>
  );
}
