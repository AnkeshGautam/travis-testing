import { Response } from "express";
import { IResponse } from "model/interface/Response";

export class APIResponse {
    public static success(response: Response, data: any, totalCount: number, pageNumber: number, pageSize: number): void {
        const responseData: IResponse = {
            data: data,
            metadata: {
                status: "success",
                error: null,
                totalCount: totalCount,
                pageNumber: pageNumber,
                pageSize: pageSize
            }
        };
        this.send(response, responseData, 200);
    }

    public static failure(response: Response, error: any): void {
        const responseData: IResponse = {
            data: null,
            metadata: {
                status: "error",
                error: error.message,
                totalCount: 0,
                pageNumber: 0,
                pageSize: 0
            }
        };
        this.send(response, responseData, 400);
    }

    private static send(response: Response, responseData: IResponse, code: number) {
        response.status(code);
        response.json(responseData);
    }
}