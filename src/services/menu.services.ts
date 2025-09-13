import prisma from "../config/prisma.config";
import { MenuDto } from "../validators/menu.validates";

const menuServices = {
    async findMenu(name: string) {
        return prisma.menu.findUnique({
            where: { name }
        });
    },

    async createMenu(menuDTO: MenuDto, image?: string ) {
        return prisma.menu.create({
            data: {
                name: menuDTO.name,
                price: menuDTO.price,
                img: image
            }
        });
    },

    async getMenus() {
        return prisma.menu.findMany();
    }
};

export default menuServices;