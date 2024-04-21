import { NextResponse } from "next/server";
import { verifyJwtToken, getJwtSecretKey } from "@/utils/auth";

export async function POST(req) {
  const { cookies, url, nextUrl } = req;
  const { value: token } = cookies.get("token") ?? { value: null };

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

  //   const data = await request.formData();
  //   console.log(data);

  const response = NextResponse.json({ message: "File uploaded successfully" });
  return response;
}
