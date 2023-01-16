import classNames from "classnames";
import React, { LegacyRef, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import * as utils from "../../utils";
import styles from "./style.module.scss";

const collection = utils.randomiseArray([
    "Deja Vu.mp3",
    "Nightcall.mp3",
    "Rockit.mp3",
    "West Side Lane.mp3",
    "Mortal Kombat.mp3",
]);

const AudioControl = () => {
    const [play, setPlay] = useState(false);
    const [track, setTrack] = useState(0)
    const audio = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if(audio.current) {
            audio.current.src = require(`../../assets/audio/${
                collection[track]
            }`);
        }
    }, [])

    useEffect(() => {
        if(audio.current) {
            
            if(play) {
                audio.current.play()
            }
            else {
                audio.current.pause();
            }
        }
    }, [play]);

    useEffect(() => {
        if (audio.current) {
            audio.current.currentTime = 0;
            if (play) {
                audio.current.src = require(`../../assets/audio/${
                    collection[track]
                }`);
                audio.current.play();
            }
        }
    }, [track])

    const next = () => {
        if (track + 1 === collection.length) {
            setTrack(0)
        }
        else {
            setTrack(prev => prev + 1)
        }
    };
    

    return (
        <div className={classNames(styles.container)}>
            <div className={styles.name}>
                {collection[track].split(".")[0]}
            </div>
            <div
                className={classNames(styles.volume, play && styles.playing)}
                onClick={() => setPlay(prev => !prev)}
            />
            <div className={styles.forward} onClick={next} />
            <audio ref={audio} onEnded={next} />
        </div>
    );
};

export default AudioControl;
