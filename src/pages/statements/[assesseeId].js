import Navigation from "../../components/Navigation";
import requireAuth from "../../utils/requireAuth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

function StatementOfIncome() {
  const router = useRouter();
  const { assesseeId } = router.query;
  const [form, setForm] = useState({
    ay: "2023-24",
    salary_income: "",
    business_income: "",
    other_income: "",
    deductions: ""
  });
  const [existing, setExisting] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!assesseeId) return;
    // Load previous computation if any
    supabase
      .from("computations")
      .select("*")
      .eq("assessee_id", assesseeId)
      .order("created_at", { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) setExisting(data[0]);
      });
  }, [assesseeId]);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    const total_income =
      Number(form.salary_income || 0) +
      Number(form.business_income || 0) +
      Number(form.other_income || 0) -
      Number(form.deductions || 0);
    // (Simplified) Let’s say tax is 10% of total income for demo
    const tax = total_income > 0 ? Math.round(total_income * 0.1) : 0;

    const { error } = await supabase.from("computations").insert([
      {
        assessee_id: assesseeId,
        ay: form.ay,
        salary_income: Number(form.salary_income),
        business_income: Number(form.business_income),
        other_income: Number(form.other_income),
        deductions: Number(form.deductions),
        total_income,
        tax
      }
    ]);
    if (error) setMessage("Error: " + error.message);
    else setMessage("Computation saved!");
  }

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 700, margin: "2rem auto" }}>
        <h2>Statement of Income (Computation)</h2>
        <form onSubmit={handleSubmit}>
          <label>Assessment Year:
            <select name="ay" value={form.ay} onChange={handleChange}>
              <option value="2023-24">2023-24</option>
              <option value="2024-25">2024-25</option>
              <option value="2025-26">2025-26</option>
            </select>
          </label><br />
          <label>Salary Income: <input name="salary_income" type="number" value={form.salary_income} onChange={handleChange} /></label><br />
          <label>Business Income: <input name="business_income" type="number" value={form.business_income} onChange={handleChange} /></label><br />
          <label>Other Income: <input name="other_income" type="number" value={form.other_income} onChange={handleChange} /></label><br />
          <label>Total Deductions: <input name="deductions" type="number" value={form.deductions} onChange={handleChange} /></label><br />
          <button type="submit">Save & Calculate</button>
        </form>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {existing && (
          <div style={{ marginTop: 32 }}>
            <h3>Last Computation (AY {existing.ay}):</h3>
            <ul>
              <li>Salary Income: ₹{existing.salary_income}</li>
              <li>Business Income: ₹{existing.business_income}</li>
              <li>Other Income: ₹{existing.other_income}</li>
              <li>Deductions: ₹{existing.deductions}</li>
              <li><b>Total Income:</b> ₹{existing.total_income}</li>
              <li><b>Tax (demo, 10%):</b> ₹{existing.tax}</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
export default requireAuth(StatementOfIncome);