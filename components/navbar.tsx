import React from "react";
import Image from "next/image";
import { ToggleTheme } from "@/components/toggle-theme";
import Link from "next/link";

export const Navbar = async (): Promise<React.JSX.Element> => {
  return (
    <nav
      className={
        "h-[var(--nav-height)] border-b border-dotted border-slate-800 p-4 font-poppins"
      }
    >
      <div className={"container flex items-center justify-between gap-x-4"}>
        <Link href={"/"} className={"flex items-center gap-x-2"}>
          <Image
            className={"rounded-full border-2 border-blue-600 p-0.5"}
            src={"/logo.webp"}
            alt={"Scholar sync logo"}
            height={40}
            width={40}
          />
          <p
            className={
              "hidden font-poppins font-semibold text-slate-700 dark:text-slate-200 md:block md:text-xl"
            }
          >
            Scholar Sync
          </p>
        </Link>

        <ToggleTheme />
      </div>
    </nav>
  );
};
