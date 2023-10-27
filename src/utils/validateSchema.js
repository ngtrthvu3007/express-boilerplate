import { validationResult } from "express-validator";
import { EntityError, ErrorWithStatus } from "../models/Errors.model.js";
import httpStatus from "../constants//http.status.js";

export default validate = (validation) => {
  return async (req, res, next) => {
    await validation.run(req);

    const errors = validationResult(req);
    const errorsObject = errors.mapped();
    const entityError = new EntityError({ errors: {} });
    // no error -> request continue
    if (errors.isEmpty()) {
      return next();
    }

    for (const key in errorsObject) {
      const { msg } = errorsObject[key];
      //  normal errors
      if (msg instanceof ErrorWithStatus && msg.status !== httpStatus.UNPROCESSABLE_ENTITY) {
        return next(msg);
      }
      entityError.errors[key] = errorsObject[key];
    }
    // validation errors
    next(entityError);
  };
};
