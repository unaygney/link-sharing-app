"use client";
import React from "react";
import IconLinks from "@/public/icon-links.svg";
import IconProfile from "@/public/icon-profile.svg";
import { useTabsContext } from "../../context/tabsContext";
import clsx from "clsx";
export default function TabsMenu() {
  const { activeTab, setActiveTab } = useTabsContext();
  console.log(activeTab);
  return (
    <div className="w-[148px] md:w-[309px] lg:w-[325px] lg:gap-4 md:h-[46px] h-[42px]  flex">
      <button
        onClick={() => setActiveTab("links")}
        className={clsx(
          "flex-1 inline-flex gap-2 items-center justify-center rounded-lg text-gray transition-colors duration-300  ",
          {
            "bg-very-light-purple text-purple": activeTab === "links",
          }
        )}
      >
        <IconLinks />
        <p
          className={clsx(
            "text-base font-semibold leading-6 text-gray hidden md:block transition-colors duration-300",
            { "text-purple": activeTab === "links" }
          )}
        >
          Links
        </p>
      </button>
      <button
        onClick={() => setActiveTab("profile")}
        className={clsx(
          "flex-1 inline-flex gap-2 items-center justify-center rounded-lg text-gray transition-colors duration-300 ",
          {
            "bg-very-light-purple text-purple": activeTab === "profile",
          }
        )}
      >
        <IconProfile />
        <p
          className={clsx(
            "text-base font-semibold leading-6 text-gray hidden md:block transition-colors duration-300 ",
            { "text-purple": activeTab === "profile" }
          )}
        >
          Profile Details
        </p>
      </button>
    </div>
  );
}
