import React, { useEffect, useState } from "react";
import axios from "axios";

function AssesseeList() {
  const [assesses, setAssesses] = useState([]);

  useEffect(() => {
    axios.get("/api/assesses/list").then((res) => setAssesses(res.data));
  }, []);

  return (
    <div>
      <h2>Client List (Assessees)</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>PAN</th><th>Email</th><th>Mobile</th><th>AYs</th>
          </tr>
        </thead>
        <tbody>
          {assesses.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.pan}</td>
              <td>{a.email}</td>
              <td>{a.mobile}</td>
              <td>
                {/* Show years for which returns exist */}
                {a.returns?.map(r => r.assessment_year).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssesseeList;