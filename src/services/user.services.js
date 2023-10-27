import User from "../models/User.model.js";
import { hashPassword } from "../utils/hashAlthorgism.js";
import { signToken } from "../utils/jwt.js";
import dotenv from "dotenv";
dotenv.config();

const signAccessToken = async (user_id) => {
  return signToken({
    payload: {
      user_id,
      token_type: "AccessToken",
    },
    privateKey: process.env.PRIVATE_ACCESS_KEY,
    options: {
      expiresIn: process.env.EXPIRED_IN_RT,
    },
  });
};

const signRefreshToken = async (user_id, exp) => {
  if (exp) {
    return signToken({
      payload: {
        user_id,
        token_type: "RefreshToken",
        exp,
      },
      privateKey: process.env.PRIVATE_REFRESH_KEY,
    });
  }
  return signToken({
    payload: {
      user_id,
      token_type: "RefreshToken",
    },
    privateKey: process.env.PRIVATE_REFRESH_KEY,
    options: {
      expiresIn: process.env.EXPIRED_IN_RT,
    },
  });
};
const register = async (newUser) => {
  const { name, email, password, phone, address, isAdmin } = newUser;
  const new_user = await User.create({
    name,
    email,
    password: hashPassword(password),
    phone,
    address,
    isAdmin,
  });
  if (new_user) {
    return {
      new_user,
    };
  }
};
const login = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  const [access_token, new_refresh_token] = await Promise.all([
    signAccessToken({ user_id: user._id }),
    signRefreshToken({ user_id: user._id }),
  ]);
  // cũ: tạm thời không lưu các token ở db mà trả ra client lưu vào local storage -> cần tạo model và lưu token vào db
  // updated: trả token mà không lưu token ở db, để client tự lưu vào local storage
  // thời hạn token là 3 ngày, client tự động check token hết hạn -> xóa token trong local storage -> logout account
  return {
    access_token: access_token,
    refresh_token: new_refresh_token,
  };
};

const getProfile = async (user_id) => {
  const user = await User.findById(user_id);
  const userWithoutPassword = (({ password, ...rest }) => rest)(user.toObject());
  return userWithoutPassword;
};

export default {
  register,
  login,
  getProfile,
};
