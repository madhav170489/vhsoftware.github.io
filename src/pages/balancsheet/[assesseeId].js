import Navigation from "../../components/Navigation";
import requireAuth from "../../utils/requireAuth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

function BalanceSheetPage() {
  const router = useRouter();
  const { assesseeId } = router.query;
  const [form, setForm] = useState({
    ay: "2023-24",
    assets: "",
    liabilities: "",
    capital: ""
  });
  const [existing, setExisting] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!assesseeId) return;
    supabase
      .from("balancesheet")
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
    const capital = Number(form.assets || 0) - Number(form.liabilities || 0);
    const { error } = await supabase.from("balancesheet").insert([
      {
        assessee_id: assesseeId,
        ay: form.ay,
        assets: Number(form.assets),
        liabilities: Number(form.liabilities),
        capital
      }
    ]);
    if (error) setMessage("Error: " + error.message);
    else setMessage("Balance Sheet saved!");
  }

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 700, margin: "2rem auto" }}>
        <h2>Balance Sheet</h2>
        <form onSubmit={handleSubmit}>
          <label>Assessment Year:
            <select name="ay" value={form.ay} onChange={handleChange}>
              <option value="2023-24">2023-24</option>
              <option value="2024-25">2024-25</option>
              <option value="2025-26">2025-26</option>
            </select>
          </label><br />
          <label>Assets: <input name="assets" type="number" value={form.assets} onChange={handleChange} /></label><br />
          <label>Liabilities: <input name="liabilities" type="number" value={form.liabilities} onChange={handleChange} /></label><br />
          <button type="submit">Save & Calculate Capital</button>
        </form>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {existing && (
          <div style={{ marginTop: 32 }}>
            <h3>Last Balance Sheet (AY {existing.ay}):</h3>
            <ul>
              <li>Assets: ₹{existing.assets}</li>
              <li>Liabilities: ₹{existing.liabilities}</li>
              <li><b>Capital:</b> ₹{existing.capital}</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
export default requireAuth(BalanceSheetPage);