import { ReactNode, useState } from "react";
import GameDataContext from "./GameDataContext";
import { getDefaultGameData } from "../lib/gameUtils";

interface GameDataContextProviderProps {
    children: ReactNode;
}

const GameDataContextProvider = (props: GameDataContextProviderProps) => {
    const [gameData, setGameData] = useState<any>(null);
    return (
        <GameDataContext.Provider value={{ gameData, setGameData }}>
            {props.children}
        </GameDataContext.Provider>
    );
};

export default GameDataContextProvider;
