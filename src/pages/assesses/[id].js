import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../supabaseClient";
import Navigation from "../../components/Navigation";
import requireAuth from "../../utils/requireAuth";

function EditAssessee() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ name: "", pan: "", dob: "", mobile: "", email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase.from("assesses").select("*").eq("id", id).single().then(({ data, error }) => {
      if (data) setForm(data);
      setLoading(false);
    });
  }, [id]);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const { error } = await supabase.from("assesses").update(form).eq("id", id);
    if (error) setError(error.message);
    else router.push("/assesses");
  }

  async function handleDelete() {
    if (window.confirm("Delete this assessee?")) {
      await supabase.from("assesses").delete().eq("id", id);
      router.push("/assesses");
    }
  }

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 400, margin: "1rem auto" }}>
        <h3>Edit Assessee</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required /><br />
          <input name="pan" value={form.pan} onChange={handleChange} placeholder="PAN" required /><br />
          <input name="dob" value={form.dob} onChange={handleChange} type="date" placeholder="DOB" required /><br />
          <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" required /><br />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required /><br />
          <button type="submit">Save</button>
        </form>
        <button onClick={handleDelete} style={{ background: "#f33", color: "#fff", marginTop: 8 }}>Delete</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}
export default requireAuth(EditAssessee);