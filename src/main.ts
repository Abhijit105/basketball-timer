"use strict";

import Timer from "./timer.ts";
import Statistics from "./statistics.ts";
import { subscribeEventListener } from "./util.ts";

// additional button elements

const startBtn = document.getElementById("btn-start");
const pauseBtn = document.getElementById("btn-pause");
const stopBtn = document.getElementById("btn-stop");
const resetBtn = document.getElementById("btn-reset");

// team points button elements

const teamHomePoints1Btn = document.getElementById("team-home-points-1");
const teamHomePoints2Btn = document.getElementById("team-home-points-2");
const teamHomePoints3Btn = document.getElementById("team-home-points-3");
const teamGuestPoints1Btn = document.getElementById("team-guest-points-1");
const teamGuestPoints2Btn = document.getElementById("team-guest-points-2");
const teamGuestPoints3Btn = document.getElementById("team-guest-points-3");
const teamHomeIncFoulsBtn = document.getElementById("team-home-inc-fouls");
const teamHomeDecFoulsBtn = document.getElementById("team-home-dec-fouls");
const teamGuestIncFoulsBtn = document.getElementById("team-guest-inc-fouls");
const teamGuestDecFoulsBtn = document.getElementById("team-guest-dec-fouls");

const { getTimer, getSeconds, startTimer, pauseTimer, stopTimer, resetTimer } =
  Timer;
const {
  getScoreHome,
  getScoreGuest,
  setScoreHome,
  setScoreGuest,
  getFoulsHome,
  getFoulsGuest,
  setFoulsHome,
  setFoulsGuest,
  incrementScoreHome,
  incrementScoreGuest,
  incrementFoulsHome,
  decrementFoulsHome,
  incrementFoulsGuest,
  decrementFoulsGuest,
} = Statistics;

subscribeEventListener(startBtn, "click", (): void => {
  const timer = getTimer();
  const seconds = getSeconds();
  if (timer === undefined) {
    (getScoreHome() === undefined || seconds === 0) && setScoreHome(0);
    (getScoreGuest() === undefined || seconds === 0) && setScoreGuest(0);
    (getFoulsHome() === undefined || seconds === 0) && setFoulsHome(0);
    (getFoulsGuest() === undefined || seconds === 0) && setFoulsGuest(0);
  }

  startTimer();

  startBtn!.setAttribute("disabled", "");
  pauseBtn!.removeAttribute("disabled");
  stopBtn!.removeAttribute("disabled");
  resetBtn!.removeAttribute("disabled");
  teamHomePoints1Btn!.removeAttribute("disabled");
  teamHomePoints2Btn!.removeAttribute("disabled");
  teamHomePoints3Btn!.removeAttribute("disabled");
  teamGuestPoints1Btn!.removeAttribute("disabled");
  teamGuestPoints2Btn!.removeAttribute("disabled");
  teamGuestPoints3Btn!.removeAttribute("disabled");
  teamHomeIncFoulsBtn!.removeAttribute("disabled");
  teamHomeDecFoulsBtn!.removeAttribute("disabled");
  teamGuestIncFoulsBtn!.removeAttribute("disabled");
  teamGuestDecFoulsBtn!.removeAttribute("disabled");
});

subscribeEventListener(pauseBtn, "click", (): void => {
  pauseTimer();

  startBtn!.removeAttribute("disabled");
  pauseBtn!.setAttribute("disabled", "");
  stopBtn!.removeAttribute("disabled");
  resetBtn!.removeAttribute("disabled");
  teamHomePoints1Btn!.setAttribute("disabled", "");
  teamHomePoints2Btn!.setAttribute("disabled", "");
  teamHomePoints3Btn!.setAttribute("disabled", "");
  teamGuestPoints1Btn!.setAttribute("disabled", "");
  teamGuestPoints2Btn!.setAttribute("disabled", "");
  teamGuestPoints3Btn!.setAttribute("disabled", "");
  teamHomeIncFoulsBtn!.setAttribute("disabled", "");
  teamHomeDecFoulsBtn!.setAttribute("disabled", "");
  teamGuestIncFoulsBtn!.setAttribute("disabled", "");
  teamGuestDecFoulsBtn!.setAttribute("disabled", "");
});

