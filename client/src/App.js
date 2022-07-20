import GameScreen from "./components/GameScreen/GameScreen";
import LobbyCreationMenu from "./components/LobbyCreationMenu";

import "./components/css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import GameContext from "./components/GameScreen/GameContext";

const App = () => {
    const [context, setContext] = useState({
        nickname: "Alper Bayraktar",
        card: {
            numbers: [
                [12, 14, 54, 53, 43],
                [64, 76, 56, 45, 46],
                [53, 52, 35, 34, 32],
            ],
            numbersFound: [],
            cinkosDone: 0,
        },
        notices: [
            "Tutku ilk çinkosunu yaptı!",
            "Çekilen sayı: 21",
            "Tutku ilk çinkosunu yaptı!",
            "Çekilen sayı: 21",
            "Tutku ilk çinkosunu yaptı!",
            "Çekilen sayı: 21",
            "Tutku ilk çinkosunu yaptı!",
            "Çekilen sayı: 21",
        ],
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LobbyCreationMenu />} />
                <Route
                    path="/game"
                    element={
                        <GameContext.Provider value={{ context, setContext }}>
                            <GameScreen />
                        </GameContext.Provider>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
