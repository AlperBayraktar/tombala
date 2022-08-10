// Socket
import { Server, Socket } from "socket.io";
import socketEventHandler from "../../lib/socketEventHandler";

// Next
import type { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../lib/NextApiResponseServerIO";
import { eventNames } from "process";

// ======================================================
// Initializes requester's socket if it's not initialized
// ======================================================

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (res.socket.server.io) {
        res.json({ msg: "SOCKET.IO IS ALREADY RUNNING" });
    } else {
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on("connection", (socket: Socket) => {
            socket.onAny((eventName: string, params: any) => {
                socketEventHandler[eventName](io, socket, params);
            });
        });

        res.json({ msg: "INITIALIZED SOCKET.IO" });
    }
    res.end();
};

export default SocketHandler;
