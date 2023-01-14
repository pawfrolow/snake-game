import React, { FC } from "react";
import { SettingsType } from "../../types/types";
import styles from "./style.module.scss";

type Props = {
    settings: SettingsType;
};

const SettingsInfo: FC<Props> = ({ settings }) => {
    return (
        <div className={styles.info}>
            <div>DIFFUCULT: {settings.difficult}</div>
            <div>BORDERS: {settings.borders}</div>
            <div>3D: {settings.is3D}</div>
            <div>SCREEN BUTTONS: {settings.buttons}</div>
        </div>
    );
};

export default SettingsInfo;
