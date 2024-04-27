import { getJwtSecretKey, verifyJwtToken } from "@/utils/auth";
import { cookies } from "next/headers";
import User from "@/models/userModel";
import connectDB from "@/config/database";
export default async function PhoneCard() {
  const cookie = cookies();
  const { value: token } = cookie.get("token") ?? null;
  const { email } = await verifyJwtToken(token);

  if (email) {
    connectDB();
    const user = await User.find({ email }, { password: 0 });
    console.log(user);
  }

  return (
    <section className="flex-1 xl:flex items-center justify-center bg-white rounded-xl m-4 hidden  2xl:ml-0 p-6">
      <svg
        width="308"
        height="632"
        viewBox="0 0 308 632"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
      >
        <path
          d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z"
          stroke="#737373"
        />
        <path
          d="M12 55.5C12 30.9233 31.9233 11 56.5 11H80.5C86.8513 11 92 16.1487 92 22.5C92 30.5081 98.4919 37 106.5 37H201.5C209.508 37 216 30.5081 216 22.5C216 16.1487 221.149 11 227.5 11H251.5C276.077 11 296 30.9233 296 55.5V576.5C296 601.077 276.077 621 251.5 621H56.5C31.9233 621 12 601.077 12 576.5V55.5Z"
          fill="white"
          stroke="#737373"
        />
      </svg>
    </section>
  );
}
