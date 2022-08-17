import { Element } from "react-scroll";

const Infos = ({ styles, gameData }: any) => {
    return (
        <div className={styles.infos + " _3d-thicker"}>
            <div className={styles.userInfoContainer}>
                <div className={styles.userInfo}>{gameData.nickname}</div>
                <div className={styles.userInfo}>
                    <b>{15 - gameData.card.foundNumbers.length}</b> sayı kaldı
                </div>
                <div className={styles.userInfo}>
                    <b>{gameData.card.cinkosMade}</b> çinko yapıldı
                </div>
            </div>

            <hr />
            <div
                // name="gameInfoContainer"
                className={styles.gameInfoContainer}
            >
                <h2 className={styles.gameInfoTitle + " title"}>
                    Oyun Geçmişi
                </h2>
                <ul className={styles.gameHistoryContainer}>
                    {gameData.history.length !== 0 ? (
                        gameData.history.map(
                            (history: string, index: number) => (
                                <li
                                    className={styles.gameHistoryElement}
                                    key={index}
                                >
                                    {history}
                                </li>
                            )
                        )
                    ) : (
                        <li className={styles.gameHistoryElement}>Mesaj yok</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Infos;
