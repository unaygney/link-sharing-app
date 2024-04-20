import React from "react";
import Link from "next/link";
import MobileIcon from "@/public/icon-preview-mobile.svg";
export default function PreviewButton() {
  return (
    <Link href={"/preview"}>
      <MobileIcon />
    </Link>
  );
}
