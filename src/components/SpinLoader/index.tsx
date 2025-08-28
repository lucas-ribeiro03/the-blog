import clsx from "clsx";

export default function SpinLoader() {
  return (
    <div
      className={clsx(
        "flex",
        "items-center",
        "justify-center",
        "min-h-[300px]"
      )}
    >
      <div
        className={clsx(
          "w-10",
          "h-10",
          "border-4",
          "border-slate-900",
          "border-t-transparent",
          "rounded-full",
          "animate-spin"
        )}
      ></div>
    </div>
  );
}
