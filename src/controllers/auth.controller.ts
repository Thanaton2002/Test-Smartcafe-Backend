import { Request, Response } from "express";
import { ErrorApiResponse, HttpStatus, SuccessApiResponse } from "../types/api.types";
import bcrypt from "bcryptjs";
import authService from "../services/auth.services";
import { LoginDto, RegisterDto } from "../validators/auth.validates";
import { envConfig } from "../config/env.config";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import createError from "../utils/createError.utils";


const authController = {
    // REGISTER FUNCTION
    async register(
        req: Request,
        res: Response<SuccessApiResponse | ErrorApiResponse>
    ) {

        const data = req.body as RegisterDto;

        const existUser = await authService.findUser(data.username)
        if (existUser) {
            return createError(HttpStatus.BAD_REQUEST, "Username already used")
        }

        data.password = await bcrypt.hash(data.password, 10);
        // console.log(data)

        const user = await authService.createUser(data);
        // console.log(user)

        res.status(HttpStatus.CREATED)
            .json({
                success: true,
                message: "Registered Successfully",
            });
    },

    // LOGIN FUNCTION
    async login(
        req: Request,
        res: Response<SuccessApiResponse<{ accessToken: string; expiresIn: string }> | ErrorApiResponse>
    ) {

        const data = req.body as LoginDto;

        const existUser = await authService.findUser(data.username);
        if (!existUser) {
            return createError(HttpStatus.BAD_REQUEST, "Username or Password do not matched")
        };

        const isPasswordValid = await bcrypt.compare(data.password, existUser.password);
        if (!isPasswordValid) {
            return createError(HttpStatus.BAD_REQUEST, "Username or Password do not matched")
        };

        const payload = {
            username: existUser.username
        }

        const token = jwt.sign(payload, envConfig.JWT_SECRET as string,
            {
                expiresIn: "7d",
                algorithm: "HS256"
            });

        res.status(HttpStatus.OK)
            .json({
                success: true,
                message: "Login Successfully",
                data: {
                    accessToken: token,
                    expiresIn: envConfig.JWT_EXPIRES_IN
                }
            })
    }
};


export default authController