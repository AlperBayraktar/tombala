import GameScreen from "./components/GameScreen/GameScreen";
import LobbyCreationMenu from "./components/LobbyCreationMenu";

import "./components/css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GameContextProvider from "./components/GameScreen/GameContext";

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route index element={<LobbyCreationMenu />} />
            <Route path="/game" element={<GameScreen />} />
        </Routes>
    </BrowserRouter>
);

export default App;
