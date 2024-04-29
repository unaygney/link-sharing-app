import React from "react";
import { mainFont } from "@/utils/font";
import "@/app/globals.css";
export default function PreviewLayout({ children }) {
  return (
    <html>
      <body
        className={`${mainFont.className} antialiased    scroll-smooth bg-light-gray p-6  2xl:px-6   mx-auto container  `}
      >
        {children}
      </body>
    </html>
  );
}
