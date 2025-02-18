import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: 1 },
    password: { type: String, required: true },

    latitude: { type: String },
    longitude: { type: String },
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
