"use client";

import { uploadImageAction } from "@/actions/upload/upload-image";
import { Button } from "@/components/Button";
import { IMAGE_UPLOAD_MAX_SIZE } from "@/lib/constants";
import { ImageUpIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";

type ImageUploaderProps = {
  disabled: boolean;
};

export const ImageUploader = ({ disabled = false }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [isUploading, startTransition] = useTransition();

  const handleChooseFile = () => {
    if (!inputRef.current) {
      setImgUrl("");
      return;
    }

    inputRef.current.click();
  };

  const handleChange = () => {
    toast.dismiss();
    if (!inputRef.current) {
      setImgUrl("");
      return;
    }
    const fileInput = inputRef.current;
    const file = fileInput?.files?.[0];
    if (!file) return;

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const maxReadableSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
      setImgUrl("");
      toast.error(
        `Imagem muito grande. O tamanho máximo é ${maxReadableSize}Kb`
      );

      fileInput.value = "";
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    startTransition(async () => {
      const result = await uploadImageAction(formData);
      if (result?.error) {
        toast.error(result.error);
        setImgUrl("");
        fileInput.value = "";
        return;
      }

      setImgUrl(result.url);

      toast.success("Imagem enviada com sucesso");
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={handleChooseFile}
        type="button"
        className="self-start"
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>
      {!!imgUrl && (
        <div className="flex flex-col gap-4">
          <p>
            <b>URL:</b> {imgUrl}
          </p>
          {/* eslint-disable-next-line */}
          <img src={imgUrl} className="rounded-lg" />
        </div>
      )}
      <input
        onChange={handleChange}
        ref={inputRef}
        type="file"
        name="file"
        className="hidden"
        accept="image/*"
        disabled={isUploading || disabled}
      />
    </div>
  );
};
