import { useEffect, useState } from "react";
import { fetchMe } from "@/apis/user";

import type { User } from "@/types/user";

export function useMe() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        let mounted = true;

        async function load() {
            const me = await fetchMe();

            if(mounted) {
                setUser(me);
                setLoading(false);
            }
        }

        load();

        return () => {
            mounted = false;
        }
    }, [])

    return { user, loading }
}