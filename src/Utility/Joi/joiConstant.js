import Joi from "joi";
export const smallString = Joi.string().min(3).max(30);
export const smallStringREQ = smallString.required();

export const largeString = Joi.string().min(3).max(300);
export const largeStringREQ = largeString.required();

