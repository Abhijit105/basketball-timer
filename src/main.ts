"use strict";

import setupTimer from "./timer.ts";
import { subscribeEventListener } from "./util.ts";

// additional button elements

const startBtnEl = document.getElementById("btn-start");
const pauseBtnEl = document.getElementById("btn-pause");
const stopBtnEl = document.getElementById("btn-stop");
const resetBtnEl = document.getElementById("btn-reset");

// global state
const { startTimer, pauseTimer, stopTimer, resetTimer } = setupTimer();

subscribeEventListener(startBtnEl, "click", startTimer);

subscribeEventListener(stopBtnEl, "click", stopTimer);

subscribeEventListener(pauseBtnEl, "click", pauseTimer);

subscribeEventListener(resetBtnEl, "click", resetTimer);
