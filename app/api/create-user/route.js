import connectDB from "@/config/database";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const { email, password, rePassword } = await request.json();

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
    // add password hashing
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // add user to database
    const newUser = new User({ email, password: hashedPassword });
    const savedUser = await newUser.save();

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
