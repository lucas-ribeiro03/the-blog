import { PostHeading } from "../PostHeading";
import PostDate from "../PostDate";

type PostSummaryProps = {
  createdAt: string;
  title: string;
  excerpt: string;
  postLink: string;
};

export const PostSummary = ({
  createdAt,
  excerpt,
  title,
  postLink,
}: PostSummaryProps) => {
  console.log(postLink, title);
  return (
    <div>
      <div className="flex flex-col gap-4 sm:justify-center">
        <PostDate dateTime={createdAt} />
        <PostHeading as="h2" url={postLink}>
          {title}
        </PostHeading>
        <p>{excerpt}</p>
      </div>
    </div>
  );
};
