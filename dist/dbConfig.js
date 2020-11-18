"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const connectionString = "postgres://postgres:ankesh@localhost:5432/postgres";
const client = new pg_1.Client({
    connectionString: connectionString
});
client.connect()
    .then(() => { console.log("Connection to Postgres is success."); })
    .catch((err) => { console.log("Connection to Postgres is failed.", err); });
exports.default = client;
//# sourceMappingURL=dbConfig.js.map