import React from "react";
import Image from "next/image";
export default function UserImage({ user }) {
  return (
    <div
      className={`w-[96px] h-[96px] bg-[#eee] mt-[63px] rounded-full relative overflow-hidden ${user?.profileImgUrl ? "border-[4px] border-purple" : ""} `}
    >
      {user?.profileImgUrl && (
        <Image
          src={user?.profileImgUrl}
          alt="User Profile Image"
          fill
          className="object-cover"
        />
      )}
    </div>
  );
}
