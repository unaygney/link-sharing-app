import { jwtVerify } from "jose";

export const getJwtSecretKey = () => {
  const secretKey = process.env.SECRET_KEY;

  if (!secretKey) {
    throw new Error("Secret key is not defined");
  }
  return new TextEncoder().encode(secretKey);
};

export async function verifyJwtToken(token) {
  return new Promise((resolve, reject) => {
    jwtVerify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
}
