import { Suspense } from "react";
import SearchPage from "./search";

export default function ExploreClickPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
