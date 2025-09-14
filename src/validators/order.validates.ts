import { z } from "zod";
import { OrderStatus } from "../../prisma/generated/prisma/client";

const statusType = Object.values(OrderStatus);

const addonSchema = z.object({
    addonId: z.number("addonId is required"),
    quantity: z.number().min(1, "Addon quantity must be at least 1"),
    unitPrice: z.number("unitPrice is required").min(0, "Unit price must be at least 0"),
});

const orderItemSchema = z.object({
    menuId: z.number("menuId is required"),
    quantity: z.number("quantity is required" ).min(1, "Quantity must be at least 1"),
    note: z.string().optional(),
    unitPrice: z.number("unitPrice is required").min(0, "Unit price must be at least 0"),
    addons: z.array(addonSchema).optional().default([]),
});

export const orderSchema = z.object({
    totalPrice: z.number("totalPrice is required").min(0, "Total price must be at least 0"),
    items: z.array(orderItemSchema).min(1, "Order must have at least 1 item"),
});

export const editOrderSchema = z.object({
    status: z.enum(statusType, "Invalid status").optional(),
});

export type OrderDto = z.infer<typeof orderSchema>;
export type EditOrderDto = z.infer<typeof editOrderSchema>;