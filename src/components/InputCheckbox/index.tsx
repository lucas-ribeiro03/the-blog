import clsx from "clsx";
import { useId } from "react";

type InputCheckboxProps = {
  labelText?: string;
  type?: "checkbox";
} & React.ComponentProps<"input">;

export const InputCheckbox = ({
  labelText,
  type = "checkbox",
  ...props
}: InputCheckboxProps) => {
  const id = useId();
  return (
    <div className="flex gap-3">
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        type={type}
        {...props}
        className={clsx(
          "w-4 h-4 outline-none focus:ring-1 focus:ring-slate-600",
          props.className
        )}
        id={id}
      />
    </div>
  );
};
