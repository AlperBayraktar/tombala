// DB queries that will be used in this app

export default {
    CREATE_PLAYER: "INSERT INTO players(socket_id, nickname) VALUES ($1, $2)",
    CREATE_LOBBY:
        "INSERT INTO lobbies(creator_socket_id, host_socket_id, lobby_name, password, created_at) VALUES ($1, $2, $3,  crypt($4, gen_salt('bf')),CURRENT_TIMESTAMP)",
};
