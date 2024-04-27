import React from "react";
import Link from "next/link";
import MobileIcon from "@/public/icon-preview-mobile.svg";
import Button from "@/components/Button";
export default function PreviewButton() {
  return (
    <Link
      href={"/preview"}
      className="w-[52px] md:hover:bg-very-light-purple md:w-[114px] md:h-[46px] h-[42px] border border-purple  inline-flex items-center justify-center rounded-lg"
    >
      <span className="text-purple md:hidden">
        <MobileIcon />
      </span>

      <p className="text-purple text-base font-semibold hidden md:block">
        Preview
      </p>
    </Link>
  );
}
