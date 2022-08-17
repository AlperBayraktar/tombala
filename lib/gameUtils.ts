var availableNumbers: number[] = [];
var pickableNumbers: number[] = [];
for (let i = 0; i < 99; i++) {
    availableNumbers[i] = i + 1;
    pickableNumbers[i] = i + 1;
}

export const getDefaultGameData = () => {
    return {
        history: [],
        card: {
            numbers: getRandomNumbers(),
            foundNumbers: [],
            cinkosMade: 0,
        },
    };
};

export const getRandomNumbers = (): number[] => {
    let cardNumbers = [];
    let leftNumbers = availableNumbers;

    for (let i = 0; i < 15; i++) {
        let index = Math.floor(Math.random() * leftNumbers.length);
        cardNumbers[i] = leftNumbers[index];
        leftNumbers.splice(index, 1);
    }

    return cardNumbers;
};

export const pickNumber = (): number => {
    const index: number = Math.floor(Math.random() * pickableNumbers.length);
    const number: number = pickableNumbers[index];
    pickableNumbers.splice(index, 1);
    return number;
};
