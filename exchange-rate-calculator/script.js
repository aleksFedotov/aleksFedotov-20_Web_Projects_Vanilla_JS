const currencyEl_one = document.querySelector("#currency-one")
const amountEl_one = document.querySelector("#amount-one")
const currencyEl_two = document.querySelector("#currency-two")
const amountEl_two = document.querySelector("#amount-two")

const rateEl = document.querySelector("#rate")
const swapBtn = document.querySelector("#swap")

// Fetch exchange rates and upfdate the DOM
function calulate() {
    const currency_one = currencyEl_one.value
    const currency_two = currencyEl_two.value

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two]
            rateEl.innerText = `1 ${currency_one} = ${rate}${currency_two}`;

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2)
        });
}


// Event listeners

currencyEl_one.addEventListener("change", calulate);
amountEl_one.addEventListener("input", calulate);
currencyEl_two.addEventListener("change", calulate);
amountEl_two.addEventListener("input", calulate);
swapBtn.addEventListener("click", () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calulate();
})
calulate();