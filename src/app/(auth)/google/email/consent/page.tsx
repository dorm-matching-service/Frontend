"use client";
export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

import { useMe } from "@/src/hooks/user/useMe";
import { usePrivacyConsent } from "../../../../../hooks/auth/usePrivacyConsent";

import AuthBox from "../../../_components/AuthBox";
import AuthButton from "../../../../../components/ui/Button";
import AgreementAllCheck from "./_components/AgreementAllCheck";
import AgreementItem from "./_components/AgreementItem";
import AgreementModal from "./_components/AgreementModal";

export default function ConsentPage() {
  const router = useRouter();

  const { user, loading } = useMe();
  const { submitConsent } = usePrivacyConsent();

  //개인정보 동의 한 사람인지 페이지 렌더링 시 바로 거르는 가드 로직
  useEffect(() => {
    //me 조회 중
    if (loading) return;

    if (!user) {
      //로그인 안된 상태이므로 접근 불가하게 막음
      router.replace("/");
      return;
    }

    if (user.hasConsented) {
      // 이미 동의한 유저면 메인으로
      router.replace("/");
    }
  }, [loading, user, router]);

  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const allChecked = termsChecked && privacyChecked;

  // 전체동의 toggle
  const toggleAll = () => {
    const newVal = !allChecked;
    setTermsChecked(newVal);
    setPrivacyChecked(newVal);
  };

  const [openModal, setOpenModal] = useState<null | "terms" | "privacy">(null);

  return (
    <div className="flex flex-col">
      <AuthBox className="w-[700px] h-[600px] ">
        <div className="flex flex-col  gap-5">
          <p className=" text-gray-900 font-bold text-24 self-center mb-10">
            Knock 개인정보 수집 및 이용
          </p>

          <AgreementAllCheck checked={allChecked} onToggle={toggleAll} />
          <AgreementItem
            checked={termsChecked}
            onToggle={() => setTermsChecked((prev) => !prev)}
            onDetail={() => setOpenModal("terms")}
          >
            서비스 이용 약관 동의
          </AgreementItem>
          <AgreementItem
            checked={privacyChecked}
            onToggle={() => setPrivacyChecked((prev) => !prev)}
            onDetail={() => setOpenModal("privacy")}
          >
            개인정보 수집 및 이용 동의
          </AgreementItem>

          <div className="bg-gray-100 p-5 rounded-[15px]">
            <p className="text-gray-700 py-3">
              Knock은 학교 기숙사 내 룸메이트 매칭 서비스를 제공하기 위해 필요한
              최소한의 정보만 수집합니다. 수집된 정보는 안전하게 보호되며,
              언제든 동의를 철회할 수 있습니다. (단, 개인정보 수집·이용에 대한
              동의를 철회할 경우 룸메이트 매칭 기능 이용이 제한될 수 있습니다.)
            </p>
          </div>

          <AuthButton
            disabled={!allChecked}
            className={allChecked ? "bg-main" : "bg-gray-300"}
            onClick={async () => {
              console.log("1. 버튼 클릭");
              try {
                const user = await submitConsent(1);
                console.log("2️. submitConsent 성공", user);

                router.push("/");
                console.log("3️. router.push 실행됨");
              } catch (e) {
                //추후 에러 메세지를 사용자한테 alert창으로 디자인으로 이쁘게 뜨게 수정해야함
                console.log("동의 처리 중 오류 발생", e);
              }
            }}
          >
            Knock 시작하기
          </AuthButton>
        </div>
      </AuthBox>

      <AgreementModal
        open={openModal === "terms"}
        onClose={() => setOpenModal(null)}
        title="서비스 이용 약관"
      >
        본 약관은 Knock 서비스(이하 “서비스”)를 제공하는 Knock팀(이하
        “운영자”)과 서비스 이용자(이하 “사용자”) 간의 권리, 의무 및 책임 사항을
        규정합니다. <br />
        1. 서비스 목적 - 본 서비스는 학교 기숙사 내에서 룸메이트 매칭을 돕기
        위한 플랫폼입니다. - 사용자의 프로필 정보는 매칭을 위한 목적에서만
        활용됩니다. <br />
        2. 서비스 이용 - 사용자는 서비스 이용을 위해 학교 이메일 인증을 완료해야
        합니다. - 사용자가 입력한 정보는 사실이어야 하며, 허위 정보 입력으로
        발생하는 책임은 사용자에게 있습니다. - 서비스는 매칭 기능 제공을
        보장하지 않으며, 매칭 성사 여부는 다양한 조건에 따라 달라질 수 있습니다.{" "}
        <br />
        3. 서비스 변경 및 종료 - 운영자는 서비스의 일부 또는 전체를 변경·중단할
        수 있으며, 중요한 변경이 있을 경우 사전 고지합니다. 4. 금지 행위 -
        타인의 정보를 도용하는 행위 - 비방, 욕설, 혐오 표현 등 커뮤니티 질서를
        해치는 행위 - 매칭을 목적으로 하지 않는 광고, 스팸, 영리 활동 5.면책
        사항 - 운영자는 사용자의 귀책사유로 발생한 문제에 대해 책임을 지지
        않습니다. - 운영자는 서비스 이용 과정에서 발생할 수 있는 데이터 손실,
        매칭 실패 등에 대해 책임을 지지 않습니다. <br />
        6. 기타 - 본 약관은 서비스 내 공지사항을 통해 변경될 수 있습니다. -
        변경된 약관은 공지된 시점부터 효력이 발생합니다.
      </AgreementModal>

      <AgreementModal
        open={openModal === "privacy"}
        onClose={() => setOpenModal(null)}
        title="개인정보 수집 및 이용"
      >
        Knock 서비스는 룸메이트 매칭 기능 제공을 위해 다음과 같은 최소한의
        개인정보를 수집합니다.
        <br />
        1. 수집 항목 [필수 정보] - 학교 이메일 - 이름 또는 닉네임 - 성별 - 생활
        패턴 정보 (기상·취침 시간, 소음 민감도 등) - 선호하는 룸메이트 유형 정보
        (생활 습관, 청결도 등) <br />
        2. 수집 목적 - 기숙사 룸메이트 매칭 기능 제공 - 본인 확인 및 학교 재학생
        여부 확인 - 사용자 간 매칭 알고리즘 분석 및 추천 <br />
        3. 보유 및 이용 기간 - 서비스 이용 기간 동안 보관되며, 회원 탈퇴 시 즉시
        파기됩니다. - 단, 관계 법령에서 보관을 요구하는 경우 해당 기간 동안
        보관합니다. <br />
        4. 동의 거부 권리 - 사용자는 개인정보 수집·이용에 대한 동의를 거부할 수
        있습니다. - 단, 필수 정보 제공을 거부할 경우 룸메이트 매칭 기능 이용이
        제한됩니다. <br />
        5. 개인정보 보호 - 수집된 모든 정보는 암호화 등 안전한 방법으로 보호되며
        제3자에게 제공되지 않습니다.
      </AgreementModal>
    </div>
  );
}
