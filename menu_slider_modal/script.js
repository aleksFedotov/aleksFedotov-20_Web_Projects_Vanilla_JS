const toggle = document.querySelector("#toggle")
const close = document.querySelector("#close")
const open = document.querySelector("#open")
const modal = document.querySelector("#modal")

// Toggle nav
toggle.addEventListener("click", () => document.body.classList.toggle("show-nav"));

// Show model

open.addEventListener("click", () => {
    modal.classList.add("show-modal")
})

// Hide modal

close.addEventListener("click", () => {
    modal.classList.remove("show-modal")
})

// hide modal on outside click

window.addEventListener("click", e => {
    if (e.target == modal) {
        modal.classList.remove("show-modal")
    } else {
        return false
    }
})
