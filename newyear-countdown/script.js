const days = document.querySelector("#days")
const hours = document.querySelector("#hours")
const minutes = document.querySelector("#minutes")
const seconds = document.querySelector("#seconds")
const countdown = document.querySelector("#countdown")
const year = document.querySelector("#year")
const loading = document.querySelector("#loading")


const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`)

// Set backgroud year
year.innerHTML = currentYear + 1


// Update countdow timer
function updateCountDown() {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    days.innerHTML = d;
    hours.innerHTML = h < 0 ? "0" + h : h;
    minutes.innerHTML = m < 0 ? "0" + m : m;
    seconds.innerHTML = s < 0 ? "0" + s : s;;

}

// Show spinner before countdown
setTimeout(() => {
    loading.remove();
    countdown.style.display = "flex"
}, 1000);

// Run every second
setInterval(updateCountDown, 1000);