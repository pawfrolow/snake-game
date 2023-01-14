import React from "react";
import { usePwaInstall } from "../../hooks";
import GithubLink from "../GithubLink";
import styles from './style.module.scss'

const Header = () => {
    const { supported, isInstalled, pwaInstall } = usePwaInstall()
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>SNAKE</h1>
            <GithubLink />
            {supported() && !isInstalled() && <div className={styles.install} onClick={() => pwaInstall()} />}
        </header>
    );
};

export default Header;
