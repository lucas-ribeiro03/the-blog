import bcrypt from "bcryptjs";

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
