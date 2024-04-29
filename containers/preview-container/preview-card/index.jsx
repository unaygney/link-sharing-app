import LinkCard from "@/components/LinkCard";
import React from "react";
import Image from "next/image";
export default function PreviewCard({ user }) {
  return (
    <section className=" md:shadow-lg md:px-14 md:mt-[126px] md:py-12 md:rounded-[24px] md:bg-white min-w-[237px] w-full  max-w-[349px] mx-auto z-20 mt-[60px] flex items-center flex-col">
      <div
        className={`w-[96px] border-4 border-purple h-[96px] bg-[#eee]   rounded-full relative overflow-hidden `}
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

      {/* usermaöe and email */}
      <div className="w-full flex flex-col items-center gap-2">
        <h2 className="text-[32px] font-bold text-custom-black">
          {user?.name} {user?.lastName}
        </h2>
        <p className="text-base font-normal text-dark-gray">{user?.email}</p>
      </div>
      <div className="flex flex-col w-full gap-5 mt-14">
        {user.links?.map((link, idx) => (
          <LinkCard key={idx} link={link} />
        ))}
      </div>
    </section>
  );
}
