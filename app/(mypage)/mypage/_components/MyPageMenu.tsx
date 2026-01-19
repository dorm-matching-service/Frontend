export default function MyPageMenu() {
  return (
    <div className="flex flex-col w-full border shadow-profileCard rounded-[15px] p-6 space-y-6">
       <section className="space-y-2">
        <h3 className="text-18 text-gray-900 font-bold">내 활동</h3>
        <p className="text-16 text-gray-700">요청함</p>
        <p className="text-16 text-gray-700">관심 프로필</p>
        <p className="text-16 text-gray-700">지난 매칭 기록</p>
      </section>

      <section className="space-y-2">
        <h3 className="text-18 text-gray-900 font-bold">나의 정보</h3>
        <p className="text-16 text-gray-700">계정 관리</p>
        <p className="text-16 text-gray-700">체크리스트 수정</p>
      </section>

      <section className="space-y-2">
        <h3 className="text-18 text-gray-900 font-bold">고객 센터</h3>
        <p className="text-16 text-gray-700">문의하기</p>
        <p className="text-16 text-gray-700">공지사항</p>
      </section>
    </div>
  );
}
