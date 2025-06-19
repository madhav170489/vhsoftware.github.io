import Navigation from "../../components/Navigation";
import requireAuth from "../../utils/requireAuth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

function PnLPage() {
  const router = useRouter();
  const { assesseeId } = router.query;
  const [form, setForm] = useState({
    ay: "2023-24",
    gross_receipts: "",
    expenses: "",
    net_profit: ""
  });
  const [existing, setExisting] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!assesseeId) return;
    supabase
      .from("pnl")
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
    const net_profit = Number(form.gross_receipts || 0) - Number(form.expenses || 0);
    const { error } = await supabase.from("pnl").insert([
      {
        assessee_id: assesseeId,
        ay: form.ay,
        gross_receipts: Number(form.gross_receipts),
        expenses: Number(form.expenses),
        net_profit
      }
    ]);
    if (error) setMessage("Error: " + error.message);
    else setMessage("P&L statement saved!");
  }

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 700, margin: "2rem auto" }}>
        <h2>P&L Statement (Business/Profession)</h2>
        <form onSubmit={handleSubmit}>
          <label>Assessment Year:
            <select name="ay" value={form.ay} onChange={handleChange}>
              <option value="2023-24">2023-24</option>
              <option value="2024-25">2024-25</option>
              <option value="2025-26">2025-26</option>
            </select>
          </label><br />
          <label>Gross Receipts: <input name="gross_receipts" type="number" value={form.gross_receipts} onChange={handleChange} /></label><br />
          <label>Expenses: <input name="expenses" type="number" value={form.expenses} onChange={handleChange} /></label><br />
          <button type="submit">Save & Calculate Net Profit</button>
        </form>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {existing && (
          <div style={{ marginTop: 32 }}>
            <h3>Last P&L (AY {existing.ay}):</h3>
            <ul>
              <li>Gross Receipts: ₹{existing.gross_receipts}</li>
              <li>Expenses: ₹{existing.expenses}</li>
              <li><b>Net Profit:</b> ₹{existing.net_profit}</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
export default requireAuth(PnLPage);