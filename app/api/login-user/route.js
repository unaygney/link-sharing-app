import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/utils/auth";

connectDB();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    //check if all fields are filled
    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 400 });
    }

    //check if password is correct
    const isMatch = await bcryptjs.compare(password, user.password);

    // if user exists and password is incorrect
    if (user && !isMatch) {
      return NextResponse.json(
        { message: "You entered the wrong password" },
        { status: 400 }
      );
    }
    // finally if user and password are correct
    const token = await new SignJWT({ email: email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(getJwtSecretKey());

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    // set the cookie
    response.cookies.set("token", token, {
      name: "token",
      value: token,
      path: "/",
    });

    return response;
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "An error occurred", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
