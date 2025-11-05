'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API = 'http://localhost:3001';

export default function VerifyPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErr(null);

    try {
      const res = await fetch(`${API}/auth/email/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, name }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || data?.error || '인증 실패');
      }

      if (data.token) {
        localStorage.setItem('knock_token', data.token);
      }

      setMsg(data.message || '로그인 성공!');
      router.push('/');
    } catch (e: any) {
      setErr(e.message ?? '요청 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-6 text-xl font-semibold">인증 코드 확인</h1>

        <form onSubmit={handleVerify} className="flex flex-col gap-3">
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
            disabled={loading}
            className="mt-2 rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? '검증 중…' : '로그인'}
          </button>
        </form>

        {msg && <p className="mt-4 text-sm text-green-700">{msg}</p>}
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}

        <p className="mt-6 text-sm text-gray-600">
          코드를 못 받았나요?{' '}
          <a href="/email" className="text-blue-600 hover:underline">
            여기에서 코드 받기
          </a>
        </p>
      </div>
    </main>
  );
}
