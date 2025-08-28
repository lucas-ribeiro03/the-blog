import PostsList from "@/components/PostsList";
import SpinLoader from "@/components/SpinLoader";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div>
      <h1>AQUI É A HEADER</h1>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
      <p>AQUI É O FOOTER</p>
    </div>
  );
}
