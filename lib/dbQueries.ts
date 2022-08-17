// DB queries that will be used in this app

export default {
    CREATE_PLAYER:
        "INSERT INTO players(socket_id, nickname, lobby_uuid) VALUES ($1, $2, $3)",

    CREATE_PLAYER_WITHOUT_LOBBY_UUID:
        "INSERT INTO players(socket_id, nickname, lobby_uuid) VALUES ($1, $2, null)",

    // ================================

    UPDATE_PLAYER_LOBBY_UUID:
        "UPDATE players SET lobby_uuid=$1 WHERE socket_id=$2",

    // ================================

    CREATE_LOBBY:
        "INSERT INTO lobbies (creator_socket_id, host_socket_id, lobby_name, uuid, created_on) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)",

    // ================================

    // Also used for controlling lobby existance
    GET_LOBBY_DATA: "SELECT * FROM lobbies WHERE uuid=$1",

    // ================================

    GET_LOBBY_PLAYER_NAMES: "SELECT nickname FROM players WHERE lobby_uuid=$1",

    // ================================
};
