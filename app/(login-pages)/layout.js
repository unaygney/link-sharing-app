import { mainFont } from "@/utils/font";
import "../globals.css";
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${mainFont.className} antialiased scroll-smooth bg-light-gray`}
      >
        {children}
      </body>
    </html>
  );
}
