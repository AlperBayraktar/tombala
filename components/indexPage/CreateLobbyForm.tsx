import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import socketProcesses from "../../lib/socketProcesses";
import GameDataContext from "../../context/GameDataContext";
import { getDefaultGameData } from "../../lib/gameUtils";

interface CreateLobbyFormProps {
    socket: Socket | null;
}

const CreateLobbyForm = ({ socket }: CreateLobbyFormProps) => {
    const [nickname, setNickname] = useState<string>("");
    const [lobbyName, setLobbyName] = useState<string>("");
    const { setGameData } = useContext(GameDataContext);
    const router = useRouter();

    useEffect(() => {
        socket?.on(socketProcesses.MSG, console.log);

        socket?.on(socketProcesses.SUCCESS, (msg: string) => {
            switch (msg) {
                case socketProcesses.SUCCESS_MSGS.CREATED_LOBBY:
                    alert("Lobi oluşturuldu.");
            }
        });

        socket?.on(
            socketProcesses.EVT.GET_LOBBY_DATA_AFTER_CREATION,
            (data) => {
                setGameData({
                    ...data,
                    ...getDefaultGameData(),
                    isHost: true,
                });
                router.push("/game");
            }
        );
    }, [socket]);

    const createLobby = () => {
        socket?.emit(socketProcesses.EVT.CREATE_LOBBY, {
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
