import { SignJWT } from "jose";

const SECRET_KEY_ = import.meta.env.VITE_SECRET_KEY!;
const API_KEY = import.meta.env.VITE_API_KEY!;

const SECRET_KEY = new TextEncoder().encode(SECRET_KEY_);

export const encryptWithJWT = async () => {
  return await new SignJWT({ API_KEY: API_KEY })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(SECRET_KEY);
};
