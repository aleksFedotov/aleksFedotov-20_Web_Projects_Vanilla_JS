const main = document.querySelector("#main");
const addUserBtn = document.querySelector("#add-user");
const doubleBtn = document.querySelector("#double");
const showMillionersBtn = document.querySelector("#show-millionaires");
const sortBtn = document.querySelector("#sort");
const calculateWealthBtn = document.querySelector("#calculate-wealth");


let data = [];

//fetch random user andd mobye


async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser)

}

// Double everyones money

function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();

}
// Sort users by richest
function sortUsers() {
    data.sort((a, b) => b.money - a.money)
    updateDOM();
}

//Show only Millioners

function showMillioners() {
    data = data.filter(user => user.money > 1000000)
    updateDOM();
}

// calculate overall wealth

function calculateWealth() {
    const wealth = data.reduce((total, user) => total += user.money, 0)
    const wealthEl = document.createElement("div")
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;

    main.appendChild(wealthEl)

}


// Update DOM
function updateDOM(provideData = data) {
    // Clear main div

    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>"

    provideData.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}


// Format number as money https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// Add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Event Listeners

addUserBtn.addEventListener("click", getRandomUser)

doubleBtn.addEventListener("click", doubleMoney)

sortBtn.addEventListener("click", sortUsers)

showMillionersBtn.addEventListener("click", showMillioners)

calculateWealthBtn.addEventListener("click", calculateWealth)




