import { useState } from "react";
import Navigation from "../components/Navigation";
import requireAuth from "../utils/requireAuth";

function ImportPrefilled() {
  const [file, setFile] = useState(null);
  const [json, setJson] = useState(null);
  const [error, setError] = useState("");

  function handleFile(e) {
    const f = e.target.files[0];
    setFile(f);
    const reader = new FileReader();
    reader.onload = e => {
      try {
        setJson(JSON.parse(e.target.result));
        setError("");
      } catch (err) {
        setError("Invalid JSON");
      }
    };
    reader.readAsText(f);
  }

  function handleImport() {
    if (json) {
      alert("Prefilled JSON imported successfully!\n" + JSON.stringify(json, null, 2).slice(0, 500));
      // TODO: Save to database for this assessee/return
    }
  }

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 600, margin: "2rem auto" }}>
        <h2>Import Prefilled JSON</h2>
        <input type="file" accept=".json" onChange={handleFile} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {json && <button onClick={handleImport}>Import</button>}
      </div>
    </>
  );
}
export default requireAuth(ImportPrefilled);