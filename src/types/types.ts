import { YesNo, Difficults, Directions } from "./enums";

export type DifficultType = `${Difficults}`
export type DirectionsType = `${Directions}`
export type YesNoType = `${YesNo}`

export type SettingsModalRefType = {
    open: (settings: SettingsType) => void,
    close: () => void
}

export type SettingsType = {
    is3D: YesNoType,
    borders: YesNoType,
    buttons: YesNoType,
    difficult: DifficultType
}