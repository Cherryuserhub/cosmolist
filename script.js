// Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');

const currentTimeEl = document.getElementById('currentTime');
const currentDateEl = document.getElementById('currentDate');

const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Current Time & Date
function updateClock() {
    const now = new Date();
    
    const time = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = now.toLocaleDateString('en-US', options);
    
    currentTimeEl.textContent = time;
    currentDateEl.textContent = date;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call

// Stopwatch
let stopwatchTime = 0;
let stopwatchInterval = null;
let isRunning = false;

function formatStopwatch(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateStopwatchDisplay() {
    stopwatchDisplay.textContent = formatStopwatch(stopwatchTime);
}

startBtn.onclick = () => {
    if (isRunning) return;
    isRunning = true;
    
    const startTime = Date.now() - stopwatchTime;
    stopwatchInterval = setInterval(() => {
        stopwatchTime = Date.now() - startTime;
        updateStopwatchDisplay();
    }, 100);
    
    startBtn.textContent = 'Running...';
    startBtn.disabled = true;
};

pauseBtn.onclick = () => {
    if (!isRunning) return;
    clearInterval(stopwatchInterval);
    isRunning = false;
    startBtn.textContent = 'Start';
    startBtn.disabled = false;
};

resetBtn.onclick = () => {
    clearInterval(stopwatchInterval);
    isRunning = false;
    stopwatchTime = 0;
    updateStopwatchDisplay();
    startBtn.textContent = 'Start';
    startBtn.disabled = false;
};

// To-Do List Functions
function createTaskElement(text) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = () => li.classList.toggle('completed');

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.onclick = () => {
        li.remove();
        updateEmptyState();
    };

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    return li;
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    const taskElement = createTaskElement(text);
    taskList.appendChild(taskElement);
    taskInput.value = '';
    updateEmptyState();
}

function updateEmptyState() {
    emptyState.style.display = taskList.children.length === 0 ? 'block' : 'none';
}

// Event Listeners
addBtn.onclick = addTask;

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

updateEmptyState();

// … all your previous code (clock, stopwatch, to-do) stays exactly the same …

// Add this at the very bottom of script.js

const bgMusic = document.getElementById('bgMusic');

// Auto play faint music when page loads
bgMusic.play().catch(() => {
    // If browser blocks auto-play, wait for first click
    document.body.addEventListener('click', () => bgMusic.play(), { once: true });
});

// Tiny music on/off button
const musicToggle = document.createElement('button');
musicToggle.className = 'music-toggle';
musicToggle.textContent = '♪';
musicToggle.onclick = () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.textContent = '♫';
    } else {
        bgMusic.pause();
        musicToggle.textContent = '♪';
    }
};
document.body.appendChild(musicToggle);