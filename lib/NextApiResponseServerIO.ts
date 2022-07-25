// A custom response for api routes that will use sockets

import { Socket } from "net";
import { Server as httpServer } from "http";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
    socket: Socket & {
        server: httpServer & {
            io: SocketIOServer;
        };
    };
};
