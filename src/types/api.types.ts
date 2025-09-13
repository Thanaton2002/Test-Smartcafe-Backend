export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
}

export type SuccessApiResponse<T = any> = { success: true; message?: string; data?: T };
export type ErrorApiResponse = { success: false; message: string; statusCode: HttpStatus; details?: any };
export type ApiResponse = SuccessApiResponse | ErrorApiResponse;