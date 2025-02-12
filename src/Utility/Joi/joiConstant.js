import Joi from "joi";
export const smallString = Joi.string().min(3).max(30);
export const smallStringREQ = smallString.required();

export const largeString = Joi.string().min(3).max(300);
export const largeStringREQ = largeString.required();
export const EMAIL = smallStringREQ.email({ minDomainSegments: 2 });
export const PASSWORD = smallStringREQ.pattern(
  new RegExp("^[a-zA-Z0-9]{3,30}$")
);
export const CONFIRMPASSWROD = Joi.ref("password");
