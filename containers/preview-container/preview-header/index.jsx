import React from "react";
import { verifyJwtToken } from "@/utils/auth";
import { cookies } from "next/headers";
import Link from "next/link";
import CopyButton from "./copy-button";

export default async function PreviewHeader({ user }) {
  const { value: token } = cookies().get("token");
  const { email } = await verifyJwtToken(token);

  let isUserLoggedIn;

  if (!email) {
    isUserLoggedIn = false;
  } else {
    isUserLoggedIn = true;
  }

  return (
    <>
      <div className="absolute -z-10 hidden md:block rounded-b-[32px]  top-0 left-0 right-0 w-full h-[357px] bg-[#633CFF]"></div>
      {isUserLoggedIn && (
        <div className="flex z-20  justify-between gap-4 md:px-6 md:py-4  md:bg-white rounded-xl">
          <Link
            href="/"
            className="bg-white max-w-[159px] line-clamp-1 rounded-lg text-base font-semibold flex-1 inline-flex items-center justify-center text-purple border border-purple hover:bg-very-light-purple disabled:opacity-50 disabled:pointer-events-none"
          >
            Back to editor
          </Link>
          <CopyButton />
        </div>
      )}
    </>
  );
}
