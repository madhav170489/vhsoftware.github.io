import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import Navigation from "../../components/Navigation";
import requireAuth from "../../utils/requireAuth";
import Link from "next/link";

function Assesses() {
  const [assesses, setAssesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssesses = async () => {
      let { data, error } = await supabase.from("assesses").select("*");
      setAssesses(data || []);
      setLoading(false);
    };
    fetchAssesses();
  }, []);

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 800, margin: "1rem auto" }}>
        <h2>Clients / Assessees</h2>
        <Link href="/assesses/add"><button>Add New Assessee</button></Link>
        {loading ? <p>Loading...</p> :
          <table border={1} cellPadding={8} style={{ width: "100%", marginTop: "1rem" }}>
            <thead><tr>
              <th>Name</th><th>PAN</th><th>Email</th><th>Mobile</th><th>P&L</th><th>Balance Sheet</th><th>Computation</th><th>Action</th>
            </tr></thead>
            <tbody>
              {assesses.map(a => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.pan}</td>
                  <td>{a.email}</td>
                  <td>{a.mobile}</td>
                  <td>
                    <Link href={`/pnl/${a.id}`}>P&L</Link>
                  </td>
                  <td>
                    <Link href={`/balancsheet/${a.id}`}>Balance Sheet</Link>
                  </td>
                  <td>
                    <Link href={`/statements/${a.id}`}>Computation</Link>
                  </td>
                  <td>
                    <Link href={`/assesses/${a.id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
      </div>
    </>
  );
}
export default requireAuth(Assesses);