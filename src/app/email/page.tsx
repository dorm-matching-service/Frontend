'use client'

import useEmailStart from '@/src/hooks/auth/useEmailStart';
import { useState } from 'react'

export default function EmailPage() {
  const [email, setEmail] = useState('')

  const {mutate, isPending, isError, isSuccess, data, error} = useEmailStart();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(email) // 이메일 전송 요청 실행
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl  p-6 shadow">
        <h1 className="mt-8 text-xl font-semibold text-cyan-300">이메일로 인증코드 받기</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm text-gray-700">이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded border border-gray-300 px-4 py-2"
          />

          <button
            type="submit"
            disabled={isPending}
            className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isPending ? '전송 중…' : '인증 코드 받기'}
          </button>
        </form>

        {/* ✅ 상태별 UI */}
        {isSuccess && <p className="mt-4 text-sm text-green-700">{data}</p>}
        {isError && (
          <p className="mt-2 text-sm text-red-600">
            {(error as Error).message ?? '요청 실패'}
          </p>
        )}

        <p className="mt-6 text-sm text-gray-600">
          이미 코드를 받았다면{' '}
          <a href="/email/verify" className="text-blue-600 hover:underline">
            여기에서 인증하기
          </a>
        </p>
      </div>
    </main>
  )
}
