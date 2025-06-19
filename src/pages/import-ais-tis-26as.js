import Navigation from "../components/Navigation";
import requireAuth from "../utils/requireAuth";

function ImportAisTis26as() {
  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 600, margin: "2rem auto" }}>
        <h2>Import AIS / TIS / 26AS Data</h2>
        <p>Upload or paste AIS, TIS, or 26AS JSON/PDF data here.</p>
        <input type="file" multiple />
        {/* Placeholder for actual parsing logic */}
      </div>
    </>
  );
}
export default requireAuth(ImportAisTis26as);