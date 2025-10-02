import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEncodeKey = new TextEncoder().encode(jwtSecretKey);

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpString = process.env.LOGIN_EXPIRATION_STRING || "1d";
const loginCookieName = process.env.LOGIN_COOKIE_NAME || "loginSession";

type JwtPayload = {
  username: string;
  expiresAt: Date;
};

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
  const loginSession = await signJwt({ username, expiresAt });
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

export const getLoginSession = async () => {
  const cookieStore = await cookies();
  const jwt = cookieStore.get(loginCookieName)?.value;
  if (!jwt) return false;
  return await verifyJwt(jwt);
};

export const verifyLoginSession = async () => {
  const jwtPayload = await getLoginSession();
  console.log();
  if (!jwtPayload) return false;

  if (!(jwtPayload.username === process.env.LOGIN_USER)) {
    redirect("/admin/login");
  }

  return true;
};

export const signJwt = async (jwtPayload: JwtPayload) => {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(loginExpString)
    .sign(jwtEncodeKey);
};

export const verifyJwt = async (jwt: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodeKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch {
    console.log("Token inválido");
    return false;
  }
};
