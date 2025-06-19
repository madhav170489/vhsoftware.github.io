import { useState } from "react";
import { supabase } from "../../supabaseClient";
import Navigation from "../../components/Navigation";
import requireAuth from "../../utils/requireAuth";
import { useRouter } from "next/router";

function AddAssessee() {
  const [form, setForm] = useState({ name: "", pan: "", dob: "", mobile: "", email: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const { error } = await supabase.from("assesses").insert([form]);
    if (error) setError(error.message);
    else router.push("/assesses");
  }

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 400, margin: "1rem auto" }}>
        <h3>Add New Assessee</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required /><br />
          <input name="pan" value={form.pan} onChange={handleChange} placeholder="PAN" required /><br />
          <input name="dob" value={form.dob} onChange={handleChange} type="date" placeholder="DOB" required /><br />
          <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" required /><br />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required /><br />
          <button type="submit">Add Assessee</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}
export default requireAuth(AddAssessee);