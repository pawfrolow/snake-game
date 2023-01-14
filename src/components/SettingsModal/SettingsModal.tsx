import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FC } from "react";
import config from "../../config";
import { YesNo, Difficults } from "../../types/enums";
import { YesNoType, DifficultType, SettingsModalRefType, SettingsType } from "../../types/types";
import ControlSelect from "../ControlSelect/ControlSelect";
import ReactPortal from "../ReactPortal";
import styles from './style.module.scss'

type Props = {
    onConfirm: (settings: SettingsType) => void
}

const SettingsModal = forwardRef<SettingsModalRefType, Props>(({ onConfirm }, ref) => {
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState<SettingsType>(config.initSettings)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) =>
            e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, []);

    useImperativeHandle(ref, () => ({
        open: (settings: SettingsType) => {
            handleOpen();
            setSettings(settings)
        },
        close: () => {
            handleClose();
        },
    }));

    const confirm = () => {
        onConfirm(settings)
        handleClose()
    }

    if (!open || !settings) return null;

    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <div className={styles.backdrop} onClick={handleClose}></div>
            <div className={styles.modal}>
                <div className={styles.content}>
                    <div className={styles.close} onClick={handleClose} />
                    <ControlSelect
                        value={settings.difficult}
                        values={Object.values(Difficults)}
                        onChange={(value) =>
                            setSettings({
                                ...settings,
                                difficult: value as DifficultType
                            })
                        }
                        title="speed"
                    />
                    <ControlSelect
                        value={settings.borders}
                        values={Object.values(YesNo)}
                        onChange={(value) => setSettings({
                            ...settings,
                            borders: value as YesNoType
                        })}
                        title="border"
                    />
                    <ControlSelect
                        value={settings.is3D}
                        values={Object.values(YesNo)}
                        onChange={(value) => setSettings({
                            ...settings,
                            is3D: value as YesNoType
                        })}
                        title="3d"
                    />
                    <div className={styles.confirm} onClick={confirm}>CONFIRM</div>
                </div>
                
            </div>
        </ReactPortal>
    );
});

export default SettingsModal;
