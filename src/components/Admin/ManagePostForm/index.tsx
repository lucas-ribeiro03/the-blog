"use client";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";

export const ManagePostForm = () => {
  const [contentValue, setContentValue] = useState("");
  return (
    <form className="flex flex-col gap-6">
      <ImageUploader />
      <InputText labelText="Nome" />
      <InputText labelText="Sobrenome" />
      <MarkdownEditor
        labelText="Conteúdo"
        disabled={false}
        textAreaName="content"
        value={contentValue}
        setValue={setContentValue}
      />
      <Button className="w-full mt-6" variant="default" size="md">
        Enviar
      </Button>
    </form>
  );
};
