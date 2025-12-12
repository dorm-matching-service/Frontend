"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import useEmailVerify from "@/src/hooks/auth/useEmailVerify";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import AuthButton from "../../../../../components/ui/Button";
import AuthInput from "../../../_components/AuthInput";
import AuthBox from "../../../_components/AuthBox";
import AuthPopup from "../../../_components/AuthPopup";

interface VerifyForm {
  code: string;
}

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const expiresAt = searchParams.get("expiresAt");
  const [timeLeft, setTimeLeft] = useState("");

  const rawEmail = searchParams.get("email");
  const email = rawEmail ? decodeURIComponent(rawEmail) : "";

  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyForm>();

  // useMutation으로 인증 처리
  const { mutate, isPending, isError, isSuccess, data, error } =
    useEmailVerify();

  useEffect(() => {
    if (!expiresAt) return;

    const timer = setInterval(() => {
      //diff는 만료시간 - 현재 시간 => 얼마나 시간이 남았는지 체크
      const diff = new Date(expiresAt).getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft("만료됨");
        clearInterval(timer);
        return;
      }

      //1000으로 나눠서 밀리초로 변환
      const min = Math.floor(diff / 1000 / 60);
      const sec = Math.floor((diff / 1000) % 60);

      //.padStart(2, "0") → 앞에 0을 붙여서 2자리로 만들기 padStart(길이, 채울문자)
      //초가 0~9이면 앞에 0을 붙여서 두 자리로 만들어줌.
      const formatted = `${min}:${sec.toString().padStart(2, "0")}`;
      setTimeLeft(formatted);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  const onValid = ({ code }: VerifyForm) => {
    if (!email) {
      setPopupMessage("이메일 정보가 없습니다. 다시 인증을 요청해주세요.");
      return;
    }
    console.log("verify payload", {
      email,
      code,
      emailType: typeof email,
      codeType: typeof code,
    });

    mutate(
      { email, code },
      {
        onSuccess: (res) => {
          console.log("verify response:", res);
          console.log("hasConsented:", res.hasConsented);
          //개인정보 동의 여부(hasConsented) 가 true면 메인 페이지로
          //false면 개인정보 동의 페이지로 이동
          if (res.hasConsented) {
            router.replace("/");
          } else {
            router.replace("/google/email/consent");
          }
        },
        onError: () => {
          setPopupMessage("인증 코드가 올바르지 않습니다.");
        },
      }
    );
  };

  return (
    <div className="flex flex-col">
      <p className="text-gray-900 font-bold text-center mb-6 text-32">
        Knock에서 이메일로 받은 <br /> 인증 코드를 입력해주세요
      </p>

      <AuthBox>
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-3">
          <p className="self-start text-gray-900 font-bold text-24">
            인증 코드 입력
          </p>

          <p className="self-start text-gray-600 text-16">
            인증 코드를 입력해주세요
          </p>

          <AuthInput
            rightAddon={timeLeft}
            type="text"
            inputMode="numeric"
            placeholder="6자리 코드"
            maxLength={6}
            {...register("code", {
              required: "코드를 입력해주세요.",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "올바른 숫자 코드를 입력해주세요.",
              },
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              },
            })}
          />

          <p className="h-5 text-accent text-16 ml-1 min-h-[20px]">
            {errors.code?.message || ""}
          </p>

          <AuthButton type="submit" disabled={isPending}>
            {isPending ? "확인 중…" : "코드 확인"}
          </AuthButton>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          코드가 안 오나요?{" "}
          <a href="/google/email" className="text-main hover:underline">
            다시 요청하기
          </a>
        </p>

        {popupMessage && (
          <AuthPopup
            message={popupMessage}
            onClose={() => setPopupMessage(null)}
          />
        )}
      </AuthBox>
    </div>
  );
}
