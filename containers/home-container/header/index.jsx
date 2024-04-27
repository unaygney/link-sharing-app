import React from "react";

export default function Header() {
  return (
    <div className="flex flex-col gap-2 items-start">
      <h3 className="text-custom-black text-2xl font-bold">
        Customize your links
      </h3>
      <p className="text-base font-normal text-dark-gray">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
    </div>
  );
}
