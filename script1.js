// JavaScript file: script.js

// Variables to track the stopwatch state
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

// Get DOM elements
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapList = document.getElementById('lap-list');

// Format time function
function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = time % 1000;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}

// Function to start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
        startButton.textContent = 'Lap';
    } else {
        // Record lap time
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${++lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

// Function to pause the stopwatch
function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startButton.textContent = 'Start';
    }
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    lapCount = 0;
    startButton.textContent = 'Start';
    timeDisplay.textContent = formatTime(elapsedTime);
    lapList.innerHTML = '';
}

// Function to update the time display
function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Attach event listeners to buttons
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
