const civilWarData = {
    "Texas": { status: "seceded-before", label: "State that seceded before April 15, 1861" },
    "Louisiana": { status: "seceded-before", label: "State that seceded before April 15, 1861" },
    "Mississippi": { status: "seceded-before", label: "State that seceded before April 15, 1861" },
    "Alabama": { status: "seceded-before", label: "State that seceded before April 15, 1861" },
    "Georgia": { status: "seceded-before", label: "State that seceded before April 15, 1861" },
    "Florida": { status: "seceded-before", label: "State that seceded before April 15, 1861" },
    "South Carolina": { status: "seceded-before", label: "State that seceded before April 15, 1861" },
    "Arkansas": { status: "seceded-after", label: "State that seceded after April 15, 1861" },
    "Tennessee": { status: "seceded-after", label: "State that seceded after April 15, 1861" },
    "North Carolina": { status: "seceded-after", label: "State that seceded after April 15, 1861" },
    "Virginia": { status: "seceded-after", label: "State that seceded after April 15, 1861" },
    "Missouri": { status: "union-slavery", label: "Union state that permitted slavery" },
    "Kentucky": { status: "union-slavery", label: "Union state that permitted slavery" },
    "Maryland": { status: "union-slavery", label: "Union state that permitted slavery" },
    "Delaware": { status: "union-slavery", label: "Union state that permitted slavery" },
    "California": { status: "union-free", label: "Union state that banned slavery" },
    "Oregon": { status: "union-free", label: "Union state that banned slavery" },
    "Minnesota": { status: "union-free", label: "Union state that banned slavery" },
    "Iowa": { status: "union-free", label: "Union state that banned slavery" },
    "Wisconsin": { status: "union-free", label: "Union state that banned slavery" },
    "Illinois": { status: "union-free", label: "Union state that banned slavery" },
    "Indiana": { status: "union-free", label: "Union state that banned slavery" },
    "Michigan": { status: "union-free", label: "Union state that banned slavery" },
    "Ohio": { status: "union-free", label: "Union state that banned slavery" },
    "Pennsylvania": { status: "union-free", label: "Union state that banned slavery" },
    "New Jersey": { status: "union-free", label: "Union state that banned slavery" },
    "New York": { status: "union-free", label: "Union state that banned slavery" },
    "Connecticut": { status: "union-free", label: "Union state that banned slavery" },
    "Rhode Island": { status: "union-free", label: "Union state that banned slavery" },
    "Massachusetts": { status: "union-free", label: "Union state that banned slavery" },
    "Vermont": { status: "union-free", label: "Union state that banned slavery" },
    "New Hampshire": { status: "union-free", label: "Union state that banned slavery" },
    "Maine": { status: "union-free", label: "Union state that banned slavery" },
    "Washington Territory": { status: "territory", label: "Territory" },
    "Utah Territory": { status: "territory", label: "Territory" },
    "New Mexico Territory": { status: "territory", label: "Territory" },
    "Nebraska Territory": { status: "territory", label: "Territory" },
    "Kansas Territory": { status: "territory", label: "Territory" },
    "Indian Territory": { status: "territory", label: "Territory" },
    "Unorganized Territory": { status: "territory", label: "Territory" },
    "Neutral Strip": { status: "territory", label: "Territory" }
};

let score = 0;
let secondsElapsed = 0;
let timerInterval;
let gameActive = false;
let currentTargetState = "";
let availableStates = [];
let stage = 1; 

document.addEventListener("DOMContentLoaded", () => {
    imageMapResize(); 

    document.querySelectorAll('area').forEach(area => {
        area.addEventListener('click', function(e) {
            e.preventDefault();
            if (!gameActive || stage !== 1) return;
            const clickedState = this.getAttribute('data-state');
            checkAnswer(clickedState);
        });
    });
});

function startGame() {
    gameActive = true;
    score = 0;
    secondsElapsed = 0;
    availableStates = Object.keys(civilWarData);
    
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("prompt").classList.remove("hidden");
    document.getElementById("score").innerText = score;
    
    startTimer();
    nextRound();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
        const secs = (secondsElapsed % 60).toString().padStart(2, '0');
        document.getElementById("timer").innerText = `Time: ${mins}:${secs}`;
    }, 1000);
}

function nextRound() {
    if (availableStates.length === 0) return endGame();

    stage = 1;
    const randomIndex = Math.floor(Math.random() * availableStates.length);
    currentTargetState = availableStates[randomIndex];
    
    document.getElementById("prompt").innerText = `Find and click on: ${currentTargetState}`;
    document.getElementById("options").classList.add("hidden");
}

function checkAnswer(clickedState) {
    const promptEl = document.getElementById("prompt");

    if (clickedState === currentTargetState) {
        score++;
        document.getElementById("score").innerText = score;
        promptEl.innerText = "Correct!";
        promptEl.style.color = "#2ecc71"; 
    } else {
        promptEl.innerText = `Incorrect. That was ${clickedState}.`;
        promptEl.style.color = "#e74c3c"; 
    }

    setTimeout(() => {
        stage = 2;
        promptEl.style.color = ""; 
        promptEl.innerText = `What was the status of ${currentTargetState}?`;
        document.getElementById("options").classList.remove("hidden");
    }, 1500);
}

function checkStatus(selectedStatus) {
    if (!gameActive || stage !== 2) return;

    const stateData = civilWarData[currentTargetState];
    const promptEl = document.getElementById("prompt");
    
    document.getElementById("options").classList.add("hidden");

    if (selectedStatus === stateData.status) {
        score++;
        document.getElementById("score").innerText = score;
        promptEl.innerText = "Correct Status!";
        promptEl.style.color = "#2ecc71";
    } else {
        promptEl.innerText = `Incorrect. ${currentTargetState} was: ${stateData.label}`;
        promptEl.style.color = "#e74c3c";
    }

    setTimeout(() => {
        promptEl.style.color = ""; 
        availableStates = availableStates.filter(s => s !== currentTargetState);
        nextRound();
    }, 3000);
}

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    document.getElementById("prompt").innerText = `Game Over! Final Score: ${score}`;
    document.getElementById("start-btn").innerText = "Restart Game";
    document.getElementById("start-btn").classList.remove("hidden");
}