import clsx from "clsx";
import { useId } from "react";

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<"input">;

export const InputText = ({ labelText, ...props }: InputTextProps) => {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          "bg-white",
          "ring-2",
          "outline-0",
          "ring-slate-400",
          "text-slate-800",
          "rounded",
          "p-2",
          "text-base/tight",
          "transition",
          "duration-300",
          "focus:ring-blue-600",
          "placeholder-slate-100",
          "disabled:bg-slate-200",
          "disabled:text-slate-400",
          "disabled:placeholder-slate-400",
          "read-only:bg-slate-200",
          props.className
        )}
        id={id}
      />
    </div>
  );
};
