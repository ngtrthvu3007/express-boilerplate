import { VerifyToken } from "./jwt.js";
import { MESSAGE } from "../constants/messages.js";
import httpStatus from "../constants/http.status.js";
import dotenv from "dotenv";
dotenv.config();

export default validateToken = async (token) => {
  const access_token = (token || "").split(" ")[1];
  if (!access_token) {
    throw new ErrorWithStatus({ message: MESSAGE.ACCESS_TOKEN_IS_REQUIRED, status: httpStatus.UNAUTHORIZED });
  }
  const decoded_authorization = await VerifyToken({
    token: access_token,
    privateKey: process.env.PRIVATE_ACCESS_KEY,
  });
  const modifiedToken = { ...decoded_authorization, user_id: decoded_authorization.user_id.user_id };
  return modifiedToken;
};
