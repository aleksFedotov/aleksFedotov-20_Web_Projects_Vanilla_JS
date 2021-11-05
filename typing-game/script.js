const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

// Init word 
let randomWord;

// Init score
let score = 0;

// Init time 
let time = 10;

// Set difficulty to value in ls or medium by default

let difficulty = localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty selected value
difficultySelect.value = localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Focus on text on statr
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Get a random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + "s";

    if (time === 0) {
        clearInterval(timeInterval);
        // end game
        gameOver();
    }
}

// Game Over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `
    endgameEl.style.display = "flex"
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

addWordToDOM();

// Event Listeners
// Typing
text.addEventListener("input", e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        // Clear
        e.target.value = ""

        if (difficulty === "hard") {
            time += 2
        } else if (difficulty === "medium") {
            time += 3
        } else {
            time += 5
        }
        updateTime();
    }
});

// Settings btn click
settingsBtn.addEventListener("click", () => {
    settings.classList.toggle("hide")
});

// settings select 
settingsForm.addEventListener("change", (e) => {
    difficulty = e.target.value

    localStorage.setItem("difficulty", difficulty)
})