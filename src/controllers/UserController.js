import { io } from "../../server.js";

import responseClientMiddlleware from "../Middleware/responseClientMiddlleware.js";
import { getAllUsers } from "../models/UserModel/UserModel.js";

export const getAllUserLocation = async (req, res, next) => {
  io.on("connection", (socket) => {
    console.log("user is connected");
    socket.on("send_location", (data) => {
      console.log(data);
    });
  });

  return responseClientMiddlleware({
    req,
    res,
    message: "here is user",
    payload: req.userInfo,
  });
};
export const updateUserLocation = async (req, res, next) => {
  // console.log(req.userInfo,"user information");s
};
