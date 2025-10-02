import { MenuAdmin } from "@/components/Admin/MenuAdmin";
import { verifyLoginSession } from "@/lib/login/manage-login";

type AdminPostsLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminPostsLayout({
  children,
}: Readonly<AdminPostsLayoutProps>) {
  await verifyLoginSession();
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
