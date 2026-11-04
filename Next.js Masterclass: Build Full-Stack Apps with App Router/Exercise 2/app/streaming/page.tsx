import { Suspense } from "react";
import SlowComponent from "../components/SlowComponent";

export const dynamic = "force-dynamic";

export default function StreamingPage() {
  return (
    <div>
      <h1>Streaming Exercise</h1>
      <Suspense fallback="Loading...">
        <SlowComponent />
      </Suspense>
    </div>
  );
}
