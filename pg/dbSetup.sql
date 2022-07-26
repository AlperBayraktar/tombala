-- This file makes database setup
-- First, make sure you have created your database ( 'tombala' )
-- Then you can run this file

-- Add crypto extension
-- This extension is used for passwords (ex. lobby password)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Drop tables
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS lobbies CASCADE;


CREATE TABLE players (
    -- Player's socket id
    socket_id VARCHAR(20) UNIQUE,

    -- Player's nickname
    nickname VARCHAR(16),

    PRIMARY KEY (socket_id)
);

CREATE TABLE lobbies (
    -- Id of lobby
    id SERIAL UNIQUE,

    -- Socket id of creator
    creator_socket_id VARCHAR(20) REFERENCES players(socket_id),

    -- Socket id of current host
    -- When lobby is first created, host id will be same with creator_socket_id
    -- If creator leaves lobby, another player will host the lobby.
    host_socket_id VARCHAR(20) REFERENCES players(socket_id),

    -- Name of lobby
    lobby_name VARCHAR(16),

    -- Lobby password ( encrypted by pgcrypto )
    password TEXT NOT NULL,

    -- The timestamp that lobby was created on.
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);