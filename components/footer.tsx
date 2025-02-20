import React from "react";

export const Footer = (): React.ReactNode => {
  return (
    <section>
      <div
        className={
          "flex h-[var(--nav-height)] items-center justify-center gap-x-2 border-t border-dotted border-t-slate-800 py-6 font-poppins text-slate-300 xs:text-xs md:text-xl"
        }
      >
        © 2025 Scholar Sync. Made with{" "}
        <span className={"text-2xl text-blue-500"}> ♥</span> by Akshat.
      </div>
    </section>
  );
};
