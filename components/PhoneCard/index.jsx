import { verifyJwtToken } from "@/utils/auth";
import { cookies } from "next/headers";
import User from "@/models/userModel";
import connectDB from "@/config/database";
import PhoneMockup from "@/public/illustration-phone-mockup.svg";
import Image from "next/image";
export default async function PhoneCard() {
  const cookie = cookies();
  const { value: token } = cookie.get("token") ?? null;
  const { email } = await verifyJwtToken(token);

  connectDB();
  const user = await User.findOne({ email }, { password: 0 });

  return (
    <section className="flex-1 xl:flex items-center justify-center bg-white rounded-xl m-4 hidden  2xl:ml-0 p-6">
      <div className="relative ">
        <PhoneMockup />
        <div className="absolute inset-0 border flex flex-col items-center  border-red">
          <div
            className={`w-[96px] h-[96px] bg-[#eee] mt-[63px] rounded-full relative overflow-hidden ${user.profileImgUrl ? "border-[4px] border-purple" : ""} `}
          >
            {user?.profileImgUrl && (
              <Image
                src={user.profileImgUrl}
                alt="User Profile Image"
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="mt-6 flex flex-col gap-2 text-center">
            <h3>
              {user?.name} {user?.lastName}
            </h3>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
