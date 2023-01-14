import { YesNo, Difficults } from "../types/enums";
import { SettingsType } from "../types/types";
import { detectMobile } from "../utils";

type ConfigType = {
    initSnake: number[],
    speed: Record<`${Difficults}`, number>,
    initSettings: SettingsType
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
        is3D: detectMobile() ? YesNo.no : YesNo.yes,
        borders: YesNo.no,
    },
};

export default config;
