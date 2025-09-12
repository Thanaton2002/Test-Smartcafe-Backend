import { Request, Response } from "express";
import { ErrorApiResponse, HttpStatus } from "../types/api.types";

const notFoundMiddleware = (
    req: Request,
    res: Response<ErrorApiResponse>
) => {
    res.status(HttpStatus.NOT_FOUND)
        .json({ success: false, statusCode: HttpStatus.NOT_FOUND, message: "The requested URL was not found" });
};

export default notFoundMiddleware;