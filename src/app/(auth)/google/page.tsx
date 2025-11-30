"use client";

import AuthBox from "../_components/AuthBox";
import AuthLoginButton from "../_components/AuthLoginButton";
import { useRouter } from "next/navigation";

export default function StartKnockPage() {
  const router = useRouter();

  return (
    <div>
      <AuthBox>
        <div className="flex flex-col items-center justify-center gap-3">
          <img src="/Knock.svg" alt="Knock" />
          <p className=" text-gray-900 font-bold text-24">
            똑똑! 룸메 만나러 왔어요
          </p>

          <p className=" text-accent text-16 pt-10 pb-10">
            *학교 이메일로 가입해주세요*
          </p>

          <AuthLoginButton onClick={() => router.push("/google/email")}>
            학교 이메일로 계속하기
          </AuthLoginButton>
        </div>
      </AuthBox>
    </div>
  );
}
