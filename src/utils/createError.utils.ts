import { HttpStatus } from "../types/api.types";

export default function createError(statusCode: HttpStatus, message: string) {
    const error = new Error(message) as Error & { statusCode?: number };
    error.statusCode = statusCode;
    throw error;
}