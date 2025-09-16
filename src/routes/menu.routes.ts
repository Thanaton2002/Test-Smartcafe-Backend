import express from "express";
import upload from "../middlewares/upload.middleware";
import menuController from "../controllers/menu.controller";
import authenCheck from "../middlewares/authen.middleware";
import validateMiddleware from "../middlewares/validate.middleware";
import { menuSchema } from "../validators/menu.validates";

const menuRouter = express.Router();

menuRouter.post("/",
    authenCheck,
    upload.single("image"),
    validateMiddleware(menuSchema),
    menuController.registerMenu);

menuRouter.get("/", menuController.getMenu);
menuRouter.get("/:menuid", menuController.getMenu);


export default menuRouter;