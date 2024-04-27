import { mainFont } from "@/utils/font";
import "../globals.css";
import Header from "@/components/header";

export const metadata = {
  title: "Link Sharing App",
  description: "a web app where developers can share their social links",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${mainFont.className} antialiased scroll-smooth bg-light-gray 2xl:px-6   mx-auto container  `}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
