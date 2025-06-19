import requireAuth from "../utils/requireAuth";
import Navigation from "../components/Navigation";
import LogoutButton from "../components/LogoutButton";

function Dashboard() {
  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 800, margin: "1rem auto" }}>
        <h2>Dashboard</h2>
        <p>Welcome to your tax management dashboard.</p>
        <LogoutButton />
      </div>
    </>
  );
}

export default requireAuth(Dashboard);