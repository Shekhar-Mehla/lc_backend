import Joi from "joi";
import {
  CONFIRMPASSWROD,
  EMAIL,
  largeString,
  PASSWORD,
  smallStringREQ,
} from "../Utility/Joi/joiConstant.js";

import responseClientMiddlleware from "./responseClientMiddlleware.js";
// name: { type: String, required: true,},
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   locations: [
//     {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Location",
// },

export const newUserDataValidation = (req, res, next) => {
  const obj = Joi.object({
    name: smallStringREQ,
    email: EMAIL,
    password: PASSWORD,
    location: largeString,
    confirmedPassword: CONFIRMPASSWROD,
  });

  return dataValidationProcesser({ req, res, next, obj });
};
export const loginUserDataValidation = (req, res, next) => {
  const obj = Joi.object({
    email: EMAIL,
    password: PASSWORD,
  });

  return dataValidationProcesser({ req, res, next, obj });
};

const dataValidationProcesser = ({ req, res, next, obj }) => {
  try {
    const { value, error } = obj.validate(req.body);
    if (!error) {
      return next();
    }

    const message = error.message;
    const statusCode = 403;

    return responseClientMiddlleware({
      req,
      res,
      statusCode,
      message,
    });
  } catch (error) {
    next(error);
  }
};
