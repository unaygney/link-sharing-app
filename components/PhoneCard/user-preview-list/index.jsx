import React from "react";

export default function UserPreviewList({ user }) {
  return (
    <div className="w-full flex flex-col gap-3 px-[34.5px] mt-[56px]">
      {Array.from({ length: 5 }, (_, idx) => (
        <div key={idx} className="h-11 w-full rounded-lg bg-[#eee]"></div>
      ))}
    </div>
  );
}
