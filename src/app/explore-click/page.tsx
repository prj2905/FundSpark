import { Suspense } from "react";
import ExploreClickClient from "./explore";

export default function ExploreClickPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExploreClickClient />
    </Suspense>
  );
}
