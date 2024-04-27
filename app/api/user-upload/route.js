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

    const data = await req.formData();
    const user = await User.findOne({ email });
    if (user) {
      const newFirstName = data.get("firstName");
      const newLastName = data.get("lastName");
      const profilePic = data.get("profilePicture");
      const newEmail = data.get("email") === "" ? email : data.get("email");

      if (!newFirstName || !newLastName) {
        return NextResponse.json({
          message: "Name and Lastname are required",
        });
      }

      let userImageData;

      // Handling profile picture update
      if (profilePic && profilePic !== "undefined") {
        const imageBuffer = await profilePic.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);
        const imageBase64 = imageData.toString("base64");

        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imageBase64}`,
          { folder: "link-shared-app" }
        );
        userImageData = result.secure_url;
      }

      user.name = newFirstName;
      user.lastName = newLastName;
      user.email = newEmail;
      userImageData && (user.profileImgUrl = userImageData);
      await user.save();

      const response = NextResponse.json(
        {
          message: "File uploaded successfully",
        },
        { status: 200 }
      );
      const newToken = await new SignJWT({ email: newEmail })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(getJwtSecretKey());

      response.cookies.set("token", newToken, { httpOnly: true, path: "/" });
      return response;
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
