"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WithdrawalPage() {
  const router = useRouter();

  const [reason, setReason] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!checked) return;

    try {
      setLoading(true);

      // TODO: 실제 API 연결
      // await withdrawAccount({ reason });

      // 탈퇴 성공 시 → 완료 페이지로 이동
      router.replace("/mypage/withdrawal/success");
    } catch (error) {
      console.error("회원 탈퇴 실패", error);
      alert("회원 탈퇴에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[420px] mx-auto px-4 py-8">
      <h1 className="text-lg font-semibold mb-4">
        떠나시는 이유를 설명해주세요.
      </h1>

      <textarea
        className="w-full h-40 border rounded-md p-3 text-sm resize-none"
        placeholder={`서비스 탈퇴 사유에 대해 알려주세요.\n고객님의 소중한 피드백을 받아 더 나은 서비스로 보답 드리겠습니다.`}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <label className="flex items-center gap-2 mt-4 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        회원 탈퇴 유의사항을 확인하였으며 동의합니다.
      </label>

      <button
        onClick={handleWithdraw}
        disabled={!checked || loading}
        className={`mt-6 w-full h-12 rounded-md font-medium text-white
          ${
            checked
              ? "bg-teal-500 hover:bg-teal-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
      >
        {loading ? "처리 중..." : "탈퇴하기"}
      </button>
    </div>
  );
}
