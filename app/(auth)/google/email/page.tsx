"use client";
export const dynamic = "force-dynamic";

import useEmailStart from "@src/hooks/auth/useEmailStart";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthBox from "../../_components/AuthBox";
import AuthInput from "../../_components/AuthInput";
import Button from "@src/components/ui/Button";
import AuthPopup from "../../_components/AuthPopup";
import { useRouter } from "next/navigation";

interface EmailForm {
  email: string;
}

export default function EmailPage() {
  const router = useRouter();

  //팝업 메세지 관리 state 없거나 즉 null이거나 string 값이다
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  //성공/실패 구분 상태 추가
  const [popupType, setPopupType] = useState<"success" | "error" | null>(null);

  //성공 시 보낼 이메일 저장하는 state
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const [expiresAt, setExpirseAt] = useState<string | null>(null);

 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
    mode: "onChange", //입력 즉시 유효성 검사
  });

  const { mutate, isPending, data, error } = useEmailStart({
    //사용자가 볼 성공 에러 문자
    //onSuccess: (data, variables, context) => {} 이므로 두 번째 파라미터인 variables 만 사용하기 위함
    onSuccess: (data, variable) => {
      console.log("onSuccess 실행됨!", data);
      setSentEmail(variable.email);// 이메일 저장
      setExpirseAt(data.expiresAt);
      setPopupType("success");//인증 성공 표시
      setPopupMessage("인증 코드가 이메일로 전송되었습니다");
    },
    onError: () => {
      setPopupType("error"); // 인증 실패 표시
      setPopupMessage("요청 중 오류가 발생했습니다.");
    },
  });

   const handlePopupClose = () => {
    setPopupMessage(null);

    // 성공 팝업일 때만 이동하게 함
    if (popupType === "success" && sentEmail) {
      router.push(`/google/email/verify?email=${sentEmail}&expiresAt=${expiresAt}`);
    }

    // popupType 초기화
    setPopupType(null);
  };


  const onValid = (data: EmailForm) => {
    mutate(data.email); // data.email이 실제 입력된 값
  };

  return (
    <div className="flex flex-col">
      <p className="text-gray-900 font-bold  text-center mb-6 text-32">
        Knock서비스 이용을 위해 <br />
        이메일 인증이 필요해요
      </p>
      <AuthBox>
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-3">
          <p className="self-start text-gray-900 font-bold text-24">
            학교 이메일 입력
          </p>
          <p className="self-start text-gray-600 text-16">
            올바른 양식에 맞춰 학교 이메일을 입력해주세요
          </p>
          <AuthInput
            type="email"
            placeholder="you@bu.ac.kr"
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@bu\.ac\.kr$/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            })}
          ></AuthInput>
          <p className="h-5 text-accent text-16 ml-1 min-h-[20px]">
            {errors.email?.message || ""}
          </p>

          <Button type="submit" disabled={isPending}>
            {isPending ? "전송 중…" : "인증 코드 받기"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          이미 코드를 받았다면{" "}
          <a href="/google/email/verify" className="text-main hover:underline">
            여기에서 인증하기
          </a>
        </p>

        {/* 사용자 요청 성공 실패 팝업 창 */}
        {popupMessage && (
          <AuthPopup
            message={popupMessage}
            onClose={handlePopupClose}
          />
        )}
      </AuthBox>
    </div>
  );
}
