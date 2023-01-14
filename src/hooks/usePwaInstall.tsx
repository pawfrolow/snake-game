import { useEffect, useRef, useState } from "react";
import { getPlatform, platforms } from "../utils";

const platform = getPlatform();

const usePwaInstall = () => {
    const deferredprompt = useRef<BeforeInstallPromptEvent | null>(null);
    const [contextValue, setContextValue] = useState({
        supported: supported,
        isInstalled: isInstalled,
        pwaInstall: handleInstall,
    });

    useEffect(() => {
        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPromptEvent
        );
        return () => window.removeEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPromptEvent
        );
    }, []);

    function isInstalled() {
        if (
            ("standalone" in window.navigator &&
                //@ts-ignore
                window.navigator.standalone === true) ||
            window.matchMedia("(display-mode: standalone)").matches
        ) {
            return true;
        }
        return false;
    }

    function supported() {
        if (deferredprompt.current !== null && platform === platforms.NATIVE) {
            return true;
        }
        if (platform !== platforms.NATIVE && platform !== platforms.OTHER) {
            return true;
        }
        return false;
    }

    function handleBeforeInstallPromptEvent(event: Event) {
        event.preventDefault();
        deferredprompt.current = event as BeforeInstallPromptEvent;
        setContextValue({
            supported: supported,
            isInstalled: isInstalled,
            pwaInstall: handleInstall,
        });
    }

    function handleInstall() {
        return new Promise<void>((resolve, reject) => {
            if (deferredprompt.current !== null) {
                return deferredprompt.current
                    .prompt()
                    .then(() => deferredprompt.current?.userChoice)
                    .then((choiceResult) => {
                        if (!choiceResult) return;
                        if (choiceResult.outcome === "accepted") {
                            resolve()
                        } else {
                            reject()
                        }
                    })
                    .catch(() => {
                        resolve()
                    });
            } else {
                resolve()
            }
        });
    }

    return contextValue;
};

export default usePwaInstall;
