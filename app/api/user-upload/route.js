import { NextResponse } from "next/server";
import { verifyJwtToken, getJwtSecretKey } from "@/utils/auth";
import User from "@/models/userModel";
import { SignJWT } from "jose";
import connectDB from "@/config/database";
export async function POST(req) {
  const { cookies, url, nextUrl } = req;
  const { value: token } = cookies.get("token") ?? { value: null };
  const { email } = await verifyJwtToken(token, getJwtSecretKey());
  const data = await req.formData();

  await connectDB();

  // check the user's token is valid?
  const isValidToken = await verifyJwtToken(token, getJwtSecretKey());
  if (!isValidToken) {
    const response = NextResponse.redirect(new URL("/login", url)).json(
      { message: "Invalid token.Please log in again." },
      { status: 401 }
    );
    response.headers.set("Set-Cookie", "token=; Path=/; Max-Age=0");
    return response;
  }

  // database call and update user's field such as profile pic , name , lastname..
  const user = await User.findOne({ email });
  if (user) {
    const newFirstName = data.get("firstName");
    const newLastName = data.get("lastName");

    if (!newFirstName || !newLastName) {
      const response = NextResponse.json({
        message: "Name and Lastname are required",
      });
      return response;
    }

    user.name = newFirstName;
    user.lastName = newLastName;
    await user.save();

    // email update
    const newEmail = data.get("email");
    if (newEmail && newEmail !== user.email) {
      user.email = newEmail;
      await user.save();
      // update the token
      const token = await new SignJWT({ email: newEmail })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(getJwtSecretKey());

      const response = NextResponse.json({
        message: "Email updated successfully",
      });
      response.cookies.set("token", token, { httpOnly: true, path: "/" });
      return response;
    }
    // res.cookies.set("token", token, { httpOnly: true, path: "/" });

    // if (data.get("profilePic")) {
    //   const profilePic = data.get("profilePic");
    //   const reader = profilePic.stream().getReader();
    //   let chunks = [];
    //   while (true) {
    //     const { done, value } = await reader.read();
    //     if (done) break;
    //     chunks.push(value);
    //   }
    //   const file = new Blob(chunks, { type: profilePic.type });
    //   user.profilePic = file;
    // }
  }

  const response = NextResponse.json({ message: "File uploaded successfully" });
  return response;
}
