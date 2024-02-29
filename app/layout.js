import { mainFont } from "@/utils/font";
import "./globals.css";

export const metadata = {
  title: "Link Sharing App",
  description: "a web app where developers can share their social links",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mainFont.className}>{children}</body>
    </html>
  );
}
