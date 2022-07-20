// ===========================================
// Import packages
// ===========================================
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

// ===========================================
// Server setup
// ===========================================
const app = express();
// Set static files middleware
STATIC_PATH = `${__dirname}/../client/static`;
app.use(express.static(STATIC_PATH));
const server = http.createServer(app);
const io = socketio(server);

server.on("error", (err) => {
    console.error(`ERR: ${err}`);
});

// ===========================================
// Socket setup
// ===========================================
const handler = require("./socketHandler.js")(io);
io.on("connection", handler.connection);

// ===========================================
// Set urls to display react app
// ===========================================
app.get("*", (req, res) => res.sendFile("index.html", { root: STATIC_PATH }));

// ===========================================
// Start server
// ===========================================
const EXPRESS_PORT = 8080;
server.listen(EXPRESS_PORT, () => {
    console.log(`Express server is up and running on port ${EXPRESS_PORT}`);
});
