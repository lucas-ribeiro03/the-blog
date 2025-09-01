import Container from "@/components/Container";
import { FeaturedPost } from "@/components/FeaturedPost";
import Header from "@/components/Header";
import { PostCoverImage } from "@/components/PostCoverImage";
import { PostHeading } from "@/components/PostHeading";
import PostsList from "@/components/PostsList";
import SpinLoader from "@/components/SpinLoader";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Container>
      <Header />
      <Suspense fallback={<SpinLoader />}>
        <FeaturedPost />
      </Suspense>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
      <p>AQUI É O FOOTER</p>
    </Container>
  );
}
