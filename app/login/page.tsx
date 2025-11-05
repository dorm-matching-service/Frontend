'use client';

import { useState } from 'react';

const API = 'http://localhost:3001';

export default function EmailPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErr(null);

    try {
      const res = await fetch(`${API}/auth/email/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || data?.error || '이메일 전송 실패');
      }

      setMsg(data.message || '인증 코드가 이메일로 전송됐어요.');
    } catch (e: any) {
      setErr(e.message ?? '요청 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-6 text-xl font-semibold">이메일로 인증코드 받기</h1>

        <form onSubmit={handleSendEmail} className="flex flex-col gap-3">
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
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? '전송 중…' : '인증 코드 받기'}
          </button>
        </form>

        {msg && <p className="mt-4 text-sm text-green-700">{msg}</p>}
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}

        <p className="mt-6 text-sm text-gray-600">
          이미 코드를 받았다면{' '}
          <a href="/login/email" className="text-blue-600 hover:underline">
            여기에서 인증하기
          </a>
        </p>
      </div>
    </main>
  );
}
