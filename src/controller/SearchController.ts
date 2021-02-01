import { ISearchDao, searchDao } from "../dao/SearchDAO";
import { Request, Response } from "express";
import { APIResponse } from "../util/APIResponse";

export interface ISearchController {
    getDistinctValue(columnName: string, response: Response): Promise<void>;
    getAuditByQuery(request: Request, response: Response): Promise<void>;
}

class SearchController implements ISearchController {
    searchDao: ISearchDao;
    constructor() {
        this.searchDao = searchDao;
    }

    async getDistinctValue(columnName: string, response: Response): Promise<void> {
        try {
            const result = await this.searchDao.getDistinctValue(columnName);
            const totalCount = result.rows.length;
            APIResponse.success(response, result.rows, totalCount, 0, 0);
            return;
        } catch (error) {
            APIResponse.failure(response, { message: "OOPS, we are unable to fetch the data." });
        }
    }

    async getAuditByQuery(request: Request, response: Response): Promise<void> {
        try {
            const id = request.query.id as string || null;
            const entity_id = request.query.entity_id as string || null;
            const entity_type = request.query.entity_type as string || null;
            const associated_id = request.query.associated_id as string || null;
            const associated_type = request.query.associated_type as string || null;
            const domain = request.query.domain as string || null;
            const sourceapplication = request.query.sourceapplication as string || null;
            const event = request.query.event as string || null;
            const changes = request.query.changes as string || null;
            // const change_by = request.query.change_by as string || null;
            const userid = request.query.userid as string || null;
            const useridtype = request.query.useridtype as string || null;
            const usertype = request.query.usertype as string || null;
            const endDateTime = request.query.endDateTime as string || null;
            const startDateTime = request.query.startDateTime as string || null;
            const pageNumber = request.query.pageNumber as unknown as number || 1;
            const pageSize = request.query.pageSize as unknown as number || 20;

            // console.log("controller----", startDateTime, endDateTime);

            const result = await this.searchDao.getAuditByQuery(id, entity_id, entity_type, associated_id, associated_type, domain, sourceapplication, event, changes, userid, useridtype, usertype, startDateTime, endDateTime, pageNumber, pageSize);
            const totalCount = result.rows.length;
            // console.log(result.rows);
            console.log("Here");
            APIResponse.success(response, result.rows, totalCount, pageNumber, pageSize);
            return;
        } catch (error) {
            // console.log(error.message);
            APIResponse.failure(response, { message: "OOPS, we are unable to fetch the data." });
        }
    }

}

export const searchController = new SearchController();

