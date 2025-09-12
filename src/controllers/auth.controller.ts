import { Request, Response } from "express";
import { ErrorApiResponse, HttpStatus, SuccessApiResponse } from "../types/api.types";
import bcrypt from "bcryptjs";
import authService from "../services/auth.services";

const authController = {
    async register(req: Request, res: Response<SuccessApiResponse | ErrorApiResponse>) {
        const data = req.body

        const existUser = await authService.findUser(data.username)
        if (existUser) {
            res.status(HttpStatus.BAD_REQUEST)
                .json({
                    success: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: "User already used"
                })
        }

        data.password = await bcrypt.hash(data.password, 10);
        // console.log(data)

        const user = await authService.createUser(data);
        console.log(user)
        res.status(HttpStatus.CREATED)
            .json({
                success: true,
                message: "Registered Successfully",
            });
    },

    login(req: Request, res: Response<SuccessApiResponse<{ access_token: string }>>) {
        res.status(HttpStatus.OK)
            .json({
                success: true,
                message: "Login Successfully",
                data: { access_token: "" }
            })
    }
};


export default authController