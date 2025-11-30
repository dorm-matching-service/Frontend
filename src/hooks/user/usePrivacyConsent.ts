// src/hooks/usePrivacyConsent.ts

import { useState } from "react";
import { updatePrivacyConsent } from "../../apis/user";

export function usePrivacyConsent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitConsent = async (version = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await updatePrivacyConsent(version);

      return response.user; // 업데이트된 유저 반환
    } catch (e: any) {
      setError(e.message || "서버 오류");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { submitConsent, loading, error };
}
