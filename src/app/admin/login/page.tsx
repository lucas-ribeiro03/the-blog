import { LoginForm } from "@/components/Admin/LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  return (
    <div className="py-6 text-6xl">
      <LoginForm />
    </div>
  );
}
