import { useEffect, useState } from "react";
import styles from "../../styles/Game.module.css";

const Card = ({ data }: any) => {
    const [squareColor, setSquareColor] = useState<string>("");
    const { numbers, foundNumbers } = data;

    useEffect(() => {
        // Apply random color
        const colorChoices: string[] = [
            "red",
            "orange",
            "green",
            "purple",
            "yellow",
            "blue",
        ];
        var index: number = Math.floor(Math.random() * colorChoices.length);
        setSquareColor(colorChoices[index]);
    }, []);

    return (
        <div className={styles.card}>
            {numbers.map((number: number, index: number) => {
                const isFound = foundNumbers.includes(number);
                var className_ = "";
                if (isFound) {
                    className_ =
                        styles.cardSquare +
                        " " +
                        styles.cardSquareFoundNumber +
                        " _3d";
                } else {
                    className_ = styles.cardSquare + " _3d";
                }
                return (
                    <div
                        className={className_}
                        key={index}
                        style={{
                            backgroundColor: `var(--square-${squareColor})`,
                        }}
                    >
                        <p className={styles.cardSquareNumber}>{number}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Card;
