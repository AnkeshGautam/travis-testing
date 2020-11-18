"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIResponse = void 0;
class APIResponse {
    static success(response, data, totalCount, pageNumber, pageSize) {
        const responseData = {
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
    static failure(response, error) {
        const responseData = {
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
    static send(response, responseData, code) {
        response.status(code);
        response.json(responseData);
    }
}
exports.APIResponse = APIResponse;
//# sourceMappingURL=APIResponse.js.map