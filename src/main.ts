"use strict";

//  *****************************selected elements*****************************

// additional button elements
const startBtnEl = document.getElementById("btn-start");
const pauseBtnEl = document.getElementById("btn-pause");
const stopBtnEl = document.getElementById("btn-stop");
const resetBtnEl = document.getElementById("btn-reset");

//  timer text elements
const timerMinutesEl = document.getElementById("timer-minutes");
const timerSecondsEl = document.getElementById("timer-seconds");

function defineTimer(initialValue?: number): {
  getSeconds: () => number | undefined;
  setSeconds: (
    callback?: ((seconds: number | undefined) => number) | number,
  ) => void;
} {
  let seconds: number | undefined = initialValue;

  function getSeconds(): number | undefined {
    return seconds;
  }

  function setSeconds(
    callback?: ((previous: number | undefined) => number) | number,
  ): void {
    if (typeof callback === "number" || typeof callback === "undefined") {
      seconds = callback;
      return;
    }

    if (typeof callback === "function") {
      seconds = callback(seconds);
      return;
    }
  }

  return { getSeconds, setSeconds };
}

// global state
const { getSeconds, setSeconds } = defineTimer();
let timer: number | undefined;

// attach event listener to element
const subscribeEventListener = function (
  el: HTMLElement | null,
  event: keyof HTMLElementEventMap,
  callback: () => void,
): (() => void) | undefined {
  if (!el || !event || !callback) {
    return;
  }

  el.addEventListener(event, callback);

  return function () {
    el.removeEventListener(event, callback);
  };
};

// start timer
const startTimer = function (): void {
  if (timer) {
    return;
  }

  timer = setInterval((): void => {
    setSeconds((previous: number | undefined): number => {
      if (!previous) {
        return 12 * 1;
      }

      return previous - 1;
    });
    const seconds = getSeconds();
    renderTime(seconds);

    if (seconds === 0) {
      if (!timer) {
        return;
      }

      clearInterval(timer);
      timer = undefined;
    }
  }, 1000);
};

subscribeEventListener(startBtnEl, "click", startTimer);

// stop timer
const stopTimer = function (): void {
  const seconds = getSeconds();
  if (timer === undefined && !seconds) {
    return;
  }

  clearInterval(timer);
  setSeconds(0);
  const secondsAfterStop = getSeconds();
  renderTime(secondsAfterStop);
  timer = undefined;
};

subscribeEventListener(stopBtnEl, "click", stopTimer);

// pause timer
const pauseTimer = function (): void {
  if (timer === undefined) {
    return;
  }

  clearInterval(timer);
  timer = undefined;
};

subscribeEventListener(pauseBtnEl, "click", pauseTimer);

// reset timer
const resetTimer = function (): void {
  const seconds = getSeconds();
  if (timer === undefined && seconds === undefined) {
    return;
  }

  clearInterval(timer);
  setSeconds();
  const secondsAfterReset = getSeconds();
  renderTime(secondsAfterReset);
  timer = undefined;
};

subscribeEventListener(resetBtnEl, "click", resetTimer);

const renderTime = function (seconds: number | undefined): void {
  if (seconds === undefined) {
    timerMinutesEl!.textContent = "--";
    timerSecondsEl!.textContent = "--";
    return;
  }

  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  timerMinutesEl!.textContent = mm < 10 ? `0${mm}` : `${mm}`;
  timerSecondsEl!.textContent = ss < 10 ? `0${ss}` : `${ss}`;
};
