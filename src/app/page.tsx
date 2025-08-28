import clsx from "clsx";

export default function HomePage() {
  return (
    <div>
      <h1
        className={clsx(
          "bg-amber-900",
          "animation",
          "duration-700",
          "hover:bg-red-700",
          "text-red-700",
          "hover:text-white"
        )}
      >
        Olá mundo
      </h1>
    </div>
  );
}
