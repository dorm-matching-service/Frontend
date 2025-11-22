'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { verifyEmail } from '@/src/apis/auth.email'


export default function VerifyPage() {
  const router = useRouter()

  // 입력값은 useState로 유지 (UI 상태)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  // useMutation으로 인증 처리
  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    data,
    error,
  } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      // 인증 성공 시 메인 페이지로 이동
      router.push('/')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({ email, code, name }) // 요청 실행
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-6 text-xl font-semibold">인증 코드 확인</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm text-gray-700">이름</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            className="w-full rounded border border-gray-300 px-4 py-2"
          />

          <label className="text-sm text-gray-700">이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded border border-gray-300 px-4 py-2"
          />

          <label className="text-sm text-gray-700">인증 코드</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="6자리 코드"
            className="w-full rounded border border-gray-300 px-4 py-2 tracking-widest"
          />

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-60"
          >
            {isPending ? '검증 중…' : '로그인'}
          </button>
        </form>

        {isSuccess && (
          <p className="mt-4 text-sm text-green-700">{data}</p>
        )}
        {isError && (
          <p className="mt-2 text-sm text-red-600">
            {(error as Error).message ?? '요청 실패'}
          </p>
        )}

        <p className="mt-6 text-sm text-gray-600">
          코드를 못 받았나요?{' '}
          <a href="/email" className="text-blue-600 hover:underline">
            여기에서 코드 받기
          </a>
        </p>
      </div>
    </main>
  )
}
