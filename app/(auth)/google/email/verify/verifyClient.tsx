// app/(auth)/google/email/verify/VerifyClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import useEmailVerify from "@/hooks/auth/useEmailVerify";
import Button from "@/components/ui/Button";
import AuthInput from "../../../_components/AuthInput";
import AuthBox from "../../../_components/AuthBox";
import AuthPopup from "../../../_components/AuthPopup";

interface VerifyForm {
  code: string;
}

export default function VerifyClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const expiresAt = searchParams.get("expiresAt");
  const rawEmail = searchParams.get("email");
  const email = rawEmail ? decodeURIComponent(rawEmail) : "";

  const [timeLeft, setTimeLeft] = useState("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyForm>();

  const { mutate, isPending } = useEmailVerify();

  useEffect(() => {
    if (!expiresAt) return;

    const timer = setInterval(() => {
      const diff = new Date(expiresAt).getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft("만료됨");
        clearInterval(timer);
        return;
      }

      const min = Math.floor(diff / 1000 / 60);
      const sec = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${min}:${sec.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  const onValid = ({ code }: VerifyForm) => {
    if (!email) {
      setPopupMessage("이메일 정보가 없습니다. 다시 인증을 요청해주세요.");
      return;
    }

    mutate(
      { email, code },
      {
        onSuccess: (res) => {
          router.replace(
            res.hasConsented ? "/" : "/google/email/consent"
          );
        },
        onError: () => {
          setPopupMessage("인증 코드가 올바르지 않습니다.");
        },
      }
    );
  };

  return (
    <div className="flex flex-col">
      {/* UI 그대로 */}
    </div>
  );
}
