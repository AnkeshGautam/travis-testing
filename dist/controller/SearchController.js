"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchController = void 0;
const SearchDAO_1 = require("../dao/SearchDAO");
const APIResponse_1 = require("../util/APIResponse");
class SearchController {
    constructor() {
        this.searchDao = SearchDAO_1.searchDao;
    }
    getDistinctValue(columnName, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.searchDao.getDistinctValue(columnName);
                const totalCount = result.rows.length;
                APIResponse_1.APIResponse.success(response, result.rows, totalCount, 0, 0);
                return;
            }
            catch (error) {
                APIResponse_1.APIResponse.failure(response, { message: "OOPS, we are unable to fetch the data." });
            }
        });
    }
    getAuditByQuery(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.query.id || null;
                const entity_id = request.query.entity_id || null;
                const entity_type = request.query.entity_type || null;
                const associated_id = request.query.associated_id || null;
                const associated_type = request.query.associated_type || null;
                const domain = request.query.domain || null;
                const sourceapplication = request.query.sourceapplication || null;
                const event = request.query.event || null;
                const changes = request.query.changes || null;
                // const change_by = request.query.change_by as string || null;
                const userid = request.query.userid || null;
                const useridtype = request.query.useridtype || null;
                const usertype = request.query.usertype || null;
                const endDateTime = request.query.endDateTime || null;
                const startDateTime = request.query.startDateTime || null;
                const pageNumber = request.query.pageNumber || 1;
                const pageSize = request.query.pageSize || 20;
                // console.log("controller----", startDateTime, endDateTime);
                const result = yield this.searchDao.getAuditByQuery(id, entity_id, entity_type, associated_id, associated_type, domain, sourceapplication, event, changes, userid, useridtype, usertype, startDateTime, endDateTime, pageNumber, pageSize);
                const totalCount = result.rows.length;
                // console.log(result.rows);
                console.log("am all the way up");
                APIResponse_1.APIResponse.success(response, result.rows, totalCount, pageNumber, pageSize);
                return;
            }
            catch (error) {
                // console.log(error.message);
                APIResponse_1.APIResponse.failure(response, { message: "OOPS, we are unable to fetch the data." });
            }
        });
    }
}
exports.searchController = new SearchController();
//# sourceMappingURL=SearchController.js.map