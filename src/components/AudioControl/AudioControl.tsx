import classNames from "classnames";
import React, { LegacyRef, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import * as utils from '../../utils'
import styles from "./style.module.scss";

const collection = utils.randomiseArray([
    "Deja Vu.mp3",
    "Nightcall.mp3",
    "Rockit.mp3",
    "West Side Lane.mp3",
    "Mortal Kombat.mp3"
])

const AudioControl = () => {
    const [play, setPlay] = useState(false);
    const track = useRef<number>(0)
    const audio = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (play) {
            if(audio.current) {
                audio.current.src = require(`../../assets/audio/${collection[track.current]}`)
                audio.current.play()
            }
        }
        else {
            if(audio.current) {
                audio.current.pause()
                track.current++
                if(track.current === collection.length) {
                    track.current = 0;
                }
            }
        }
    }, [play]);

    return (
        <div
            className={classNames(styles.container, play && styles.playing)}
            onClick={() => setPlay(!play)}
        >
            <div className={styles.name}>{collection[track.current].split('.')[0]}</div>
            <audio ref={audio} />
        </div>
    );
};

export default AudioControl;
