import React from "react";

export default function Header() {
  return (
    <div className="flex flex-col gap-2 items-start">
      <h3 className="text-custom-black text-2xl font-bold">Profile Details</h3>
      <p className="text-base font-normal text-dark-gray">
        Add your details to create a personal touch to your profile.
      </p>
    </div>
  );
}
