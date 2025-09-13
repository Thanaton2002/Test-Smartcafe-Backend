import { NextFunction, Request, Response } from "express";
import { ErrorApiResponse, HttpStatus, SuccessApiResponse } from "../types/api.types";
import createError from "../utils/createError.utils";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.config";

const authenCheck = (
    req: Request,
    res: Response<SuccessApiResponse>,
    next: NextFunction
) => {

    try {
        const header = req.headers.authorization;
        if (!header) {
            createError(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }

        const token = header?.split(" ")[1];
        if (!token) {
            createError(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }

        jwt.verify(token as string, envConfig.JWT_SECRET, (err, decoded) => {
            if (err) {
                createError(HttpStatus.UNAUTHORIZED, "Invalid Token");
            }
            (req as any).user = decoded as { username: string };
            next();
        })
    } catch (error) {
        next(error)
    }

}

export default authenCheck;
