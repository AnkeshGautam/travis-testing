import { Client } from "pg";

const connectionString = "postgres://postgres:ankesh@localhost:5432/postgres";
const client = new Client({
    connectionString: connectionString
});
client.connect()
    .then(() => { console.log("Connection to Postgres is success."); })
    .catch((err) => { console.log("Connection to Postgres is failed.", err); });

export default client;