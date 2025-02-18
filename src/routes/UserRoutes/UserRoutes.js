import express from "express";
import {
  getAllUserLocation,
  updateUserLocation,
} from "../../controllers/UserController.js";
import authMiddleware from "../../Middleware/authMiddleware.js";

export const UserRouter = express.Router();

UserRouter.get("/getLocation", authMiddleware, getAllUserLocation);
UserRouter.post("/getLocation", authMiddleware, updateUserLocation);
