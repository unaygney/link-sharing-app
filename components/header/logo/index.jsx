import React from "react";
import Link from "next/link";
import LogoIcon from "@/public/logo-devlinks.svg";
import LogoName from "@/public/logo-name.svg";
export default function Logo() {
  return (
    <>
      <Link href={"/"} className="md:hidden">
        <LogoIcon />
      </Link>

      <Link href={"/"} className="hidden md:inline-flex items-center gap-1.5">
        <LogoIcon />
        <LogoName />
      </Link>
    </>
  );
}
