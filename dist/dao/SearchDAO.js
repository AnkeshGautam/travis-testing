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
exports.searchDao = void 0;
const dbConfig_1 = require("../dbConfig");
class SearchDao {
    getDistinctValue(columnName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT DISTINCT " + columnName + " FROM public.audit_data";
            return yield dbConfig_1.default.query(query);
        });
    }
    getAuditByQuery(id, entity_id, entity_type, associated_id, associated_type, domain, sourceapplication, event, changes, userid, useridtype, usertype, startDateTime, endDateTime, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "SELECT A.id, A.entity_id, A.entity_type, A.associated_id, A.associated_type, A.domain, A.sourceapplication, A.event, A.changes, C.userid, C.useridtype, C.usertype, A.changetimestamp FROM public.audit_data as A INNER JOIN public.change_by as C ON (A.change_by = C.id) WHERE ";
            let domainOnly = true;
            let entity_typeOnly = true;
            if (id) {
                const temp = "A.id = '" + id + "' ";
                query = query + temp + "AND ";
                domainOnly = false;
                entity_typeOnly = false;
            }
            if (entity_id) {
                const temp = "A.entity_id = '" + entity_id + "' ";
                query = query + temp + "AND ";
                domainOnly = false;
                entity_typeOnly = false;
            }
            if (entity_type) {
                const temp = "A.entity_type = '" + entity_type + "' ";
                query = query + temp + "AND ";
                domainOnly = false;
            }
            if (associated_id) {
                const temp = "A.associated_id = '" + associated_id + "' ";
                query = query + temp + "AND ";
                domainOnly = false;
                entity_typeOnly = false;
            }
            if (associated_type) {
                const temp = "A.associated_type = '" + associated_type + "' ";
                query = query + temp + "AND ";
                domainOnly = false;
                entity_typeOnly = false;
            }
            if (domain) {
                const temp = "A.domain = '" + domain + "' ";
                query = query + temp + "AND ";
                entity_typeOnly = false;
            }
            if (sourceapplication) {
                const temp = "A.sourceapplication = '" + sourceapplication + "' ";
                query = query + temp + "AND ";
                domainOnly = false;
                entity_typeOnly = false;
            }
            if (event) {
                const temp = "A.event = '" + event + "' ";
                query = query + temp + "AND ";
                domainOnly = false;
                entity_typeOnly = false;
            }
            if (changes) {
                const temp = "A.changes ->> 'description' LIKE '%" + changes + "%' ";
                query = query + temp + "AND ";
                domainOnly = false;
                entity_typeOnly = false;
            }
            if (userid) {
                const temp = "C.userid = '" + userid + "' ";
                query = query + temp + "AND ";
                domainOnly = false;
                entity_typeOnly = false;
            }
            if (useridtype) {
                const temp = "C.useridtype = '" + useridtype + "' ";
                query = query + temp + "AND ";
                domainOnly = false;
                entity_typeOnly = false;
            }
            if (usertype) {
                const temp = "C.usertype = '" + usertype + "' ";
                query = query + temp + "AND ";
                domainOnly = false;
                entity_typeOnly = false;
            }
            if (startDateTime) {
                startDateTime = new Date(startDateTime).toUTCString();
                const temp = "A.changetimestamp >= '" + startDateTime + "' ";
                query = query + temp + "AND ";
            }
            if (endDateTime) {
                endDateTime = new Date(endDateTime).toUTCString();
                const temp = "A.changetimestamp <= '" + endDateTime + "' ";
                query = query + temp + "AND ";
            }
            if ((domainOnly && !entity_typeOnly) || (!domainOnly && entity_typeOnly)) {
                if (!endDateTime) {
                    endDateTime = new Date().toUTCString();
                    query = query + "A.changetimestamp <= '" + endDateTime + "' " + "AND ";
                }
                if (!startDateTime) {
                    startDateTime = new Date(new Date(endDateTime).getTime() - 1440 * 60000).toUTCString(); // 24 hours ago
                    query = query + "A.changetimestamp >= '" + startDateTime + "' " + "AND ";
                }
            }
            if (query.endsWith("WHERE ")) {
                query = query.slice(0, -6); // Remove 'WHERE ' from query
            }
            else {
                query = query.slice(0, -4); // Remove 'AND ' from query
            }
            query = query + "ORDER BY A.changetimestamp LIMIT " + pageSize + " OFFSET " + (pageNumber - 1) * pageSize;
            // console.log(query);
            return yield dbConfig_1.default.query(query);
        });
    }
}
exports.searchDao = new SearchDao();
//# sourceMappingURL=SearchDAO.js.map