// src/mocks/matchingDummy.ts
import type { MatchingResponse } from "@/types/matching";

export const matchingDummy: MatchingResponse = {
  count: 3,
  results: [
    {
      matchingScore: 92,
      major: "컴퓨터공학과",
      age: 23,
      sleepTime: "23:00 pm", // 23:00
      wakeTime: "08:00 am",   // 08:00
      tags: ["조용함", "청결", "야식 X"],
    },
    {
      matchingScore: 87,
      major: "정보보호학과",
      age: 24,
      sleepTime: "01:00 pm",   // 01:00
      wakeTime: "09:00 am",   // 09:00
      tags: ["게임 적당히", "깔끔", "배려형"],
    },
    {
      matchingScore: 81,
      major: "소프트웨어학과",
      age: 22,
      sleepTime: "02:00 pm",  // 02:00
      wakeTime: "10:00 am",   // 10:00
      tags: ["야행성", "이어폰 필수", "혼자 시간"],
    },
  ],
};
