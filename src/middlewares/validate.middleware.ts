import { ZodType } from "zod";
import { NextFunction, Request, Response } from "express";

const validateMiddleware =
    <T>(schema: ZodType<T>) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = schema.parse(req.body);
                next();
            } catch (err: any) {
                next(err)
            }
        };

export default validateMiddleware;