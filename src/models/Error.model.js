import httpStatus from "../constants/httpStatus.js";
import { MESSAGE } from "../constants/messages.js";

export class ErrorWithStatus {
  message;
  status;

  constructor({ message, status }) {
    this.message = message;
    this.status = status;
  }
}

export class EntityError extends ErrorWithStatus {
  errors;
  constructor({ message = MESSAGE.VALIDATION_ERROR, errors }) {
    super({ message, status: httpStatus.UNPROCESSABLE_ENTITY });
    this.errors = errors;
  }
}

// this model is define the used to reformat errors returned in a consistent manner
