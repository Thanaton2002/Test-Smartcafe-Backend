import { Request, Response } from "express";
import { ErrorApiResponse, HttpStatus, SuccessApiResponse } from "../types/api.types";
import { EditOrderDto, OrderDto } from "../validators/order.validates";
import menuServices from "../services/menu.services";
import createError from "../utils/createError.utils";
import orderServices from "../services/order.services";

export const orderController = {
    async createOrder(
        req: Request,
        res: Response<SuccessApiResponse>
    ) {

        const data = req.body as OrderDto;

        for (const item of data.items) {
            const currMenu = await menuServices.findMenuById(item.menuId);
            if (!currMenu) {
                return createError(HttpStatus.NOT_FOUND, `ไม่พบเมนูที่มี menu id: ${item.menuId}`);
            }
            if (currMenu?.price !== item.unitPrice) {
                return createError(HttpStatus.BAD_REQUEST, `ราคาสินค้า ${currMenu?.name} มีการเปลี่ยนแปลง กรุณาตรวจสอบยอดใหม่`);
            }
        }


        const createdOrder = await orderServices.createOrder(data);
        console.log(createdOrder);

        res.status(HttpStatus.CREATED)
            .json({
                success: true,
                message: "Create order successfully",
                data: { orderId: createdOrder.id }
            })
    },

    async findOrder(
        req: Request,
        res: Response<SuccessApiResponse>
    ) {
        
        const orderId = Number(req.params.orderId);
        const order = await orderServices.findOrder(orderId);
        if (!order) {
            return createError(HttpStatus.NOT_FOUND, `ไม่พบ order id นี้ในระบบ`);
        }

        res.status(HttpStatus.OK)
            .json({
                success: true,
                message: "Get order successfully",
                data: order
            })
    },

    async updateOrder(
        req: Request,
        res: Response<SuccessApiResponse>
    ) {
        const orderId = Number(req.params.orderId);
        const data = req.body as EditOrderDto;
        
        const order = await orderServices.findOrder(orderId);
        if (!order) {
            return createError(HttpStatus.NOT_FOUND, `ไม่พบ order id นี้ในระบบ`);
        }

        await orderServices.updateOrder(orderId, data);
        res.status(HttpStatus.OK)
            .json({
                success: true,
                message: "Update order successfully"
            })
    }
};