"use client";

import { logoutAction } from "@/actions/login/logout-action";
import clsx from "clsx";
import {
  CircleXIcon,
  FileTextIcon,
  HourglassIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export const MenuAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const handleLogout = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    startTransition(async () => {
      await logoutAction();
    });
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const linkClasses = clsx(
    "px-4 flex items-center justify-start gap-2 h-10 transition hover:bg-slate-800 shrink-0 cursor-pointer"
  );
  return (
    <nav
      className={clsx(
        "bg-slate-900 text-slate-100 rounded-lg flex flex-col mb-8 sm:flex-row sm:flex-wrap sm:overflow-visible sm:h-auto",
        !isOpen && "overflow-hidden",
        !isOpen && "h-10"
      )}
    >
      <button
        className={clsx(linkClasses, "italic text-blue-200 sm:hidden")}
        onClick={() => setIsOpen((s) => !s)}
      >
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}

        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>
      <a className={linkClasses} href="/" target="_blank">
        <HouseIcon size={16} />
        Home
      </a>
      <Link href={"/admin/post"} className={linkClasses}>
        <FileTextIcon size={16} />
        Posts
      </Link>
      <Link href={"/admin/post/new_post"} className={linkClasses}>
        <PlusIcon size={16} />
        Criar post
      </Link>

      <a className={linkClasses} href="" onClick={handleLogout}>
        {isPending && (
          <>
            <HourglassIcon className="motion-safe:animate-spin" />
            Saindo...
          </>
        )}

        {!isPending && (
          <>
            <LogOutIcon />
            Sair
          </>
        )}
      </a>
    </nav>
  );
};
