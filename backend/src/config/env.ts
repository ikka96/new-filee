import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_VALUE = process.env.JWT_SECRET;
const JWT_EXPIRES_IN_VALUE = process.env.JWT_EXPIRES_IN || "1h";

if (!JWT_SECRET_VALUE) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const JWT_SECRET: string = JWT_SECRET_VALUE;
export const JWT_EXPIRES_IN: string = JWT_EXPIRES_IN_VALUE;
