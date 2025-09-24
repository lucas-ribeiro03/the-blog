import { ManagePostForm } from "@/components/Admin/ManagePostForm";
import { MakePublic } from "@/dto/dto";
import { findPostByIdAdmin } from "@/lib/queries/admin";

export const dynamic = "force-dynamic";

type AdminPostIdPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;
  const post = await findPostByIdAdmin(id);
  if (!post) return;
  const publicPost = MakePublic(post);
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">Editar post</h1>
      <ManagePostForm publicPost={publicPost} />
    </div>
  );
}
