export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400
}

export type SuccessApiResponse<T = any> = { success: true; message?: string; data?: T };
export type ErrorApiResponse = { success: false; message: string; statusCode: HttpStatus; detail?: any };
export type ApiResponse = SuccessApiResponse | ErrorApiResponse;