import { MESSAGE } from "../constants/messages.js";
import UserServices from "../services/user.services.js";

export const registerController = async (req, res) => {
  const result = await UserServices.register(req.body);
  return res.json({
    message: MESSAGE.REGISTER_SUCCESS,
    result,
  });
};

export const loginController = async (req, res) => {
  const user = req.body;
  const result = await UserServices.login(user);
  return res.json({
    message: MESSAGE.LOGIN_SUCCESS,
    result,
  });
};

export const getMyProfileController = async (req, res) => {
  const { user_id } = req.decoded_authorization;
  const user = await UserServices.getProfile(user_id);
  return res.json({
    message: MESSAGE.GET_YOUR_PROFILE,
    user,
  });
};
