"use client";

import { Button } from "@/components/Button";
import { IMAGE_UPLOAD_MAX_SIZE } from "@/lib/constants";
import { ImageUpIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "react-toastify";

export const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const handleChange = () => {
    if (!inputRef.current) return;
    const fileInput = inputRef.current;
    const file = fileInput?.files?.[0];
    if (!file) return;

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const maxReadableSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
      toast.error(
        `Imagem muito grande. O tamanho máximo é ${maxReadableSize}Kb`
      );

      fileInput.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData.get("file"));
  };

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={handleChooseFile} type="button" className="self-start">
        <ImageUpIcon />
        Enviar uma imagem
      </Button>
      <input
        onChange={handleChange}
        ref={inputRef}
        type="file"
        name="file"
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};
