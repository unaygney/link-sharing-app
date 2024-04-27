import React from "react";

export default function UserCard({ user }) {
  return (
    <>
      {user?.name && user.lastName ? (
        <div className="mt-6 flex flex-col gap-2 text-center  max-w-[225px]   line-clamp-1 ">
          <h3 className="text-custom-black font-bold text-[32px] ">
            {user?.name} {user?.lastName}
          </h3>
          <p className="text-base font-normal text-dark-gray ">{user?.email}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-[13px] mt-6">
          <div className="w-[160px] h-4  bg-[#eee] rounded-[104px]"></div>
          <div className="w-[72px] h-2 bg-[#eee] rounded-[104px]"></div>
        </div>
      )}
    </>
  );
}
