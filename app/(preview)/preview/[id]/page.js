import PreviewContainer from "@/containers/preview-container";
import React from "react";
import User from "@/models/userModel";
import connectDB from "@/config/database";
import { redirect } from "next/dist/server/api-utils";
export default async function Preview({ params }) {
  const userId = params.id;
  await connectDB();
  const user = await User.findOne({ _id: userId }, { password: 0 });

  if (!user) {
    redirect("/");
  }

  return <PreviewContainer user={user} />;
}
