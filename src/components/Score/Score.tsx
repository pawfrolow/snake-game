import React, { FC } from "react";
import styles from "./style.module.scss";

type Props = {
    score: number;
};

const Score: FC<Props> = ({ score }) => {
    return (
        <div className={styles.container}>
            <div className={styles.score}>SCORE: {score}</div>
            <div className={styles.score}>
                LEVEL: {Math.floor(score / 5) + 1}
            </div>
        </div>
    );
};

export default Score;
