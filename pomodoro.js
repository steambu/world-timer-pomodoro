const workTimeInput = document.querySelector("#work-time");
const breakTimeInput = document.querySelector("#break-time");
const pomTimeDisplay = document.querySelector(".display .time");
const phaseDisplay = document.querySelector(".display .phase");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resumeButton = document.querySelector("#resume");

let timerId;
let timeLeft;
let isWorkPhase;
let isTimerPaused;

const audio = new Audio("./quest_succeeded.wav");
audio.volume = 0.1;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  pomTimeDisplay.textContent = display;
}

function switchPhase(startWithWorkPhase) {
  isWorkPhase = startWithWorkPhase;
  timeLeft = isWorkPhase ? workTimeInput.value * 60 : breakTimeInput.value * 60;
  phaseDisplay.textContent = isWorkPhase ? "Work" : "Break";
  phaseDisplay.style.color = isWorkPhase ? "#28a745" : "#dc3545";
  updateTimer();
}

function startTimer() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resumeButton.disabled = true;
  switchPhase(true);
  timerId = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      switchPhase(!isWorkPhase);
      audio.play(); // Add this line to play the audio when phase switches.
    }
  }, 1000);
}

function stopTimer() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resumeButton.disabled = false;
  clearInterval(timerId);
  isTimerPaused = true;
}

function resumeTimer() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resumeButton.disabled = true;
  isTimerPaused = false;
  timerId = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      switchPhase(!isWorkPhase);
      audio.play(); // Add this line to play the audio when phase switches.
    }
  }, 1000);
}

startButton.addEventListener("click", startTimer);

stopButton.addEventListener("click", stopTimer);

resumeButton.addEventListener("click", resumeTimer);

switchPhase(true);
