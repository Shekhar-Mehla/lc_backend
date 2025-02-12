import userCollection from "./UserSchema.js";

export const insertUserInDb = async (obj) => {
  const user = await userCollection(obj).save();
  return user;
};
