import express from "express";
import authController from "../controllers/auth.controller";
import validateMiddleware from "../middlewares/validate.middleware";
import { registerSchema } from "../validators/auth.validates";

const authRouter = express.Router();

authRouter.post("/register", validateMiddleware(registerSchema), authController.register);

export default authRouter;