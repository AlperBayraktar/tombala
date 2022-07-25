import { useState } from "react";
import { Socket } from "socket.io-client";
import socketEventTypes from "../../lib/socketProcesses";

interface CreateLobbyFormProps {
    socket: Socket | null;
}

const CreateLobbyForm = ({ socket }: CreateLobbyFormProps) => {
    const [nickname, setNickname] = useState<string>("");
    const [lobbyName, setLobbyName] = useState<string>("");

    const createLobby = () => {
        socket?.emit(socketEventTypes.CREATE_LOBBY, {
            nickname,
            lobbyName,
        });
    };

    return (
        <div className="form">
            <h2 className="form-title" style={{ marginTop: "32px" }}>
                Lobi Oluştur
            </h2>
            <div className="form-group">
                <p className="form-group-title">Nickname</p>
                <input
                    value={nickname}
                    onChange={(e: any) => {
                        setNickname(e.target.value);
                    }}
                    className="input"
                    placeholder="Sınır 16 karakter"
                />
            </div>
            <div className="form-group">
                <p className="form-group-title">Lobi İsmi</p>
                <input
                    className="input"
                    value={lobbyName}
                    onChange={(e: any) => setLobbyName(e.target.value)}
                    placeholder="Sınır 16 karakter"
                />
            </div>

            <div className="form-group">
                <button
                    className="btn submit-btn rounded-btn"
                    onClick={createLobby}
                >
                    Oluştur
                </button>
            </div>
        </div>
    );
};

export default CreateLobbyForm;
