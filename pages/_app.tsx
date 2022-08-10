import "../styles/globals.css";
import type { AppProps } from "next/app";
import SocketContextProvider from "../context/SocketContextProvider";
import GameDataContextProvider from "../context/GameDataContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SocketContextProvider>
            <GameDataContextProvider>
                <Component {...pageProps} />
            </GameDataContextProvider>
        </SocketContextProvider>
    );
}

export default MyApp;
