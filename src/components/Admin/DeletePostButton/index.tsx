"use client";

import { deletePostAction } from "@/actions/delete-post-action";
import { Dialog } from "@/components/Dialog";
import clsx from "clsx";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

type DeletePostButtonProps = {
  id: string;
};

export const DeletePostButton = ({ id }: DeletePostButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  const handleDeletePost = () => {
    startTransition(async () => {
      setShowDialog(false);
      const result = await deletePostAction(id);
      if (result?.error) {
        setShowDialog(false);
        toast.error(result.error);
        return;
      }
      toast.success("Post excluído com sucesso");
    });
  };
  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        aria-label="Apagar post"
        title="Apagar post"
        className={clsx(
          "text-red-500 cursor-pointer transition duration-200 [&_svg]:h-4 [&_svg]:w-4 hover:scale-150 hover:text-red-700 disabled:text-slate-300 disabled:cursor-not-allowed"
        )}
        disabled={isPending}
      >
        <Trash2Icon />
      </button>
      {showDialog && (
        <Dialog
          content="Deseja mesmo apagar o post?"
          disabled={isPending}
          onCancel={() => setShowDialog(false)}
          onConfirm={handleDeletePost}
          title="Apagar post?"
        />
      )}
    </>
  );
};
