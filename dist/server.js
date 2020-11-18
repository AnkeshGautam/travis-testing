"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT || 3000;
app_1.default.set("port", port);
const server = app_1.default.listen(app_1.default.get("port"), () => {
    console.log("Express server listening on port " + port);
}).on("error", (err) => {
    console.log("Cannot start server, port most likely in use");
    console.log(err);
});
server.keepAliveTimeout = 65 * 1000;
//# sourceMappingURL=server.js.map