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

    // Handle messages
    useEffect(() => {
        const ERRS = socketProcesses.ERRORS;

        socket?.on(socketProcesses.ERR, (err: string) => {
            console.log(err);

            if (err === ERRS.ALREADY_IN_A_LOBBY) {
                alert("Zaten bir lobidesiniz.");
            } else if (err == ERRS.UNKNOWN_ERROR) {
                alert("Bilinmeyen bir hata oluştu.");
            } else if ((err = ERRS.CONTROL_FIELD_LENGTHS)) {
                alert("Lütfen boş alan bırakmayın.");
            }
        });

        //     switch (err) {
        //         case ERRS.ALREADY_IN_A_LOBBY:
        //             alert("Zaten bir lobidesiniz.");

        //         case ERRS.UNKNOWN_ERROR:
        //             alert("Bilinmeyen bir hata oluştu.");

        //         case ERRS.CONTROL_FIELD_LENGTHS:
        //             alert("Lütfen boş alan bırakmayın.");
        //     }
        // });
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
                    <JoinLobbyForm socket={socket} />
                </TabPanel>

                <TabPanel>
                    <CreateLobbyForm socket={socket} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Home;
