"use client";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { InputCheckbox } from "@/components/InputCheckbox";
import { PublicPost } from "@/dto/dto";
type ManagePostFormProps = {
  publicPost?: PublicPost;
};
export const ManagePostForm = ({ publicPost }: ManagePostFormProps) => {
  const [contentValue, setContentValue] = useState("");
  return (
    <form className="flex flex-col gap-6">
      <InputText
        labelText="Autor"
        name="author"
        defaultValue={publicPost?.author || ""}
      />
      <InputText
        labelText="Título"
        name="title"
        defaultValue={publicPost?.title || ""}
      />
      <InputText
        labelText="Resumo"
        name="excerpt"
        defaultValue={publicPost?.excerpt || ""}
      />
      <MarkdownEditor
        labelText="Conteúdo"
        disabled={false}
        textAreaName="content"
        value={!publicPost ? contentValue : publicPost.content}
        setValue={setContentValue}
      />
      <ImageUploader />
      <InputText
        defaultValue={publicPost?.coverImageUrl || ""}
        labelText="Url da imagem de capa"
        name="coverImageUrl"
      />
      <InputCheckbox
        labelText="Público"
        name="published"
        defaultChecked={publicPost?.published}
      />
      <Button className="w-full mt-6" variant="default" size="md">
        Enviar
      </Button>
    </form>
  );
};
