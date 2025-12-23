import { useEffect, useState } from "react";
import { fetchMe } from "@/apis/user";

import type { User } from "@/types/user";

export function useMe() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const me = await fetchMe();

        if (!mounted) return;

        setUser(me);
      } catch (err) {
        if (!mounted) return;
        setError(err as Error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return { user, loading, error };
}
