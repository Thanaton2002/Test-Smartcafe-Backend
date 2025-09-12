import prisma from '../config/prisma.config';
import { RegisterDto } from './../validators/auth.validates';
const authService = {
    async createUser(registerDto: RegisterDto) {
        return prisma.user.create({
            data: registerDto
        })
    },

    async findUser(username: string) {
        return prisma.user.findUnique({
            where: {
                username
            }
        })
    }
}

export default authService;