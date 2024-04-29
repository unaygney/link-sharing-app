import React from "react";
import Link from "next/link";
import CopyButton from "./copy-button";
import { cookies } from "next/headers";
import { verifyJwtToken } from "@/utils/auth";

export default async function PreviewHeader({ user }) {
  const tokenCookie = cookies()?.get("token") ?? null;
  let token;

  if (tokenCookie) {
    let { value: token2 } = tokenCookie;
    token = await verifyJwtToken(token2);
  }

  return (
    <>
      <div className="absolute -z-10 hidden md:block rounded-b-[32px]  top-0 left-0 right-0 w-full h-[357px] bg-[#633CFF]"></div>
      {token && (
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
