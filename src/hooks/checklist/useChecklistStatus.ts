import { useEffect, useState } from "react";

import { fetchChecklistStatus } from "@src/apis/checklist";

export function useChecklistStatus() {
  const [hasChecklist, setHasChecklist] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchChecklistStatus()
      .then((res) => {
        if (!mounted) return;
        console.log("체크리스트 여부 API", res);
        console.log(
          "checklist hook env",
          typeof window === "undefined" ? "SERVER" : "CLIENT"
        );
        setHasChecklist(res.exists);
      })
      .catch((err) => {
        console.error("checklist api error", err);
        setError(String(err));
        setHasChecklist(false);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { hasChecklist, loading, error };
}
