import connectDB from "@/config/database";
import User from "@/models/userModel";
import { verifyJwtToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { cookies } = await req;
  const { links } = await req.json();

  const { value: token } = cookies.get("token");

  // check if token is valid or not
  const isValidToken = await verifyJwtToken(token);
  if (!isValidToken) {
    const response = NextResponse.json({
      message: "Invalid token",
    });
    return response;
  }

  // check if links length is empty or not
  if (links.length === 0) {
    const response = NextResponse.json({
      message: "Please add at least one link",
    });
    return response;
  }

  // if token is valid , then get the user from db using the email.
  const { email } = isValidToken;
  await connectDB();
  const user = await User.findOne({ email });

  console.log(user);
  const latestLinks = {};

  links.forEach((link) => {
    latestLinks[link.platform] = link;
  });

  user.links = Object.values(latestLinks);
  await user.save();

  const response = NextResponse.json({
    message: "Your links have been saved successfully",
  });
  return response;
}
