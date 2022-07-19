const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
// Set static files middleware
app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (sock) => {
    console.log(f`Someone connected: ${sock.id}`);
});

server.on("error", (err) => {
    console.error(`ERR: ${err}`);
});

const EXPRESS_PORT = 8080;
server.listen(EXPRESS_PORT, () => {
    console.log(`Express server is up and running on port ${EXPRESS_PORT}`);
});
