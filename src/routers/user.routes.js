import { Router } from "express";
import { getMyProfileController, loginController, registerController } from "../controllers/user.controllers.js";
import { registerValidator, loginValidator, accessTokenValidator } from "../middlewares/user.middlewares.js";
import wrapError from "../utils/wrapError.js";
// wrapError is used to carry error to defaultErrorHandler if error occur
const userRouter = Router();

userRouter.post("/register", registerValidator, wrapError(registerController));
userRouter.post("/login", loginValidator, wrapError(loginController));
userRouter.get("/my-profile", accessTokenValidator, wrapAsync(getMyProfileController));

export default userRouter;
