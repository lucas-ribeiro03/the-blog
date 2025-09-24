"use client";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { InputCheckbox } from "@/components/InputCheckbox";

export const ManagePostForm = () => {
  const [contentValue, setContentValue] = useState("");
  return (
    <form className="flex flex-col gap-6">
      <InputText labelText="Autor" name="author" />
      <InputText labelText="Título" name="title" />
      <InputText labelText="Resumo" name="excerpt" />
      <MarkdownEditor
        labelText="Conteúdo"
        disabled={false}
        textAreaName="content"
        value={contentValue}
        setValue={setContentValue}
      />
      <ImageUploader />
      <InputText labelText="Url da imagem de capa" name="coverImageUrl" />
      <InputCheckbox labelText="Público" name="published" />
      <Button className="w-full mt-6" variant="default" size="md">
        Enviar
      </Button>
    </form>
  );
};
