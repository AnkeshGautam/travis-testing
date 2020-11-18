import app from "./app";

const port = process.env.PORT || 3000;
app.set("port", port);

const server = app.listen(app.get("port"), () => {
    console.log("Express server listening on port " + port);
}).on("error", (err) => {
    console.log("Cannot start server, port most likely in use");
    console.log(err);
});
server.keepAliveTimeout = 65 * 1000;
