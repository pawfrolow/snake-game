import classNames from "classnames";
import React from "react";
import { FC } from "react";
import { Directions } from "../../types/enums";
import styles from "./style.module.scss";

type Props = {
    onClick: (dir: Directions) => void
}

const ScreenButtons: FC<Props> = ({ onClick }) => {
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                {Object.values(Directions).map(dir => <div 
                        key={`arrow-${dir}`}
                        onClick={() => onClick(dir)}
                        className={classNames(styles.arrow, styles[dir])}
                    >
                    <div />
                </div>)}
            </div>
        </div>
    );
};

export default ScreenButtons;
