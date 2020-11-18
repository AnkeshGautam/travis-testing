"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRouter = void 0;
const express_1 = require("express");
const SearchController_1 = require("../controller/SearchController");
class SearchRouter {
    constructor() {
        this.router = express_1.Router();
        this.initRoutes();
        this.searchController = SearchController_1.searchController;
    }
    getRoutes() {
        return this.router;
    }
    initRoutes() {
        this.router.get("/", (req, res) => {
            res.sendFile(process.cwd() + "/src/index.html");
        });
        this.router.get("/getDistincts/:columnName", (req, res) => {
            const columnName = req.params.columnName;
            this.searchController.getDistinctValue(columnName, res);
        });
        this.router.get("/search", (req, res) => {
            this.searchController.getAuditByQuery(req, res);
        });
    }
}
exports.searchRouter = new SearchRouter();
//# sourceMappingURL=SearchRouter.js.map