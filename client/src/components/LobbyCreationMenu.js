import { useState, useEffect } from "react";
import "./css/LobbyCreationMenu.css";

import io from "socket.io-client";

import StateInput from "./StateInput";

const socket = io.connect();

export default function LobbyCreationMenu() {
    const [nickname, setNickname] = useState("");
    const [lobbyName, setLobbyName] = useState("");

    const createRoom = () => {
        socket.emit("CREATE_GAME_LOBBY", lobbyName);
    };

    useEffect(() => {
        socket.on("GAME_SUCCESS_MESSAGE", console.log);
        socket.on("GAME_ERROR_MESSAGE", console.log);
    }, []);

    return (
        <div className="lobby-creation-menu">
            <div className="lobby-creation-page-content form">
                <h1 className="lobby-creation-page-title">Tombala!</h1>
                <div className="form-content">
                    <h1 className="form-title">Lobi Oluştur</h1>
                    <div className="lobby-creation-form-group form-group">
                        <p className="form-group-title">Nickname</p>
                        <StateInput
                            placeholder="Nickname"
                            className="form-group-input"
                            state={nickname}
                            setState={setNickname}
                        />
                    </div>

                    <div className="lobby-creation-form-group form-group">
                        <p className="form-group-title">Lobi ismi</p>
                        <StateInput
                            placeholder="Lobi ismi"
                            className="form-group-input"
                            state={lobbyName}
                            setState={setLobbyName}
                        />
                    </div>

                    <div className="lobby-creation-form-group form-group">
                        <button className="form-submit" onClick={createRoom}>
                            Lobi Oluştur
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
