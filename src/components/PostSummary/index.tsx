import { dateDistanceToNow, formatDate } from "@/utils/format-datetime";
import { PostHeading } from "../PostHeading";

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
        <time
          dateTime={formatDate(createdAt)}
          className="text-slate-600 block text-sm/tight"
          title={dateDistanceToNow(createdAt)}
        >
          {formatDate(createdAt)}
        </time>

        <PostHeading as="h2" url={postLink}>
          {title}
        </PostHeading>
        <p>{excerpt}</p>
      </div>
    </div>
  );
};
