import SocketContext from "./SocketContext";
import io, { Socket } from "socket.io-client";

import { ReactNode, useState, useEffect } from "react";

interface SocketContextProviderProps {
    children: ReactNode;
}

const SocketContextProvider = (props: SocketContextProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    const initSocket = async () => {
        await fetch("/api/handleSocket");
        setSocket(io());
    };

    useEffect(() => {
        initSocket();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;
