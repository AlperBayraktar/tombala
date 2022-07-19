import React from "react";
import "./css/Card.css";

export default function Card({ cardData }) {
    // Apply random color
    const colorChoices = ["red", "green", "orange", "purple", "yellow", "blue"];
    var index = Math.floor(Math.random() * colorChoices.length);
    const color = colorChoices[index];

    return (
        <div className="card">
            {cardData.numbers.map((row) =>
                row.map((number, index) => (
                    <div className={`card-square bg-${color}`} key={index}>
                        <p className="card-square-number">{number}</p>
                    </div>
                ))
            )}
        </div>
    );
}
