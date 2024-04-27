"use client";
import React from "react";
import IconLinks from "@/public/icon-links.svg";
import IconProfile from "@/public/icon-profile.svg";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabsMenu() {
  const pathname = usePathname();
  return (
    <div className="w-[148px] md:w-[309px] lg:w-[325px] lg:gap-4 md:h-[46px] h-[42px]  flex">
      <Link
        href={"/"}
        className={clsx(
          "flex-1 inline-flex gap-2 items-center justify-center rounded-lg text-gray transition-colors duration-300  ",
          { "text-purple bg-very-light-purple ": pathname === "/" }
        )}
      >
        <IconLinks />
        <p
          className={clsx(
            "text-base font-semibold leading-6 text-gray hidden md:block transition-colors duration-300",
            { "text-purple bg-very-light-purple ": pathname === "/" }
          )}
        >
          Links
        </p>
      </Link>
      <Link
        href={"/profile"}
        className={clsx(
          "flex-1 inline-flex gap-2 items-center justify-center rounded-lg text-gray transition-colors duration-300 ",
          { "text-purple bg-very-light-purple ": pathname === "/profile" }
        )}
      >
        <IconProfile />
        <p
          className={clsx(
            "text-base font-semibold leading-6 text-gray hidden md:block transition-colors duration-300 ",
            { "text-purple bg-very-light-purple ": pathname === "/profile" }
          )}
        >
          Profile Details
        </p>
      </Link>
    </div>
  );
}
