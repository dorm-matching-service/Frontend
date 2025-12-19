// app/(auth)/google/email/verify/page.tsx
import { Suspense } from "react";
import VerifyClient from "./verifyClient";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <VerifyClient />
    </Suspense>
  );
}
