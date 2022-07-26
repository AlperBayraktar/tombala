// ====================================================
// Index page that allows you to join to/create a lobby.
// ====================================================

// React
import { useContext, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// Socket
import { Socket } from "socket.io-client";
import SocketContext from "../context/SocketContext";
import socketProcesses from "../lib/socketProcesses";

// Forms
import CreateLobbyForm from "../components/indexPage/CreateLobbyForm";
import JoinLobbyForm from "../components/indexPage/JoinLobbyForm";

// Styling
import styles from "../styles/Home.module.css";
import "react-tabs/style/react-tabs.css";

const Home = () => {
    const socket: Socket | null = useContext(SocketContext);

    useEffect(() => {
        socket?.on(socketProcesses.MSG, console.log);
        socket?.on(socketProcesses.ERR, console.log);
        socket?.on(socketProcesses.SUCCESS, console.log);
    }, [socket]);

    return (
        <div className={styles.home + " container"}>
            <h1 className="title tombala-logo">TOMBALA!</h1>
            <Tabs>
                <TabList>
                    <Tab>Lobiye Katıl</Tab>
                    <Tab>Lobi Oluştur</Tab>
                </TabList>

                <TabPanel>
                    <JoinLobbyForm />
                </TabPanel>

                <TabPanel>
                    <CreateLobbyForm socket={socket} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Home;
