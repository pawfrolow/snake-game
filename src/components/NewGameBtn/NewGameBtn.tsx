import React, { FC, Fragment } from "react";
import styles from "./style.module.scss";

type Props = {
    onClick: () => void;
    gaming: boolean;
};

const NewGameBtn: FC<Props> = ({ onClick, gaming }) => {
    return (
        <button className={styles["new-game"]} onClick={onClick}>
            {gaming ? (
                <Fragment>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    RETRY
                </Fragment>
            ) : (
                <Fragment>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    PLAY
                </Fragment>
            )}
        </button>
    );
};

export default NewGameBtn;
