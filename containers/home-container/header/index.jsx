import React from "react";
import LogoSmall from "@/public/logo-devlinks-small.svg";
import TabsMenu from "./tabs-menu";
import PreviewButton from "./preview-button";
export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <LogoSmall />
      <TabsMenu />
      <PreviewButton />
    </header>
  );
}
