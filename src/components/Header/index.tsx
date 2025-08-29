import clsx from "clsx";

export default function Header() {
  return (
    <header>
      <h1
        className={clsx(
          "text-4xl/normal",
          "py-8",
          "sm:text-5xl",
          "sm:py-10",
          "md:text-6xl",
          "md:py-11",
          "lg:text-7xl",
          "lg:py-12"
        )}
      >
        The blog
      </h1>
    </header>
  );
}
