import { useState, useContext } from "react";
import GameDataContext from "../../context/GameDataContext";
import { Socket } from "socket.io-client";
import socketProcesses from "../../lib/socketProcesses";
import { getDefaultGameData } from "../../lib/gameUtils";
import { useRouter } from "next/router";

interface JoinLobbyFormProps {
    socket: Socket | null;
}

const JoinLobbyForm = ({ socket }: JoinLobbyFormProps) => {
    const [nickname, setNickname] = useState<string>("");
    const [lobbyName, setLobbyName] = useState<string>("");
    const [uuid, setUuid] = useState<string>("");
    const { setGameData } = useContext(GameDataContext);
    const router = useRouter();

    const joinLobby = () => {
        socket?.emit(socketProcesses.EVT.JOIN_LOBBY, {
            nickname,
            lobbyName,
            uuid,
        });

        socket?.on(socketProcesses.ERR, (err: string) => {
            switch (err) {
                case socketProcesses.ERRORS.LOBBY_DOESNT_EXIST:
                    alert("Lobi bulunamadı.");
            }
        });

        socket?.on(socketProcesses.SUCCESS, (msg: string) => {
            switch (msg) {
                case socketProcesses.SUCCESS_MSGS.JOINED_LOBBY:
                    // TODO: JOIN LOBBY HERE
                    alert("Lobiye katılınıyor...");
            }
        });

        socket?.on(socketProcesses.EVT.GET_LOBBY_DATA_AFTER_JOINING, (data) => {
            setGameData({ ...data, ...getDefaultGameData(), isHost: false });
        });

        router.push("/game");
    };

    return (
        <div className="form">
            <h2 className="form-title" style={{ marginTop: "32px" }}>
                Lobiye Katıl
            </h2>

            <div className="form-group">
                <p className="form-group-title">Nickname</p>
                <input
                    type="text"
                    className="input"
                    placeholder="Sınır 16 karakter"
                    maxLength={16}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </div>
            <div className="form-group">
                <p className="form-group-title">Lobi İsmi</p>
                <input
                    type="text"
                    className="input"
                    placeholder="Sınır 16 karakter"
                    maxLength={16}
                    value={lobbyName}
                    onChange={(e) => setLobbyName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <p className="form-group-title">UUID</p>
                <input
                    className="input"
                    value={uuid}
                    onChange={(e) => setUuid(e.target.value)}
                />
            </div>
            <div className="form-group">
                <button
                    className="btn submit-btn rounded-btn"
                    onClick={joinLobby}
                >
                    Katıl
                </button>
            </div>
        </div>
    );
};

export default JoinLobbyForm;
