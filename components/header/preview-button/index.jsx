import React from "react";
import Link from "next/link";
import MobileIcon from "@/public/icon-preview-mobile.svg";
import { cookies } from "next/headers";
import User from "@/models/userModel";
import { verifyJwtToken } from "@/utils/auth";
import connectDB from "@/config/database";

export default async function PreviewButton() {
  const { value: token } = cookies().get("token");
  const { email } = await verifyJwtToken(token);
  await connectDB();
  const user = await User.findOne({ email });

  return (
    <Link
      href={`/preview/${user.id}`}
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
