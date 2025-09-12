import Container from "@/components/Container";
import { FeaturedPost } from "@/components/FeaturedPost";
import PostsList from "@/components/PostsList";
import SpinLoader from "@/components/SpinLoader";
import { Suspense } from "react";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <Container>
      <Suspense fallback={<SpinLoader />}>
        <FeaturedPost />
        <PostsList />
      </Suspense>
    </Container>
  );
}
