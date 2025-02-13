import express from "express";
import { activateUser, insertUser,loginUser } from "../../controllers/authController.js";
import { loginUserDataValidation, newUserDataValidation } from "../../Middleware/AuthdatavalidationMiddleware.js";

export const AuthRouter = express.Router();

AuthRouter.post("/register", newUserDataValidation, insertUser);
AuthRouter.post("/activate-user", activateUser);
AuthRouter.post("/login",loginUserDataValidation, loginUser);
