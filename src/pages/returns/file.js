import Navigation from "../../components/Navigation";
import requireAuth from "../../utils/requireAuth";

function FileReturn() {
  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 600, margin: "2rem auto" }}>
        <h2>File Income Tax Return</h2>
        <p>Select Assessee, Assessment Year, ITR Form and upload final JSON for submission.</p>
        {/* UI/logic for selecting assessee/AY/ITR and uploading JSON or showing summary */}
        <form>
          {/* Placeholder controls */}
          <select>
            <option>Assessment Year 2023-24</option>
            <option>Assessment Year 2024-25</option>
            <option>Assessment Year 2025-26</option>
          </select>
          <select>
            <option>ITR-1</option>
            <option>ITR-2</option>
            <option>ITR-3</option>
            <option>ITR-4</option>
            <option>ITR-5</option>
            <option>ITR-6</option>
            <option>ITR-7</option>
          </select>
        </form>
        <input type="file" accept=".json" />
        <button>Submit Return</button>
      </div>
    </>
  );
}
export default requireAuth(FileReturn);