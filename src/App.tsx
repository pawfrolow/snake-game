import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Cell,
    Controls,
    Field,
    Header,
    NewGameBtn,
    Score,
    GameOver,
    SettingsModal,
    AudioControl,
    SettingsInfo,
    ScreenButtons,
} from "./components";
import config from "./config";
import { useEvent, useInterval, useSwipe } from "./hooks";
import "./styles/app.scss";
import { Directions } from "./types/enums";
import {
    DirectionsType,
    SettingsModalRefType,
    SettingsType,
} from "./types/types";
import * as utils from "./utils";

const App = () => {
    const [size, setSize] = useState<number>(900);
    const [snake, setSnake] = useState<number[]>(config.initSnake);
    const [food, setFood] = useState<number>(
        utils.randomIndexFromArray(snake, size)
    );
    const [direction, setDirection] = useState<DirectionsType>(
        Directions.right
    );
    const [gaming, setGaming] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [settings, setSettings] = useState(config.initSettings);
    const settingsModal =
        useRef() as React.MutableRefObject<SettingsModalRefType>;
    const directionChangeAccept = useRef(true);
    const score = snake.length - 3;
    const level = Math.floor(score / 5) + 1;

    const swipeHandler = (direction: DirectionsType) => {
        changeDirection(direction);
    };

    useEffect(() => {
        if (localStorage.getItem("snake-settings")) {
            setSettings(
                JSON.parse(
                    localStorage.getItem("snake-settings") as string
                ) as SettingsType
            );
        }
    }, []);

    useSwipe(swipeHandler);

    useEvent(
        "resize",
        utils.throttle(() => {
            const isClassMobile =
                document.body.classList.contains("mobile-device");
            if (utils.detectMobile() && !isClassMobile) {
                document.body.classList.add("mobile-device");
            }

            if (!utils.detectMobile() && isClassMobile) {
                document.body.classList.remove("mobile-device");
            }
        }, 50)
    );

    useEffect(() => {
        if (utils.detectMobile()) {
            document.body.classList.add("mobile-device");
        }
    }, []);

    useEffect(() => {
        if (gaming) {
            setGameOver(false);
        }
        if (!gaming) {
            setSnake(config.initSnake);
            setGameOver(false);
            setFood(utils.randomIndexFromArray(snake, size));
            setDirection("right");
        }
    }, [gaming]);

    const keyHandler = (e: KeyboardEvent) => {
        Object.values(Directions).forEach((dir) => {
            if (e.key.toLowerCase() === `arrow${dir}`) {
                changeDirection(dir);
            }
        });
    };

    const changeDirection = (dir: DirectionsType) => {
        if (gameOver) return;
        if (!directionChangeAccept.current) return;

        const checkHorizontal = (dir: DirectionsType) =>
            dir === "left" || dir === "right";
        const checkVertical = (dir: DirectionsType) =>
            dir === "up" || dir === "down";

        if (!gaming) {
            setGaming(true);
        }

        if (
            //если направление то же самое или противоположное то ничего не менять
            (checkHorizontal(dir) && checkHorizontal(direction)) ||
            (checkVertical(dir) && checkVertical(direction))
        ) {
            return;
        }
        setDirection(dir);

        directionChangeAccept.current = false;
    };

    const move = () => {
        const directionSize = Math.sqrt(size);
        const newSnake = JSON.parse(JSON.stringify(snake)) as number[];
        const snakeHead = snake[snake.length - 1];
        let newItem = 0;

        if (!directionChangeAccept.current) {
            directionChangeAccept.current = true;
        }

        switch (direction) {
            case "up": {
                newItem = snakeHead - directionSize;
                const isOutside = newItem < 0;
                if (isOutside) {
                    if (settings.borders === "yes") {
                        setGameOver(true);
                        return;
                    }
                    if (settings.borders === "no") {
                        newItem =
                            size -
                            (directionSize - (snakeHead % directionSize));
                    }
                }
                break;
            }
            case "right": {
                newItem = snakeHead + 1;
                const rowEndIndex =
                    snakeHead - (snakeHead % directionSize) + directionSize;
                const isOutside = newItem >= rowEndIndex;
                if (isOutside) {
                    if (settings.borders === "yes") {
                        setGameOver(true);
                        return;
                    }
                    if (settings.borders === "no") {
                        newItem = newItem - directionSize;
                    }
                }
                break;
            }
            case "down": {
                newItem = snakeHead + directionSize;
                const isOutside = newItem >= size;
                if (isOutside) {
                    if (settings.borders === "yes") {
                        setGameOver(true);
                        return;
                    }
                    if (settings.borders === "no") {
                        newItem = snakeHead % directionSize;
                    }
                }
                break;
            }
            case "left": {
                newItem = snakeHead - 1;
                const rowEndIndex = snakeHead - (snakeHead % directionSize);
                const isOutside = newItem < rowEndIndex;
                if (isOutside) {
                    if (settings.borders === "yes") {
                        setGameOver(true);
                        return;
                    }
                    if (settings.borders === "no") {
                        newItem = newItem + directionSize;
                    }
                }
                break;
            }
        }
        newSnake.push(newItem);

        if (snake.find((item) => item === newItem)) {
            setGameOver(true);
            return;
        }

        const isFood = newItem === food;
        if (!isFood) {
            newSnake.shift();
        }
        setSnake(newSnake);
        if (isFood) {
            setFood(utils.randomIndexFromArray(snake, size));
        }
    };

    const getSpeed = useMemo(() => {
        let speed = config.speed[settings.difficult];

        [...Array(Math.floor(score / 5))].forEach((step) => {
            speed = speed - speed * config.speedIncreasePercent;
        });

        return Math.ceil(speed);
    }, [level, settings.difficult]);

    useInterval(move, gameOver || !gaming ? null : getSpeed);

    useEvent("keydown", keyHandler);

    return (
        <div className="app">
            <Header />
            <Controls>
                <Score score={score} />
                <div className="controls-row">
                    <AudioControl />
                    <div
                        className="settings"
                        onClick={() => settingsModal.current.open(settings)}
                    />
                    <NewGameBtn
                        gaming={gaming}
                        onClick={() => setGaming(!gaming)}
                    />
                </div>
            </Controls>
            <div style={{ position: "relative" }}>
                <Field gameOver={gameOver} is3d={settings.is3D === "yes"}>
                    {[...Array(size).keys()].map((cell) => {
                        const isSnake = snake.includes(cell);
                        return (
                            <Cell
                                key={cell}
                                food={cell === food}
                                snake={isSnake}
                                is3D={settings.is3D === "yes"}
                            />
                        );
                    })}
                </Field>
                {gameOver && <GameOver />}
            </div>
            {settings.buttons === "yes" && (
                <ScreenButtons onClick={changeDirection} />
            )}
            <SettingsInfo settings={settings} />
            <SettingsModal
                onConfirm={(set) => {
                    setSettings(set);
                    localStorage.setItem("snake-settings", JSON.stringify(set));
                }}
                ref={settingsModal}
            />
        </div>
    );
};

export default App;