subscribeEventListener(stopBtn, "click", (): void => {
  stopTimer();

  startBtn!.removeAttribute("disabled");
  pauseBtn!.setAttribute("disabled", "");
  stopBtn!.setAttribute("disabled", "");
  resetBtn!.removeAttribute("disabled");
  teamHomePoints1Btn!.setAttribute("disabled", "");
  teamHomePoints2Btn!.setAttribute("disabled", "");
  teamHomePoints3Btn!.setAttribute("disabled", "");
  teamGuestPoints1Btn!.setAttribute("disabled", "");
  teamGuestPoints2Btn!.setAttribute("disabled", "");
  teamGuestPoints3Btn!.setAttribute("disabled", "");
  teamHomeIncFoulsBtn!.setAttribute("disabled", "");
  teamHomeDecFoulsBtn!.setAttribute("disabled", "");
  teamGuestIncFoulsBtn!.setAttribute("disabled", "");
  teamGuestDecFoulsBtn!.setAttribute("disabled", "");
});

subscribeEventListener(resetBtn, "click", (): void => {
  const timer = getTimer();
  const seconds = getSeconds();
  if (timer === undefined && seconds === undefined) {
    return;
  }

  setScoreHome();
  setScoreGuest();
  setFoulsHome();
  setFoulsGuest();
  resetTimer();

  startBtn!.removeAttribute("disabled");
  pauseBtn!.setAttribute("disabled", "");
  stopBtn!.setAttribute("disabled", "");
  resetBtn!.setAttribute("disabled", "");
  teamHomePoints1Btn!.setAttribute("disabled", "");
  teamHomePoints2Btn!.setAttribute("disabled", "");
  teamHomePoints3Btn!.setAttribute("disabled", "");
  teamGuestPoints1Btn!.setAttribute("disabled", "");
  teamGuestPoints2Btn!.setAttribute("disabled", "");
  teamGuestPoints3Btn!.setAttribute("disabled", "");
  teamHomeIncFoulsBtn!.setAttribute("disabled", "");
  teamHomeDecFoulsBtn!.setAttribute("disabled", "");
  teamGuestIncFoulsBtn!.setAttribute("disabled", "");
  teamGuestDecFoulsBtn!.setAttribute("disabled", "");
});

subscribeEventListener(teamHomePoints1Btn, "click", (): void => {
  const timer = getTimer();
  if (timer === undefined) {
    return;
  }

  incrementScoreHome(1);
});
subscribeEventListener(teamHomePoints2Btn, "click", (): void => {
  const timer = getTimer();
  if (timer === undefined) {
    return;
  }

  incrementScoreHome(2);
});
subscribeEventListener(teamHomePoints3Btn, "click", (): void => {
  const timer = getTimer();
  if (timer === undefined) {
    return;
  }

  incrementScoreHome(3);
});
subscribeEventListener(teamGuestPoints1Btn, "click", (): void => {
  const timer = getTimer();
  if (timer === undefined) {
    return;
  }

  incrementScoreGuest(1);
});
subscribeEventListener(teamGuestPoints2Btn, "click", (): void => {
  const timer = getTimer();
  if (timer === undefined) {
    return;
  }

  incrementScoreGuest(2);
});
subscribeEventListener(teamGuestPoints3Btn, "click", (): void => {
  const timer = getTimer();
  if (timer === undefined) {
    return;
  }

  incrementScoreGuest(3);
});
subscribeEventListener(teamHomeIncFoulsBtn, "click", (): void => {
  const timer = getTimer();
  if (timer === undefined) {
    return;
  }

  incrementFoulsHome();
});
subscribeEventListener(teamHomeDecFoulsBtn, "click", (): void => {
  const timer = getTimer();
  if (timer === undefined) {
    return;
  }

  decrementFoulsHome();
});
subscribeEventListener(teamGuestIncFoulsBtn, "click", (): void => {
  const timer = getTimer();
  if (timer === undefined) {
    return;
  }

  incrementFoulsGuest();
});
subscribeEventListener(teamGuestDecFoulsBtn, "click", (): void => {
  const timer = getTimer();
  if (timer === undefined) {
    return;
  }

  decrementFoulsGuest();
});
