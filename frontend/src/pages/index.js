import Image from "next/image";

export default function Home() {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      justifyContent: "center"
    }}>
      <Image src="/logo.png" alt="V H Tax Solutions" width={120} height={120} />
      <h1>V H Tax Solutions</h1>
      <p>Modern Web-based Indian Income Tax Return Filing Software</p>
    </main>
  );
}