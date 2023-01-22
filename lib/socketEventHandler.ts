// ============================================
// This file contains socket event's handlers.
// ============================================

// DB
import DB from "./db";
import dbQueries from "./dbQueries";

// Socket
import { Server, Socket } from "socket.io";
import socketProcesses from "./socketProcesses";

// Shortcut
const EVT = socketProcesses.EVT;

// UUID
import { v4 as uuidv4 } from "uuid";

const getJoinedLobbyAmount = (socket: Socket) => {
    return Array.from(socket.rooms).filter((el: any) =>
        el.startsWith(socketProcesses.LOBBY_PREFIX)
    ).length;
};

interface CreateLobbyProps {
    nickname: string;
    lobbyName: string;
}

interface PickNumberProps {
    pickedNumber: number;
    uuid: string;
}

interface GameFinishedProps {
    winnerNickname: string;
    uuid: string;
}

export default {
    [EVT.CREATE_LOBBY]: async (
        io: Server,
        socket: Socket,
        { nickname, lobbyName }: CreateLobbyProps
    ) => {
        // ==========================================
        // Notice server
        // ==========================================
        console.log(`Request to create a game lobby with name: ${lobbyName}`);

        // ==========================================
        // Make length control
        // ==========================================

        if (nickname.length == 0 || lobbyName.length == 0) {
            socket.emit(
                socketProcesses.ERR,
                socketProcesses.ERRORS.CONTROL_FIELD_LENGTHS
            );
            return;
        }

        // ==========================================
        // If there is a game lobby that socket is joined, return an error message
        // ==========================================
        const joinedLobbyAmount: number = getJoinedLobbyAmount(socket);

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
        // Generate a uuid
        // ==========================================
        const uuid: string = uuidv4();
        console.log("uuid");
        console.log(uuid);

        // ==========================================
        // Set room name
        // ==========================================
        const roomName: string = `${socketProcesses.LOBBY_PREFIX}${uuid}`;
        console.log("rm");
        console.log(roomName);

        // ==========================================
        // Run db queries to create lobby
        // ==========================================
        let shouldCreate: boolean = true;

        // Create player and lobby

        await DB.query(
            dbQueries.CREATE_PLAYER_WITHOUT_LOBBY_UUID,
            [socket.id, nickname],
            async (error: any, result: any) => {
                if (error) shouldCreate = false;
            }
        );

        if (!shouldCreate) return;

        await DB.query(
            dbQueries.CREATE_LOBBY,
            [socket.id, socket.id, lobbyName, uuid],
            (error: any, result: any) => {
                if (error) {
                    console.log("err1");
                    console.log(error);
                    io.to(socket.id).emit(
                        socketProcesses.ERR,
                        socketProcesses.ERRORS.UNKNOWN_ERROR
                    );
                    shouldCreate = false;
                }
            }
        );

        // TODO: DELETE PLAYER BECAUSE YOU COULDNT CREATE LOBBY

        if (!shouldCreate) return;

        await DB.query(
            dbQueries.UPDATE_PLAYER_LOBBY_UUID,
            [uuid, socket.id],
            (error: any, result: any) => {
                if (error) {
                    shouldCreate = false;
                }
            }
        );
        // TODO: DELETE PLAYER AND LOBBY BECAUSE YOU COULDNT UPDATE LOBBY UUID

        if (!shouldCreate) return;

        // ==========================================
        // Join socket and send message
        // ==========================================
        console.log("1");
        if (shouldCreate) {
            socket.join(roomName);
            io.to(socket.id).emit(
                socketProcesses.SUCCESS,
                socketProcesses.SUCCESS_MSGS.CREATED_LOBBY
            );
            console.log("1");
            // TODO: This id should be displayed in lobby host's page
            io.to(socket.id).emit(
                socketProcesses.EVT.GET_LOBBY_DATA_AFTER_CREATION,
                {
                    nickname: nickname,
                    uuid: uuid,
                    lobbyName: lobbyName,
                    hostSocketId: socket.id,
                    players: [],
                }
            );
        }
    },

    // ============================================
    // ============================================

    [EVT.JOIN_LOBBY]: async (
        io: Server,
        socket: Socket,
        { nickname, lobbyName, uuid }: any
    ) => {
        // =================================
        // Control joined lobby amount
        // =================================
        const joinedLobbyAmount: number = getJoinedLobbyAmount(socket);

        if (joinedLobbyAmount > 0) {
            console.log("2");
            io.to(socket.id).emit(
                socketProcesses.ERR,
                socketProcesses.ERRORS.ALREADY_IN_A_LOBBY
            );
            return;
        }

        let canJoin: boolean = true;

        // =================================
        // Control if lobby exists
        // =================================
        await DB.query(
            dbQueries.GET_LOBBY_DATA,
            [uuid],
            (error: any, result: any) => {
                if (error) {
                    console.log("3");
                    socket.emit(
                        socketProcesses.ERR,
                        socketProcesses.ERRORS.UNKNOWN_ERROR
                    );
                    canJoin = false;
                }

                if (result.rowCount !== 1) {
                    console.log("4");
                    socket.emit(
                        socketProcesses.ERR,
                        socketProcesses.ERRORS.LOBBY_DOESNT_EXIST
                    );
                    canJoin = false;
                }
            }
        );

        // =================================
        // Create player and join to lobby
        // =================================
        if (!canJoin) return;

        await DB.query(
            dbQueries.CREATE_PLAYER,
            [socket.id, nickname, uuid],
            (error: any, result: any) => {
                if (error) {
                    console.log("5");
                    socket.emit(
                        socketProcesses.ERR,
                        socketProcesses.ERRORS.UNKNOWN_ERROR
                    );
                    canJoin = false;
                }
            }
        );

        if (!canJoin) return;
        console.log("6");
        socket.join(`${socketProcesses.LOBBY_PREFIX}${uuid}`);
        console.log("7");
        socket.emit(
            socketProcesses.SUCCESS,
            socketProcesses.SUCCESS_MSGS.JOINED_LOBBY
        );

        // =================================
        // Get player names
        // =================================

        await DB.query(
            dbQueries.GET_LOBBY_PLAYER_NAMES,
            [uuid],
            (error: any, result: any) => {
                // TODO: This id should be displayed in lobby host's page
                console.log("8");
                io.to(socket.id).emit(
                    socketProcesses.EVT.GET_LOBBY_DATA_AFTER_JOINING,
                    {
                        nickname: nickname,
                        lobbyName: lobbyName,
                        uuid: uuid,
                        players: result.rows,
                    }
                );
                console.log("9");
                io.to(`${socketProcesses.LOBBY_PREFIX}${uuid}`).emit(
                    socketProcesses.EVT.NOTICE_NEW_PLAYER,
                    { nickname: nickname }
                );
            }
        );
    },

    [EVT.PICK_NUMBER]: async (
        io: Server,
        socket: Socket,
        { pickedNumber, uuid }: PickNumberProps
    ) => {
        io.to(`${socketProcesses.LOBBY_PREFIX}${uuid}`).emit(
            socketProcesses.EVT.GET_PICKED_NUMBER,
            { pickedNumber }
        );
    },

    [EVT.GAME_FINISHED]: (
        io: Server,
        socket: Socket,
        { winnerNickname, uuid }: GameFinishedProps
    ) => {
        console.log("evt to server");
        console.log(winnerNickname);
        io.to(`${socketProcesses.LOBBY_PREFIX}${uuid}`).emit(
            socketProcesses.EVT.GET_WINNER_DATA,
            winnerNickname
        );
    },
};
