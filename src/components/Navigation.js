import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      background: "#222",
      padding: "0.5rem 1rem",
      marginBottom: "1rem"
    }}>
      <Image src="/logo.png" alt="Logo" width={40} height={40} />
      <h2 style={{ color: "#fff", margin: "0 1rem" }}>V H Tax Solutions</h2>
      <Link href="/dashboard" style={{ color: "#fff", margin: "0 1rem" }}>Dashboard</Link>
      <Link href="/assesses" style={{ color: "#fff", margin: "0 1rem" }}>Clients</Link>
      <Link href="/import-prefilled" style={{ color: "#fff", margin: "0 1rem" }}>Import Prefilled</Link>
      <Link href="/import-ais-tis-26as" style={{ color: "#fff", margin: "0 1rem" }}>Import AIS/TIS/26AS</Link>
      <Link href="/returns/file" style={{ color: "#fff", margin: "0 1rem" }}>File Return</Link>
    </nav>
  );
}