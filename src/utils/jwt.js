import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signToken = ({
  payload,
  privateKey,
  options = {
    algorithm: "HS256",
  },
}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, options, function (err, token) {
      if (err) {
        throw reject(err);
      }
      resolve(token);
    });
  });
};

export const VerifyToken = ({ token, privateKey }) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};
