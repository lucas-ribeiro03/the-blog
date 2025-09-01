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
      <section className="grid grid-cols-1 gap-8 mb-5 sm:grid-cols-2 sm: items-center group">
        <PostCoverImage
          imageProps={{
            alt: "Alt da imagem",
            src: "/images/bryen_9.png",
            width: 1200,
            height: 720,
            priority: true,
          }}
          linkProps={{ href: "#" }}
        />
        <div className="flex flex-col gap-4 sm:justify-center">
          <time
            dateTime="2025-08-29"
            className="text-slate-600 block text-sm/tight"
          >
            29/08/2025 16:00
          </time>

          <PostHeading as="h1" url="#">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque,
            optio.
          </PostHeading>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            est odio minima nostrum id perferendis nisi veniam? Assumenda
            impedit eligendi commodi quisquam consequatur? Quibusdam eum
            possimus quos, quidem ex natus!
          </p>
        </div>
      </section>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
      <p>AQUI É O FOOTER</p>
    </Container>
  );
}
