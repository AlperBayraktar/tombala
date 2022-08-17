import GameDataContext from "../context/GameDataContext";
import type { NextPage } from "next";
import styles from "../styles/Game.module.css";
import { useContext, useEffect } from "react";
import Infos from "../components/gamePage/Infos";
import { Socket } from "socket.io-client";

// Get components
import Card from "../components/gamePage/Card";
import socketProcesses from "../lib/socketProcesses";
import SocketContext from "../context/SocketContext";
import { pickNumber } from "../lib/gameUtils";

const Game: NextPage = () => {
    const { gameData, setGameData } = useContext(GameDataContext);
    const socket: Socket | null = useContext(SocketContext);

    useEffect(() => {
        console.log(gameData);

        socket?.on(socketProcesses.EVT.GET_WINNER_DATA, (winnerNickname) => {
            console.log("winene");
            setGameData({
                ...gameData,
                history: [gameData.history, `Kazanan: ${winnerNickname}`],
            });
        });
        socket?.on(
            socketProcesses.EVT.GET_PICKED_NUMBER,
            ({ pickedNumber }: any) => {
                var historyCopy = gameData.history;
                historyCopy.push(`Sayı çekildi: ${pickedNumber}`);
                setGameData({ ...gameData, history: historyCopy });

                setTimeout(
                    () =>
                        (document.getElementsByClassName(
                            styles.gameHistoryContainer
                        )[0].scrollTop += 1000),
                    100
                );

                if (
                    gameData.card.numbers.includes(pickedNumber) &&
                    !gameData.card.foundNumbers.includes(pickedNumber)
                ) {
                    alert(`Buldunuz! ${pickedNumber}`);
                    let foundNumbersCopy = gameData.card.foundNumbers;
                    foundNumbersCopy.push(pickedNumber);

                    setGameData({
                        ...gameData,
                        card: {
                            ...gameData.card,
                            foundNumbers: foundNumbersCopy,
                        },
                    });

                    if (
                        gameData.card.numbers.length ===
                        gameData.card.foundNumbers.length
                    ) {
                        socket.emit(socketProcesses.EVT.GAME_FINISHED, {
                            winnerNickname: gameData.nickname,
                            uuid: gameData.uuid,
                        });
                        alert("Oyunu kazandınız!");
                    }
                }
            }
        );

        socket?.on(socketProcesses.EVT.NOTICE_NEW_PLAYER, (data) => {
            let playersCopy = gameData.players;
            playersCopy.push(data);
            let historyCopy = gameData.history;
            historyCopy.push(`Yeni oyuncu: ${data.nickname}`);
            setGameData({
                ...gameData,
                history: historyCopy,
                players: playersCopy,
            });
        });
    }, [socket]);

    const pickNumberAndNoticeServer = (): void => {
        socket?.emit(socketProcesses.EVT.PICK_NUMBER, {
            pickedNumber: pickNumber(),
            uuid: gameData.uuid,
        });
    };

    return (
        <div className={styles.gamePage}>
            <h1 className="tombala-logo title">Tombala!</h1>
            <div className={styles.gameContent}>
                <div className={styles.gameContainer}>
                    <Card data={gameData.card} />

                    <div className={styles.infoContainer}>
                        <Infos styles={styles} gameData={gameData} />

                        {gameData.isHost && (
                            <>
                                <br />{" "}
                                <button
                                    className="btn _3d"
                                    onClick={pickNumberAndNoticeServer}
                                >
                                    Sayı Çek
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div
                className={styles.lobbyInfoContainer + " container "}
                style={{ width: "45%", margin: "auto" }}
            >
                <h1 className="title">Lobi</h1>

                <ul className="playerData">
                    <h4>Lobi Bilgisi</h4>

                    <p>İsim: {gameData.lobbyName}</p>
                    <p>
                        UUID: {gameData.uuid}
                        <button
                            className="btn"
                            style={{
                                marginLeft: "5px",
                                padding: "4px 6px",
                                display: "inline-block",
                            }}
                            onClick={() => {
                                navigator.clipboard
                                    .writeText(gameData.uuid)
                                    .then(
                                        () => {
                                            alert("Kopyalandı");
                                        },
                                        () => {
                                            alert("Kopyalanamadı");
                                        }
                                    );
                            }}
                        >
                            <img src="/clipboard-line.svg" alt="Kopyala" />
                        </button>
                    </p>

                    <h4>Oyuncular</h4>
                    <p style={{ margin: 0 }}>{gameData.nickname} (Siz)</p>
                    <hr />
                    {gameData.players.map((player: any, index: number) => {
                        return (
                            <div key={index}>
                                <p style={{ margin: 0 }}>{player.nickname}</p>
                                <hr />
                            </div>
                        );
                    })}
                </ul>
            </div>
            <br />
            <br />
        </div>
    );
};

export default Game;
