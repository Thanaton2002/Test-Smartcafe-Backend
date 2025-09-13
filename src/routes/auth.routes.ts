import express from "express";
import authController from "../controllers/auth.controller";
import validateMiddleware from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validates";

const authRouter = express.Router();

authRouter.post("/register", validateMiddleware(registerSchema), authController.register);
authRouter.post("/login", validateMiddleware(loginSchema), authController.login);

export default authRouter;