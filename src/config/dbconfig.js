import mongoose from "mongoose";
export const dbConnection = async () => {
  if (!process.env.Mongo_Url) {
    throw new Error("connection string is invalid");
  }
  const con = await mongoose.connect(process.env.Mongo_Url);
  return con && console.log("db is connected");
};
