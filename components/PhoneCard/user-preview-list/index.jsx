import LinkCard from "@/components/LinkCard";
import React from "react";

export default function UserPreviewList({ user }) {
  const { links } = user;
  if (links.length > 0) {
    return (
      <div className="w-full flex flex-col gap-5 px-[34.5px] mt-5 mb-10 max-h-[300px] overflow-scroll hide-scrollbar">
        {links.map((link, idx) => (
          <LinkCard key={idx} link={link} />
        ))}
        {Array.from({ length: 5 - links.length }, (_, idx) => (
          <div key={idx} className="h-11 w-full rounded-lg bg-[#eee] " />
        ))}
      </div>
    );
  }
}
