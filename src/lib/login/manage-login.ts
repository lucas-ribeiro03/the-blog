import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEncodeKey = new TextEncoder().encode(jwtSecretKey);

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpString = process.env.LOGIN_EXPIRATION_STRING || "1d";
const loginCookieName = process.env.LOGIN_COOKIE_NAME || "loginSession";

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  const hashedBase64 = Buffer.from(hash).toString("base64");

  return hashedBase64;
};

export const verifyPassword = async (
  password: string,
  hashedBase64: string
) => {
  const hashedPassword = Buffer.from(hashedBase64, "base64").toString("utf-8");
  return bcrypt.compare(password, hashedPassword);
};

export const createLoginSession = async (username: string) => {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = username + "JWT";
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: expiresAt,
  });
};

export const deleteLoginSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(loginCookieName);
};
