import { jwtVerify } from "jose";

export const getJwtSecretKey = () => {
  const secretKey = process.env.NEXT_APP_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Secret key is not defined");
  }
  return new TextEncoder().encode(secretKey);
};

export async function verifyJwtToken(token) {
  const key = getJwtSecretKey();

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Token verification failed:");
    return null;
  }
}

export const isAuthPages = (url) => {
  const AUTH_PAGES = ["/login", "/signup"];

  return AUTH_PAGES.some((page) => page.startsWith(url));
};
