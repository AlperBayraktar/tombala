import React, { useState, createContext, Children } from "react";

const GameContext = createContext({
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

export default GameContext;

// const GameContextProvider = ({ children }) => {
//     const [context, setContext] = useState({
//         nickname: "Alper Bayraktar",
//         card: {
//             numbers: [
//                 [12, 14, 54, 53, 43],
//                 [64, 76, 56, 45, 46],
//                 [53, 52, 35, 34, 32],
//             ],
//             numbersFound: [],
//             cinkosDone: 0,
//         },
//         notices: [
//             "Tutku ilk çinkosunu yaptı!",
//             "Çekilen sayı: 21",
//             "Tutku ilk çinkosunu yaptı!",
//             "Çekilen sayı: 21",
//             "Tutku ilk çinkosunu yaptı!",
//             "Çekilen sayı: 21",
//             "Tutku ilk çinkosunu yaptı!",
//             "Çekilen sayı: 21",
//         ],
//     });

//     return (
//         <GameContext.Provider value={{ context, setContext }}>
//             {children}
//         </GameContext.Provider>
//     );
// };

// export default GameContextProvider;
