import { isMobile, isAndroid, isFirefox, isIOS, isOpera, browserVersion } from "mobile-device-detect";

export const getRandomArbitrary = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const randomIndexFromArray = (filled: number[], size: number) => {
    const array = [...Array(size).keys()]
    .map((item) => !!filled.find(elem => elem === item) ? undefined : item)
    .filter((item) => item !== undefined) as number[];
    const randomIndex = getRandomArbitrary(0, array.length);
    return array[randomIndex];
};

export const randomiseArray = <T>(array: T[]) => {
    let buffer = [],
      start;
  
    for (let i = array.length; i >= array.length && i > 0; i--) {
      start = Math.floor(Math.random() * array.length);
      buffer.push(array.splice(start, 1)[0]);
    }
  
    return buffer;
}

export function detectMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
    ];

    return (
        toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        }) || window.innerWidth < 516
    );
}

export function throttle(callback: any, limit: number) {
    var waiting = false; // Initially, we're not waiting
    return function (this: void) {
        // We return a throttled function
        if (!waiting) {
            // If we're not waiting
            callback.apply(this, arguments); // Execute users function
            waiting = true; // Prevent future invocations
            setTimeout(function () {
                // After a period of time
                waiting = false; // And allow future invocations
            }, limit);
        }
    };
}

export const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

export const platforms = {
  NATIVE: "native", // currently: Chrome, Edge mobile, Samsung internet
  FIREFOX: "firefox",
  FIREFOX_NEW: "firefox_new", // above version 79
  OPERA: "opera",
  IDEVICE: "idevice",
  OTHER: "other", // don't know, so will do nothing
};

export function getPlatform() {
  let platform = platforms.OTHER;
  if (window.hasOwnProperty("BeforeInstallPromptEvent")) {
    platform = platforms.NATIVE;
  } else if (isMobile && isAndroid && isFirefox && +browserVersion >= 79) {
    platform = platforms.FIREFOX_NEW;
  } else if (isMobile && isAndroid && isFirefox) {
    platform = platforms.FIREFOX;
  } else if (isOpera && isAndroid && isMobile) {
    platform = platforms.OPERA;
  } else if (isIOS && isMobile) {
    platform = platforms.IDEVICE;
  }

  return platform;
}