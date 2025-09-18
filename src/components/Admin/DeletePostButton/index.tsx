"use client";

import { Trash2Icon } from "lucide-react";

type DeletePostButtonProps = {
  id: string;
};

export const DeletePostButton = ({ id }: DeletePostButtonProps) => {
  const handleClick = () => {
    console.log(id);
  };
  return (
    <button
      onClick={handleClick}
      aria-label="Apagar post"
      title="Apagar post"
      className="text-red-500 cursor-pointer transition duration-200 [&_svg]:h-4 [&_svg]:w-4 hover:scale-150 hover:text-red-700"
    >
      <Trash2Icon />
    </button>
  );
};
