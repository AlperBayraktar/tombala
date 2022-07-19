import React, { useContext } from "react";
import "./css/GameScreen.css";
import Card from "./Card";

import UserSVG from "./img/user.svg";
import NumbersSVG from "./img/numbers.svg";
import CinkosSVG from "./img/bubble-chart-fill.svg";

import GameContextProvider from "./GameContext";
import GameContext from "./GameContext";

export default function GameScreen() {
    const context = useContext(GameContext);

    return (
        <div className="game-screen">
            <div className="game-page-content-wrapper">
                <h1 className="game-page-title">Tombala!</h1>
                <div className="game-page-content">
                    <Card cardData={context.card} />
                    <div className="infos">
                        <div className="info-container user-info-container">
                            <div className="info">
                                <img
                                    src={UserSVG}
                                    alt="USER LOGO"
                                    className="info-img"
                                />
                                <p className="info-text">{context.nickname}</p>
                            </div>
                            <div className="info">
                                <img
                                    src={NumbersSVG}
                                    alt="NUMBERS LOGO"
                                    className="info-img"
                                />
                                <p className="info-text">
                                    {15 - context.card.numbersFound.length} sayı
                                    kaldı
                                </p>
                            </div>
                            <div className="info">
                                <img
                                    src={CinkosSVG}
                                    alt="CINKO LOGO"
                                    className="info-img"
                                />
                                <p className="info-text">
                                    {context.card.cinkosDone} çinko yapıldı
                                </p>
                            </div>
                        </div>

                        <div className="info-container game-info-container">
                            <h2 style={{ textAlign: "center" }}>
                                Oyun Geçmişi
                            </h2>
                            {context.notices.map((notice, index) => (
                                <li key={index} className="notice">
                                    {notice}
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
