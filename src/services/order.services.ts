import prisma from "../config/prisma.config";
import { EditOrderDto, OrderDto } from "../validators/order.validates";

const orderServices = {
    async createOrder(orderDto: OrderDto) {
        return prisma.order.create({
            data: {
                totalPrice: orderDto.totalPrice,
                items: {
                    create: orderDto.items.map(item => ({
                        menuId: item.menuId,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        note: item.note,
                        addons: {
                            create: item.addons?.map(addon => ({
                                addonId: addon.addonId,
                                quantity: addon.quantity,
                                unitPrice: addon.unitPrice
                            })) || []
                        }
                    }))
                }
            }
        })
    },

    async getOrder() {
        return prisma.order.findMany();
    },

    async findOrder(id: number) {
        return prisma.order.findUnique({
            where: { id: id }
        })
    },

    async updateOrder(id: number, dataDTO: EditOrderDto) {
        return prisma.order.update({
            where: { id: id },
            data: {
                status: dataDTO.status
            }
        })
    }
}

export default orderServices;