import express from "express";
import { insertUser } from "../../controllers/authController.js";
import { newUserDataValidation } from "../../Middleware/AuthdatavalidationMiddleware.js";

export const AuthRouter = express.Router();

AuthRouter.post("/register", newUserDataValidation, insertUser);
