import { NextResponse } from "next/server";
import { verifyJwtToken, getJwtSecretKey } from "@/utils/auth";
import User from "@/models/userModel";
import { SignJWT } from "jose";
import connectDB from "@/config/database";
import cloudinary from "@/config/cloudinary";

export async function POST(req) {
  const { cookies, url, nextUrl } = req;
  const { value: token } = cookies.get("token") ?? { value: null };
  const { email } = await verifyJwtToken(token, getJwtSecretKey());
  const data = await req.formData();

  console.log(data);

  //connect database
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
    const profilePic = data.get("profilePicture");
    const newEmail = data.get("email");

    if (!newFirstName || !newLastName) {
      const response = NextResponse.json({
        message: "Name and Lastname are required",
      });
      return response;
    }

    if (profilePic) {
      const imageBuffer = await profilePic.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      const imageBase64 = imageData.toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "link-shared-app",
        }
      );
      user.profileImgUrl = result.secure_url;
    }

    if (newEmail && newEmail !== user.email) {
      user.email = newEmail;

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

    user.name = newFirstName;
    user.lastName = newLastName;

    await user.save();
  }

  const response = NextResponse.json({ message: "File uploaded successfully" });
  return response;
}
