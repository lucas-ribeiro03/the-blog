import React from "react";

type ButtonProps = {
  children: React.ReactNode;
} & React.ComponentProps<"button">;

export const Button = ({ children, ...props }: ButtonProps) => {
  return <button {...props}>{children}</button>;
};
