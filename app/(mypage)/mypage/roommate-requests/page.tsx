"use client";

import { useReceivedRoommateRequests } from "@src/hooks/matching/useReceivedRoommateRequests";

export default function RoommateRequestsPage() {
  const {
    requests,
    loading,
    error,
    accept,
    reject,
  } = useReceivedRoommateRequests();

  if (loading) return <div className="pl-72">로딩 중...</div>;
  if (error) return <div>{error}</div>;

  if (requests.length === 0) {
    return <div className="pl-72">받은 룸메 요청이 없습니다.</div>;
  }

  return (
    <div>
      <h2>받은 룸메 요청</h2>

      {requests.map((req) => (
        <div key={req.matchId} className="flex border border-gray-300 rounded-[15px]">
          <p>{req.requester.department} {req.requester.age}살 님이 룸메이트 요청을 보냈어요</p>
        
          <button onClick={() => accept(req.matchId)}>
            수락
          </button>
          <button onClick={() => reject(req.matchId)}>
            거절
          </button>
        </div>
      ))}
    </div>
  );
}
