import { checkSchema } from "express-validator";
import { MESSAGE } from "../constants/messages.js";
import { hashPassword } from "../utils/hashPassword.js";
import validate from "../utils/validateSchema.js";
import User from "../models/User.model.js";
import validateToken from "../utils/validateToken.js";
import dotenv from "dotenv";
dotenv.config();

export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: MESSAGE.NAME_Is_REQUIRED,
        },
        isString: {
          errorMessage: MESSAGE.NAME_MUST_BE_A_STRING,
        },
        trim: true,
        isLength: {
          options: {
            min: 3,
            max: 10,
          },
          errorMessage: MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_100,
        },
      },
      email: {
        isEmail: {
          errorMessage: MESSAGE.EMAIL_IS_INVALID,
        },
        notEmpty: {
          errorMessage: MESSAGE.EMAIL_IS_REQUIRED,
        },
        trim: true,
        custom: {
          options: async (value) => {
            const isExists = await User.findOne({ email: value });
            if (isExists) {
              throw new Error(MESSAGE.EMAIL_ALREADY_EXISTS);
            }
            return true;
          },
        },
      },
      password: {
        isStrongPassword: {
          options: {
            minLength: 1,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          },
          errorMessage: MESSAGE.PASSWORD_MUST_BE_STRONG,
        },
        notEmpty: {
          errorMessage: MESSAGE.PASSWORD_Is_REQUIRED,
        },
        isString: {
          errorMessage: MESSAGE.PASSWORD_MUST_BE_A_STRING,
        },
        isLength: {
          options: {
            min: 6,
            max: 50,
          },
          errorMessage: MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50,
        },
      },
      confirm_password: {
        isStrongPassword: {
          options: {
            minLength: 1,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          },
          errorMessage: MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRONG,
        },
        notEmpty: {
          errorMessage: MESSAGE.CONFIRM_PASSWORD_Is_REQUIRED,
        },
        isString: { errorMessage: MESSAGE.CONFIRM_PASSWORD_MUST_BE_A_STRING },
        isLength: {
          options: {
            min: 6,
            max: 50,
          },
          errorMessage: MESSAGE.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50,
        },
        custom: {
          options: async (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(MESSAGE.CONFIRM_PASSWORD_NOT_MATCH);
            }
            return true;
          },
        },
      },
      phone: {
        isMobilePhone: {
          locale: "vi-VN",
          errorMessage: MESSAGE.PHONE_Is_INVALID,
        },
        notEmpty: {
          errorMessage: MESSAGE.PHONE_Is_REQUIRED,
        },
        custom: {
          options: async (value) => {
            const isExists = await User.findOne({ phone: value });
            if (isExists) {
              throw new Error(MESSAGE.PHONE_ALREADY_EXISTS);
            }
            return true;
          },
        },
      },
      address: {
        optional: true,
        isString: {
          errorMessage: MESSAGE.NAME_MUST_BE_A_STRING,
        },
        trim: true,
      },
    },
    ["body"]
  )
);

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        isEmail: {
          errorMessage: MESSAGE.EMAIL_IS_INVALID,
        },
        notEmpty: {
          errorMessage: MESSAGE.EMAIL_IS_REQUIRED,
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await User.findOne({ email: value, password: hashPassword(req.body.password) });
            if (!user) {
              throw new Error(MESSAGE.USER_IS_NOT_FOUND);
            }
            return true;
          },
        },
      },
    },
    ["body"]
  )
);

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value, { req }) => {
            const decoded_authorization = await validateToken(value);
            const { iat, exp } = decoded_authorization;
            if (iat >= exp) {
              throw new Error(MESSAGE.TOKEN_IS_EXPIRED);
            }
            req.decoded_authorization = decoded_authorization;
            return true;
          },
        },
      },
    },
    ["headers"]
  )
);
