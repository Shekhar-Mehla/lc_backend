import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    location: {
      type: String,
      required: true,
    },
    refreshJwt: {
      type: String,
    },
    status: {
      type: String,
      default: "inactive",
    },
  },
  { timestamps: true }
);

const userCollection = new mongoose.model("user", userSchema);
export default userCollection;
