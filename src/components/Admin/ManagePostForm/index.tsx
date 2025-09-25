"use client";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useActionState, useEffect, useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { InputCheckbox } from "@/components/InputCheckbox";
import { MakePartialPublicPost, PublicPost } from "@/dto/dto";
import { createPostAction } from "@/actions/create-post-action";
type ManagePostFormProps = {
  publicPost?: PublicPost;
};
export const ManagePostForm = ({ publicPost }: ManagePostFormProps) => {
  const initialState = {
    formState: MakePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    createPostAction,
    initialState
  );

  const { formState } = state;

  const [contentValue, setContentValue] = useState(publicPost?.content || "");

  return (
    <form action={action} className="flex flex-col gap-6">
      <InputText
        labelText="Autor"
        name="author"
        defaultValue={formState.author}
      />
      <InputText
        labelText="Título"
        name="title"
        defaultValue={formState.title}
      />
      <InputText
        labelText="Resumo"
        name="excerpt"
        defaultValue={formState.excerpt}
      />
      <MarkdownEditor
        labelText="Conteúdo"
        disabled={false}
        textAreaName="content"
        value={contentValue}
        setValue={setContentValue}
      />
      <ImageUploader />
      <InputText
        defaultValue={formState.coverImageUrl}
        labelText="Url da imagem de capa"
        name="coverImageUrl"
      />
      <InputCheckbox
        labelText="Público"
        name="published"
        defaultChecked={formState.published}
      />
      <Button className="w-full mt-6" variant="default" size="md">
        Enviar
      </Button>
    </form>
  );
};
