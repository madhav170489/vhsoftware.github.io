import Navigation from "../components/Navigation";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navigation />
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "80vh", justifyContent: "center" }}>
        <Image src="/logo.png" alt="Logo" width={120} height={120} />
        <h1>Welcome to V H Tax Solutions</h1>
        <p>Modern web-based Indian Income Tax Return Filing Software.</p>
      </main>
    </>
  );
}