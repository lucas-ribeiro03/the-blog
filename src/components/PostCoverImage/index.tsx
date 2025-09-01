import Link from "next/link";
import Image from "next/image";

type PostCoverImageProps = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
};
export const PostCoverImage = ({
  imageProps,
  linkProps,
}: PostCoverImageProps) => {
  return (
    <Link {...linkProps} className="w-full h-full overflow-hidden">
      <Image
        className="group-hover:scale-105 transition duration-300 w-full h-full object-cover"
        {...imageProps}
        alt={imageProps.alt}
      />
    </Link>
  );
};
