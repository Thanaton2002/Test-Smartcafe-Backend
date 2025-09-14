import express from "express";
import validateMiddleware from "../middlewares/validate.middleware";
import { orderSchema } from "../validators/order.validates";
import { orderController } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/", validateMiddleware(orderSchema), orderController.createOrder);
orderRouter.get("/:orderId", orderController.findOrder);
orderRouter.patch("/:orderId", orderController.updateOrder);

export default orderRouter;