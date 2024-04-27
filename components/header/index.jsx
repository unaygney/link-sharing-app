import React from "react";
import TabsMenu from "./tabs-menu";
import PreviewButton from "./preview-button";
import Logo from "./logo";
export default function Header() {
  return (
    <header className="flex items-center justify-between  px-6 py-4 bg-white rounded-b-xl 2xl:mx-0 md:m-6">
      <Logo />
      <TabsMenu />
      <PreviewButton />
    </header>
  );
}
