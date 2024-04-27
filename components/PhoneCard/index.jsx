import { verifyJwtToken } from "@/utils/auth";
import { cookies } from "next/headers";
import User from "@/models/userModel";
import connectDB from "@/config/database";
import PhoneMockup from "@/public/illustration-phone-mockup.svg";
import UserCard from "./user-card";
import UserImage from "./user-image";
import UserPreviewList from "./user-preview-list";

export const dynamic = "force-dynamic";

export default async function PhoneCard() {
  const cookie = cookies();
  const { value: token } = cookie.get("token") ?? null;
  const { email } = await verifyJwtToken(token);

  await connectDB();
  const user = await User.findOne({ email }, { password: 0 });

  return (
    <section className="flex-1 xl:flex items-center justify-center bg-white rounded-xl m-4 hidden  2xl:ml-0 p-6">
      <div className="relative  ">
        <PhoneMockup />
        <div className="absolute  inset-0 flex flex-col items-center  ">
          <UserImage user={user} />
          <UserCard user={user} />
          <UserPreviewList user={user} />
        </div>
      </div>
    </section>
  );
}
