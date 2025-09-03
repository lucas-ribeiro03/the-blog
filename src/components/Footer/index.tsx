import clsx from "clsx";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <h1 className={clsx("pb-16", "font-bold", "text-center")}>
        <p className="py-16">
          Copyright &copy; {new Date().getFullYear()} -{" "}
          <Link href={"/"}>The blog</Link>
        </p>
      </h1>
    </footer>
  );
}
