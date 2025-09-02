import Container from "@/components/Container";
import { FeaturedPost } from "@/components/FeaturedPost";
import PostsList from "@/components/PostsList";
import SpinLoader from "@/components/SpinLoader";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Container>
      <Suspense fallback={<SpinLoader />}>
        <FeaturedPost />
      </Suspense>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </Container>
  );
}
