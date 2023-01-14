import { YesNo, Difficults } from "../types/enums";
import { SettingsType } from "../types/types";

type ConfigType = {
    initSnake: number[],
    speed: Record<`${Difficults}`, number>,
    initSettings: SettingsType,
    speedIncreasePercent: number
}

const config: ConfigType = {
    initSnake: [425, 426, 427],
    speed: {
        [Difficults.easy]: 200,
        [Difficults.normal]: 120,
        [Difficults.hard]: 70,
        [Difficults.insane]: 15,
    },
    initSettings: {
        difficult: Difficults.normal,
        is3D: YesNo.yes,
        borders: YesNo.no,
        buttons: window.screen.availWidth < 821 ? YesNo.yes : YesNo.no
    },
    speedIncreasePercent: 0.08
};

export default config;
