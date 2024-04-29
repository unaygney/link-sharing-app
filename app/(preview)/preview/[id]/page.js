import mongoose from "mongoose";
import PreviewContainer from "@/containers/preview-container";
import React from "react";
import User from "@/models/userModel";
import connectDB from "@/config/database";
import { redirect } from "next/navigation";
export default async function Preview({ params }) {
  const userId = params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    redirect("/");
  }
  await connectDB();
  const user = await User.findOne({ _id: userId }, { password: 0 });

  return <PreviewContainer user={user} />;
}
