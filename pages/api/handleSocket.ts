// Socket
import { Server } from "socket.io";
import socketProcesses from "../../lib/socketProcesses";

// DB
import DB from "../../lib/db";
import dbQueries from "../../lib/dbQueries";

// Next
import type { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../lib/NextApiResponseServerIO";

// ======================================================
// Initializes requester's socket if it's not initialized
// ======================================================

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (res.socket.server.io) {
        res.json({ msg: "SOCKET.IO IS ALREADY RUNNING" });
    } else {
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            socket.on(
                socketProcesses.CREATE_LOBBY,
                async ({ nickname, lobbyName }) => {
                    // ==========================================
                    // Notice server
                    // ==========================================
                    console.log(
                        `Request to create a game lobby with name: ${lobbyName}`
                    );

                    // TODO: MAKE nickname AND lobbyName'S LENGTH CONTROL HERE

                    // ==========================================
                    // Set room name
                    // ==========================================
                    const roomName = `${socketProcesses.LOBBY_PREFIX}${lobbyName}`;

                    console.log("rm");
                    console.log(roomName);

                    // ==========================================
                    // If there is a game lobby that socket is joined, return an error message
                    // ==========================================
                    const joinedLobbyAmount = Array.from(socket.rooms).filter(
                        (el) => el.startsWith(socketProcesses.LOBBY_PREFIX)
                    ).length;

                    console.log("jla");
                    console.log(joinedLobbyAmount);

                    if (joinedLobbyAmount > 0) {
                        io.to(socket.id).emit(
                            socketProcesses.ERR,
                            socketProcesses.ERRORS.ALREADY_IN_A_LOBBY
                        );
                        return;
                    }

                    // ==========================================
                    // Generate random number between 1 and 10000 which will be password
                    // ==========================================
                    const password: number =
                        Math.floor(Math.random() * 9999) + 1;

                    console.log("ps");
                    console.log(password);

                    // ==========================================
                    // Run db queries to create lobby
                    // ==========================================
                    let shouldCreate: boolean = true;

                    // Create player
                    const createPlayerQueryData: string[] = [
                        socket.id,
                        nickname,
                    ];

                    await DB.query(
                        dbQueries.CREATE_PLAYER,
                        createPlayerQueryData,
                        (error: any, result: any) => {
                            if (error) shouldCreate = false;
                        }
                    );

                    // Create lobby
                    const createLobbyQueryData: string[] = [
                        socket.id,
                        socket.id,
                        lobbyName,
                        password,
                    ];

                    await DB.query(
                        dbQueries.CREATE_LOBBY,
                        createLobbyQueryData,
                        (error: any, result: any) => {
                            if (error) {
                                if (error.code === "23505") {
                                    io.to(socket.id).emit(
                                        socketProcesses.ERR,
                                        socketProcesses.ERRORS.LOBBY_EXISTS
                                    );
                                    shouldCreate = false;
                                    return;
                                } else {
                                    io.to(socket.id).emit(
                                        socketProcesses.ERR,
                                        socketProcesses.ERRORS
                                            .UNKNOWN_LOBBY_CREATION_ERROR
                                    );
                                    shouldCreate = false;
                                    return;
                                }
                            }
                        }
                    );

                    // Join socket and send message
                    if (shouldCreate) {
                        socket.join(roomName);
                        io.to(socket.id).emit(
                            socketProcesses.SUCCESS,
                            socketProcesses.SUCCESS_MSGS.CREATED_LOBBY
                        );
                    }
                }
            );
        });

        res.json({ msg: "INITIALIZED SOCKET.IO" });
    }
    res.end();
};

export default SocketHandler;
