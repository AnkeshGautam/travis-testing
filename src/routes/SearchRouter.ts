import { Request, Response, Router } from "express";
import { ISearchController, searchController } from "../controller/SearchController";

class SearchRouter {
    private router: Router;
    private searchController: ISearchController;

    constructor() {
        this.router = Router();
        this.initRoutes();
        this.searchController = searchController;
    }

    public getRoutes(): Router {
        return this.router;
    }

    private initRoutes(): void {
        this.router.get("/", (req: Request, res: Response) => {
            res.sendFile(process.cwd() + "/src/index.html");
        });

        this.router.get("/getDistincts/:columnName", (req: Request, res: Response) => {
            const columnName = req.params.columnName;
            this.searchController.getDistinctValue(columnName, res);
        });

        this.router.get("/search", (req: Request, res: Response) => {
            this.searchController.getAuditByQuery(req, res);
        });
    }
}

export const searchRouter = new SearchRouter();
