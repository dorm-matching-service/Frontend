import AccountSettingItem from "./_components/AccountSettingItem";
import Button from "@src/components/ui/Button";

import { useMe } from "@src/hooks/user/useMe";

export default function AccountPage() {
  const { user, loading, error } = useMe();

  if (loading) {
    return <div className="p-4 text-sm text-gray-500">불러오는 중...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-red-500">
        계정 정보를 불러오지 못했어요.
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col">
      <AccountSettingItem
        title="Google 계정"
        description={user?.email ?? ""}
        action={
          <span
            className="
            font-medium
            text-sm
            text-main
            border
            border-gray-500
            rounded-[15px]
            px-3
            py-1
            "
          >
            연결됨
          </span>
        }
      />
      <AccountSettingItem
        title="로그아웃"
        description="현재 기기에서 로그아웃할게요."
        // TODO: 리프레시 토큰 백에서 구현할때 로그아웃 백 로직 같이 만들면서 추가할 예정
        // action={
        //   <Button variant="secondary" onClick={logout}>
        //     로그아웃
        //   </Button>
        // }
      />
      {/* <AccountSettingItem
        title="회원탈퇴"
        description="계정을 삭제하면 매칭기록과 프로필이 사라져요."
        danger
        action={
          <Button
            variant="secondary"
            className="text-red-600"
            onClick={withdraw}
          >
            탈퇴하기
          </Button>
        }
      /> */}
    </div>
  );
}
