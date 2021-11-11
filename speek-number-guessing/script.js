const msgEl = document.querySelector("#msg")

const randomNum = getRandomNumber();

console.log("Number", randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript;


    writeMessage(msg);
    checkNumber(msg);
}

// Check massege against number
function checkNumber(msg) {
    const num = +msg;


    // Check if valid number
    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div>Это не число</div>';
        return;
    }

    // Check in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div>Число должно быть между 1 и 100</div>';
        return;
    }

    // Check number
    if (num === randomNum) {
        document.body.innerHTML = `
        <h2>Поздравляем! Вы угадали число!<br><br>
        Это число ${num}</h2>
        <button class="play-again" id="play-again">Играть снова</button>
        `;
    } else if (num > randomNum) {
        msgEl.innerHTML += `<div>Больше загадонного</div>`;
    } else {
        msgEl.innerHTML += `<div>Меньше загадонного</div>`;
    }
}

// Write what user speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>Вы сказали:</div>
    <span class="box">${msg}</span>
    `
}

// Generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}

// Speak result 
recognition.addEventListener("result", onSpeak)

// Ens SR sevice
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener("click", (e) => {
    if (e.target.id == "play-again") {
        window.location.reload();
    }
})