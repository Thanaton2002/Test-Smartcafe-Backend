import { NextFunction, Request, Response } from "express";
import { ErrorApiResponse, HttpStatus } from "../types/api.types";
import { ZodError } from "zod";

const errorHandlerMiddleware = (
    error: unknown,
    req: Request,
    res: Response<ErrorApiResponse>,
    next: NextFunction
) => {

    if (error instanceof ZodError) {
        const details = error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));

        return res.status(HttpStatus.BAD_REQUEST)
            .json({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Validation failed",
                details
            });
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
            success: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error instanceof Error ? error.message : "Internal server Error"
        });
}

export default errorHandlerMiddleware;