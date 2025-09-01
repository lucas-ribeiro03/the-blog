import Container from "@/components/Container";
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
      <section className="grid grid-cols-1 gap-8 mb-5 sm:grid-cols-2 sm: items-center group"></section>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
      <p>AQUI É O FOOTER</p>
    </Container>
  );
}
