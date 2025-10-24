//  timer text elements
const timerMinutesEl = document.getElementById("timer-minutes");
const timerSecondsEl = document.getElementById("timer-seconds");

function setupTimer(initialValue?: number): {
  getTimer: () => number | undefined;
  getSeconds: () => number | undefined;
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
} {
  let timer: number | undefined;
  let seconds: number | undefined = initialValue;

  function getTimer(): number | undefined {
    return timer;
  }

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

  // start timer
  const startTimer = function (): void {
    if (timer) {
      return;
    }

    timer = setInterval((): void => {
      setSeconds((previous: number | undefined): number => {
        if (!previous) {
          return 12 * 60;
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

  // pause timer
  const pauseTimer = function (): void {
    if (timer === undefined) {
      return;
    }

    clearInterval(timer);
    timer = undefined;
  };

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

  return {
    getTimer,
    getSeconds,
    startTimer,
    pauseTimer,
    stopTimer,
    resetTimer,
  };
}

const Timer = setupTimer();

export default Timer;
