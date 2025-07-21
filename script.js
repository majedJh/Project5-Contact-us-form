const sentMessage = document.querySelector(".sent-msg");
const firstNameErrors = document.querySelectorAll(".first-name .error-msgs div");
const lastNameErrors = document.querySelectorAll(".last-name .error-msgs div");
const emailErrors = document.querySelectorAll(".email-input .error-msgs div");
const queryErrors = document.querySelectorAll(".query-input .error-msgs div");
const messageErrors = document.querySelectorAll(".message-input .error-msgs div");
const consentErrors = document.querySelectorAll(".consent .error-msgs div");
const firstNameInput = document.querySelector(".first-name").querySelector("input");
const lastNameInput = document.querySelector(".last-name").querySelector("input");
const emailInput = document.querySelector(".email-input").querySelector("input");
const queryInput = document.querySelector(".query-input").querySelectorAll(".query-box");
const generalqInput = document.querySelector(".query-input").querySelectorAll(".query-box")[0].querySelector("input");
const supportqInput = document.querySelector(".query-input").querySelectorAll(".query-box")[1].querySelector("input");
const messageInput = document.querySelector(".message-input").querySelector("textarea");
const consentInput = document.querySelector(".consent").querySelector("input");
const submitBtn = document.querySelector("input[type='submit']");
const contactForm = document.querySelector("form");

contactForm.addEventListener("submit", submitForm);
contactForm.addEventListener("keydown", (e) => {
    if (e.code == "enter") {
        e.preventDefault();
        submitForm();
    }
})

function submitForm(e) {
    e.preventDefault();
    const checks = [
        errorShow(firstNameInput, firstNameErrors, "name"),
        errorShow(lastNameInput, lastNameErrors, "name"),
        errorShow(emailInput, emailErrors, "email"),
        errorShow(queryInput, queryErrors, "query"),
        errorShow(messageInput, messageErrors, "message"),
        errorShow(consentInput, consentErrors, "consent")
    ];
    const hasError = checks.some(result => !result);
    if (!hasError) {
        contactForm.classList.remove("hasError")
        sendForm();
        clearForm();
        showSentMessage()
    }
}

function errorShow(input, errors, type) {
    let param;
    let flag = true;
    if (type == "query" || type == "consent") {
        param = input
    } else {
        param = input.value.trim();
    }
    if (validate(param, type) == "empty") {
        flag = false;
        contactForm.classList.add("hasError");
        errors[1].classList.remove("show-error");
        errors[0].classList.add("show-error");
        if (type != "consent" && type != "query") {
            input.classList.add("error");
        }
    } else if (validate(param, type) == "invalid") {
        flag = false;
        contactForm.classList.add("hasError");
        errors[0].classList.remove("show-error")
        errors[1].classList.add("show-error");
        if (type != "consent" && type != "query") {
            input.classList.add("error");
        }
    } else {
        errors[0].classList.remove("show-error");
        errors[1].classList.remove("show-error");
        if (type != "consent" && type != "query") {
            input.classList.remove("error");
        }
        return flag;
    }
}
function validate(par, type) {
    switch (type) {
        case "name": return validateName(par);
        case "email": return validateEmail(par);
        case "query": return validateQuery(par);
        case "message": return validateMsg(par);
        case "consent": return validateConsent(par);
    }
}
function validateName(name) {
    if (name) {
        if (name.length <= 40) {
            return "valid";
        } else {
            return "invalid"
        }
    } else return "empty";
}
function validateEmail(email) {
    if (email) {
        if (/^(?!_|-|\d)[A-Za-z]+(?:\.[A-Za-z0-9]+)*@\w+(?:\.\w+)*\.\w+$/.test(email)) {
            return "valid";
        } else return "invalid"
    }
    else return "empty";
}
function validateQuery(queryIn) {
    let flag = "empty"
    queryIn = Array.from(queryIn || []);
    queryIn.forEach((e) => {
        if (e.querySelector("input").checked) {
            flag = "valid"
        }
    })
    return flag;
}
function validateMsg(msg) {
    if (msg) {
        return "valid"
    } else return "empty"
}
function validateConsent(consentIn) {
    if (consentIn.checked) {
        return "valid";
    } else return "empty";
}
function sendForm() {
    //any form send API
}
function clearForm() {
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    queryInput.forEach((e) => {
        e.querySelector("input").checked = false;
    })
    messageInput.value = "";
    consentInput.checked = false;
}
function showSentMessage() {
    sentMessage.classList.add("show")
    setTimeout(() => {
        sentMessage.classList.remove("show");
    }, 8000)
}

