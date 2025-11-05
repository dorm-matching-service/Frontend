# Frontend
기숙사 룸메 매칭 서비스 프론트엔드 레포지토리


## 기술 스택 
TailwindCss(3.4.18)
NextJS(16.0.1)
TypeScript

## 폴더구조 


```c
KNOCKFRONT/
├── .next/                     # Next.js 빌드 결과물 (자동 생성, 배포 시 사용)
│   └── types/                 # 글로벌 타입 선언 파일
│       ├── global.d.ts
│       ├── routes.d.ts
│       └── validator.ts
│
├── app/                       # Next.js 13+ App Router 폴더
│   ├── favicon.ico
│   ├── globals.css            # TailwindCSS 및 전역 스타일
│   ├── layout.tsx             # 모든 페이지에 공통 적용되는 레이아웃
│   └── page.tsx               # 루트(/) 페이지 컴포넌트
│
├── node_modules/              # 의존성 모듈
├── public/                    # 정적 파일 (이미지, 아이콘 등)
│
├── .gitignore                 # Git에서 제외할 파일 목록
├── eslint.config.mjs          # ESLint 설정 파일
├── next-env.d.ts              # Next.js + TypeScript 환경 타입 선언
├── next.config.ts             # Next.js 설정 파일
├── package.json               # 의존성 및 스크립트 정의
├── package-lock.json          # 의존성 버전 고정
├── postcss.config.js          # PostCSS 설정 (TailwindCSS와 함께 사용)
├── postcss.config.mjs         # (중복 설정 파일, 둘 중 하나만 유지 권장)
├── tailwind.config.js         # TailwindCSS 설정 파일
├── tsconfig.json              # TypeScript 설정
└── README.md                  # 프로젝트 설명 문서
```
