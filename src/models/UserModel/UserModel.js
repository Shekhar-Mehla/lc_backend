import userCollection from "./UserSchema.js";

export const insertUserInDb = async (obj) => {
  const user = await userCollection(obj).save();
  return user;
};
export const  updateUser = async (filter,update) => {
  

  const user = await userCollection.findOneAndUpdate(filter,update,{new:true})
  return user;
};

