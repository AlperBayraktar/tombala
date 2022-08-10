-- This file makes database setup
-- First, make sure you have created your database ( 'tombala' )
-- Then you can run this file


-- Drop tables
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS lobbies CASCADE;

-- This table contains current active lobbies
CREATE TABLE lobbies (
    -- Socket id of creator
    creator_socket_id VARCHAR(20),

    -- Socket id of current host
    -- When lobby is first created, host id will be same with creator_socket_id
    -- If creator leaves lobby, another player will host the lobby.
    host_socket_id VARCHAR(20),

    -- Name of lobby
    lobby_name VARCHAR(16),

    -- unique id
    uuid TEXT UNIQUE NOT NULL,

    -- The timestamp that lobby was created on.
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (uuid)
);

-- This table contains current active users
CREATE TABLE players (
    -- Player's socket id
    socket_id VARCHAR(20) UNIQUE,

    -- Player's nickname
    nickname VARCHAR(16),

    -- Player's current lobby's id
    lobby_uuid TEXT REFERENCES lobbies(uuid),

    PRIMARY KEY (socket_id)
);


ALTER TABLE lobbies
  ADD FOREIGN KEY (creator_socket_id)
  REFERENCES players (socket_id)
  deferrable initially deferred;

ALTER TABLE lobbies
  ADD FOREIGN KEY (host_socket_id)
  REFERENCES players (socket_id)
  deferrable initially deferred;