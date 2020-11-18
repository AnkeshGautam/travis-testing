import * as bodyParser from "body-parser";
import * as express from "express";
import * as cors from "cors";
import { searchRouter } from "./routes/SearchRouter";
import path = require("path");

class App {

    public app: express.Application;

    constructor() {
        // this.initPostgresDbConnection();
        this.app = express();
        this.config();
        this.setApplicationRoutes();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.get("/config/abc", function (req, res) {
            res.sendFile(path.join(__dirname + "/config/abc"));
            // res.sendFile(process.cwd() + "/config/abc");
        });
    }

    private setApplicationRoutes(): void {
        const basePath = "/";
        const searchRoutes = searchRouter.getRoutes();
        this.app.use(basePath, searchRoutes);
    }

    // private async initPostgresDbConnection() {
    // }
}
export default new App().app;