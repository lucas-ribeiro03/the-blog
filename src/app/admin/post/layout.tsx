import { MenuAdmin } from "@/components/Admin/MenuAdmin";

type AdminPostsLayoutProps = {
  children: React.ReactNode;
};

export default function AdminPostsLayout({
  children,
}: Readonly<AdminPostsLayoutProps>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
