import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      alert("Signup successful! Please check your email.");
      router.push("/login");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required /><br />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required /><br />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{color:"red"}}>{error}</p>}
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}