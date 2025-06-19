import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../supabaseClient";

export default function requireAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
          router.push("/login");
        }
      });
    }, [router]);

    return <Component {...props} />;
  };
}