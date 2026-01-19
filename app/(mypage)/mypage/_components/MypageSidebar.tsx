"use client";

import { useMySurveySummary } from "@/hooks/mypage/useMySurveySummary";
import MyProfileCard from "./MyProfileCard";

export default function MyPageSidebar() {
  const { loading, error, summary } = useMySurveySummary();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl h-48 animate-pulse" />
        <div className="bg-white rounded-xl h-64 animate-pulse" />
      </div>
    );
  }

  if (error || !summary) {
    return <div>사이드바 정보 불러오기 실패</div>;
  }

  return (
    <div className="space-y-6">
      {summary?.survey && (
        <MyProfileCard
          data={{
            major: summary.survey.department ?? "",
            age: summary.survey.age ?? 0,
            wakeTime: summary.survey.wakeTime ?? "",
            sleepTime: summary.survey.sleepTime ?? "",
            tags: summary.survey.tags ?? [],
          }}
        />
      )}
    </div>
  );
}
