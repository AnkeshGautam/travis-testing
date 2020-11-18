"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const SearchRouter_1 = require("./routes/SearchRouter");
const path = require("path");
class App {
    constructor() {
        // this.initPostgresDbConnection();
        this.app = express();
        this.config();
        this.setApplicationRoutes();
    }
    config() {
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
    setApplicationRoutes() {
        const basePath = "/";
        const searchRoutes = SearchRouter_1.searchRouter.getRoutes();
        this.app.use(basePath, searchRoutes);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map