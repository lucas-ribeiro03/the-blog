"use client";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useActionState, useEffect, useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { InputCheckbox } from "@/components/InputCheckbox";
import { MakePartialPublicPost, PublicPost } from "@/dto/dto";
import { createPostAction } from "@/actions/create-post-action";
import { toast } from "react-toastify";
import { updatePostAction } from "@/actions/update-post-action";
import { useRouter, useSearchParams } from "next/navigation";
type ManagePostFormCreateProps = {
  mode: "create";
};
type ManagePostFormUpdateProps = {
  mode: "update";
  publicPost?: PublicPost;
};
type ManagePostFormProps =
  | ManagePostFormCreateProps
  | ManagePostFormUpdateProps;
export const ManagePostForm = (props: ManagePostFormProps) => {
  const { mode } = props;
  let publicPost;
  if (mode === "update") {
    publicPost = props.publicPost;
  }
  const initialState = {
    formState: MakePartialPublicPost(publicPost),
    errors: [],
  };

  const actionsMap = {
    create: createPostAction,
    update: updatePostAction,
  };
  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState
  );

  const searchParams = useSearchParams();
  const created = searchParams.get("created");
  const router = useRouter();

  const { formState } = state;
  const [contentValue, setContentValue] = useState(publicPost?.content || "");

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
  }, [state.errors]);
  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success("Post atualizado");
    }
  }, [state]);

  useEffect(() => {
    if (created === "1") {
      toast.dismiss();
      toast.success("Post criado com sucesso");
      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.toString());
    }
  }, [created, router]);

  return (
    <form action={action} className="flex flex-col gap-6">
      <InputText
        labelText="Autor"
        name="author"
        defaultValue={formState.author}
        disabled={isPending}
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
        disabled={isPending}
      />
      <MarkdownEditor
        labelText="Conteúdo"
        textAreaName="content"
        value={contentValue}
        setValue={setContentValue}
        disabled={isPending}
      />
      <ImageUploader disabled={isPending} />
      <InputText
        defaultValue={formState.coverImageUrl}
        labelText="Url da imagem de capa"
        name="coverImageUrl"
        disabled={isPending}
      />
      <InputCheckbox
        labelText="Público"
        name="published"
        defaultChecked={formState.published}
        disabled={isPending}
      />
      <Button
        className="w-full mt-6"
        variant="default"
        size="md"
        disabled={isPending}
      >
        Enviar
      </Button>
    </form>
  );
};
