import Joi from "joi";
import {
  largeString,
  largeStringREQ,
  smallStringREQ,
} from "../Utility/Joi/joiConstant.js";
import errorMiddleaware from "./errorMiddleaware.js";
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
    email: largeStringREQ,
    password: smallStringREQ,
    location: largeString,
  });

  return dataValidationProcesser({ req, res, next, obj });
};

const dataValidationProcesser = ({ req, res, next, obj }) => {
  const { value, error } = obj.validate(req.body);
  if (error) {
    next(error);
  }
};
