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

// global state
let seconds: number | undefined;
let timer: number | undefined;

// attach event listener to element
const subscribe = function (
  el: HTMLElement | null,
  event: keyof HTMLElementEventMap,
  callback: () => void,
) {
  if (!el || !event || !callback) {
    return;
  }

  el.addEventListener(event, callback);
};

// start timer
const startTimer = function () {
  if (timer && typeof seconds === "number" && seconds > 0) {
    return;
  }

  timer = setInterval(() => {
    if (!seconds) {
      seconds = 12 * 1;
    }

    renderTime();
    seconds--;
  }, 1000);
};

subscribe(startBtnEl, "click", startTimer);

// stop timer
const stopTimer = function () {
  if (!timer) {
    return;
  }

  clearInterval(timer);
  seconds = 0;
  renderTime();
  timer = undefined;
};

subscribe(stopBtnEl, "click", stopTimer);

// pause timer
const pauseTimer = function () {
  if (!timer) {
    return;
  }

  clearInterval(timer);
  timer = undefined;
};

subscribe(pauseBtnEl, "click", pauseTimer);

// reset timer
const resetTimer = function () {
  clearInterval(timer);
  timer = undefined;

  timerMinutesEl!.textContent = "--";
  timerSecondsEl!.textContent = "--";
};

subscribe(resetBtnEl, "click", resetTimer);

const renderTime = function (): void {
  if (seconds === null || seconds === undefined) {
    return;
  }

  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  timerMinutesEl!.textContent = mm < 10 ? `0${mm}` : `${mm}`;
  timerSecondsEl!.textContent = ss < 10 ? `0${ss}` : `${ss}`;
};
