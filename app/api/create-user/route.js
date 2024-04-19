import connectDB from "@/config/database";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password, rePassword } = await request.json();
    await connectDB();

    // check if all fields are filled

    if (!email || !password || !rePassword) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // check if password and rePassword match
    if (password !== rePassword) {
      return new Response(
        JSON.stringify({ message: "Passwords do not match" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      const response = NextResponse.json(
        {
          message: "User already exists",
          success: false,
        },
        { status: 409 }
      );
      return response;
    }
    // add password hashing
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // add user to database
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // return success response
    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "An error occurred", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
