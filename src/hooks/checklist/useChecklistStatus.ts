import { useEffect, useState } from "react";

import { fetchChecklistStatus } from "@/apis/checklist";

export function useChecklistStatus() {
  const [hasChecklist, setHasChecklist] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchChecklistStatus()
    .then((res) => {
        if(!mounted) return;
        setHasChecklist(res.exists);
    })
    .catch((err) => {
        setError(err);
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
