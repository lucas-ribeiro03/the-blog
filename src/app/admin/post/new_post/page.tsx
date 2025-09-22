import { ManagePostForm } from "@/components/Admin/ManagePostForm";
import { Button } from "@/components/Button";

export const dynamic = "force-dynamic";

export default async function AdminNewPostPage() {
  return (
    <div className="py-6 ">
      <ManagePostForm />
    </div>
  );
}
