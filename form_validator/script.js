const form = document.querySelector("#form")
const username = document.querySelector("#username")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const passwordConf = document.querySelector("#confirmation")



//Show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

// Show sucess outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
    
}

// Check email is valid
function chekEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(String(input.value).toLowerCase())){
        showError(input, "Email is not valid")
    } else{
        showSuccess(input);
    }

}

// Check required fields 

function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(!input.value.trim()){
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }

    })

}

// Checkinput lenght 
function checkLength(input, min, max) {
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    }   else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be  less than ${max} characters`)
    } else {
        showSuccess
    }

}

// Check passwords match 

function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value){
        showError(input2,"Passwords do not match")
    }
}

// Get fielname

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Even listeners
form.addEventListener("submit", (e) =>{
    e.preventDefault();

    checkRequired([username,email,password,passwordConf]);
    checkLength(username, 3,15);
    checkLength(password, 6,25);
    chekEmail(email);
    checkPasswordsMatch(password,passwordConf)

    

});