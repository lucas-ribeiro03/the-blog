"use client";

import clsx from "clsx";
import {
  CircleXIcon,
  FileTextIcon,
  HouseIcon,
  MenuIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const MenuAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

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
      <Link href={"/admin/posts"} className={linkClasses}>
        <FileTextIcon size={16} />
        Posts
      </Link>
      <Link href={"/admin/post/new_post"} className={linkClasses}>
        <PlusIcon size={16} />
        Criar post
      </Link>
    </nav>
  );
};
