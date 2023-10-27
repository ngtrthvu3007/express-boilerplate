import { createHash } from "node:crypto";
import dotenv from "dotenv";
dotenv.config();

export function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

export function hashPassword(password) {
  return sha256(password + process.env.PASSWORD_PRIVATE_KEY);
}
