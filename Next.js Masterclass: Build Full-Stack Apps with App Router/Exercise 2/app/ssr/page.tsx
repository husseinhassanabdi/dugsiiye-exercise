export const dynamic = "force-dynamic";

export default function SsrPage() {
  return (
    <div>
      <h1>SSR Simulation</h1>
      <p>Server time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
