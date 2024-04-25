import { NextResponse } from "next/server";
import { verifyJwtToken, getJwtSecretKey } from "@/utils/auth";
import User from "@/models/userModel";
import { SignJWT } from "jose";
import connectDB from "@/config/database";
import cloudinary from "@/config/cloudinary";

export async function POST(req) {
  try {
    const { cookies, url } = req;
    const { value: token } = cookies.get("token") ?? { value: null };

    // Verifying JWT Token and extracting email
    const { email } = await verifyJwtToken(token, getJwtSecretKey());

    // Connect to database
    await connectDB();

    // Check if the token is still valid
    const isValidToken = await verifyJwtToken(token, getJwtSecretKey());
    if (!isValidToken) {
      const response = NextResponse.redirect(new URL("/login", url)).json(
        { message: "Invalid token. Please log in again." },
        { status: 401 }
      );
      response.headers.set("Set-Cookie", "token=; Path=/; Max-Age=0");
      return response;
    }

    const data = await req.formData();
    const user = await User.findOne({ email });
    if (user) {
      const newFirstName = data.get("firstName");
      const newLastName = data.get("lastName");
      const profilePic = data.get("profilePicture");
      const newEmail = data.get("email");

      if (!newFirstName || !newLastName) {
        return NextResponse.json({
          message: "Name and Lastname are required",
        });
      }

      // Handling profile picture update
      if (profilePic) {
        const imageBuffer = await profilePic.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);
        const imageBase64 = imageData.toString("base64");

        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imageBase64}`,
          { folder: "link-shared-app" }
        );
        user.profileImgUrl = result.secure_url;
      }

      // Update email and JWT token if email has changed
      if (newEmail && newEmail !== user.email) {
        user.email = newEmail;
        const newToken = await new SignJWT({ email: newEmail })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("2h")
          .sign(getJwtSecretKey());

        const response = NextResponse.json({
          message: "Email updated successfully",
        });
        response.cookies.set("token", newToken, { httpOnly: true, path: "/" });
        return response;
      }

      user.name = newFirstName;
      user.lastName = newLastName;
      await user.save();

      return NextResponse.json({ message: "File uploaded successfully" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      {
        message: "An error occurred while processing your request.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
