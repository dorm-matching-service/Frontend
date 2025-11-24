import Image from 'next/image';


export default function Footer() {
    return (
        <footer className="mt-16 w-full bg-[#F2F2F2]">
            <div className="mx-auto max-w-[1280px] px-10 py-10 text-center text-[#1B1B1B]">
                <div className="mb-4 flex justify-center">
                    <img src="/knockblack.svg" alt="Knock 로고" className="h-5 w-auto"  />
                </div>
                <div className="mb-3 text-m font-medium">개인정보처리방침 | 서비스 이용약관</div>
                <div className="mb-1 text-sm">(주) Knock | 대표자: 오다현, 김서영, 정하늘 | 대표전화: 1234-5678</div>
                <div className="mb-1 text-sm">
                    주소: 충청남도 천안시 동남구 백석대학교 1 | 사업자등록번호: 123-45-67891 | 문의: knock@knock.co.kr
                </div>
                <div className="mt-3 text-sm">ⓒ Knock. All rights reserved.</div>
            </div>
        </footer>
    );
}
