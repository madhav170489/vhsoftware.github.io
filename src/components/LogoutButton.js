import { supabase } from "../supabaseClient";
import { useRouter } from "next/router";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  return (
    <button onClick={handleLogout} style={{ marginLeft: "auto", background: "#f33", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: 6 }}>
      Logout
    </button>
  );
}