import requireAuth from "../utils/requireAuth";
import LogoutButton from "../components/LogoutButton";

function Dashboard() {
  return (
    <div>
      <h1>Welcome to V H Tax Solutions Dashboard!</h1>
      <LogoutButton />
    </div>
  );
}

export default requireAuth(Dashboard);