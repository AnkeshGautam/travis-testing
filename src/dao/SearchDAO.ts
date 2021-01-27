import client from "../dbConfig";
import { QueryResult } from "pg";

export interface ISearchDao {
    getDistinctValue(columnName: string): Promise<QueryResult>;
    getAuditByQuery(id: string, entity_id: string, entity_type: string, associated_id: string, associated_type: string, domain: string, sourceapplication: string, event: string, changes: string, userid: string, useridtype: string, usertype: string, startDateTime: string, endDateTime: string, pageNumber: number, pageSize: number): Promise<QueryResult>;
}

class SearchDao implements ISearchDao {

    async getDistinctValue(columnName: string): Promise<QueryResult> {
        const query = "SELECT DISTINCT " + columnName + " FROM public.audit_data";
        return await client.query(query);
    }

    async getAuditByQuery(id: string, entity_id: string, entity_type: string, associated_id: string, associated_type: string, domain: string, sourceapplication: string, event: string, changes: string, userid: string, useridtype: string, usertype: string, startDateTime: string, endDateTime: string, pageNumber: number, pageSize: number): Promise<QueryResult> {

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
            query = query.slice(0, -6);  // Remove 'WHERE ' from query
        } else {
            query = query.slice(0, -4);  // Remove 'AND ' from query
        }
        query = query + "ORDER BY A.changetimestamp LIMIT " + pageSize + " OFFSET " + (pageNumber - 1) * pageSize;

        console.log(query);
        return await client.query(query);
    }

}

export const searchDao = new SearchDao();