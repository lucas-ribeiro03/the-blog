import Link from "next/link";

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as: "h1" | "h2";
};

export const PostHeading = ({
  children,
  url,
  as: Tag = "h2",
}: PostHeadingProps) => {
  const headingClassesMap = {
    h1: "text-2xl/tight  sm:text-4xl  font-extrabold",
    h2: "text-2xl/tight font-bold",
  };
  return (
    <Tag
      className={`${headingClassesMap[Tag]}, hover:text-slate-500 transition`}
    >
      {children}
      <Link href={url}></Link>
    </Tag>
  );
};
