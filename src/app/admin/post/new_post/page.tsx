import { ManagePostForm } from "@/components/Admin/ManagePostForm";

export const dynamic = "force-dynamic";

export default async function AdminNewPostPage() {
  return (
    <div className="py-6 ">
      <ManagePostForm />
    </div>
  );
}
