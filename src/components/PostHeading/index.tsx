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
    h1: "text-2xl/tight  sm:text-4xl",
    h2: "text-2xl/tight  sm:text-4xl",
  };
  return (
    <Tag className={`${headingClassesMap[Tag]}, font-extrabold`}>
      {children}
      <Link href={url}></Link>
    </Tag>
  );
};
