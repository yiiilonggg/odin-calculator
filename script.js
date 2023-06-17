function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y == 0) return "ERROR";
    return x / y;
}

function operate(x, y, op) {
    x = Number(x);
    y = Number(y);
    switch (op) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y);
        default:
            return x;
    }
}

function calculate() {
    const firstInput = document.querySelector("#first");
    const secondInput = document.querySelector("#second");
    const operator = document.querySelector("#op");
    return operate(firstInput, secondInput, operator);
}

function displayNumber(target) {
    if (display.textContent == "ERROR" || (display.textContent == "0" && target.textContent != ".") || justOperator || justEqual) {
        display.textContent = (target.textContent == ".") ? "0." : target.textContent;
    } else {
        if (display.textContent.includes(".") && target.textContent == ".") return; 
        display.textContent += target.textContent;
    }
    justEqual = false;
    justOperator = false;
}

function clearDisplay(event) {
    if (first == display.textContent) {
        first = undefined;
        operator = undefined;
    }
    display.textContent = "0";
}

function completeClear(event) {
    first = undefined;
    second = undefined;
    operator = undefined;
    justEqual = false;
    justOperator = false;
    display.textContent = "0";
    operatorArr.forEach(button => inactiveOperator(button));
}

function backspace(event) {
    if (display.textContent == "0") return;
    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
    if (display.textContent == "") display.textContent = "0";
}

function operatorFunction(target) {
    operatorArr.forEach(button => inactiveOperator(button));
    if (first == undefined || first == "ERROR") {
        if (target.textContent != "=") {
            first = display.textContent;
            operator = target.textContent;
            activeOperator(target);
            justOperator = true;
        } else {
            justEqual = true;
        }
    } else if (justEqual) {
        if (target.textContent != "=") {
            operator = target.textContent;
            activeOperator(target);
            justOperator = true;
        }
    } else {
        if (target.textContent == "=" && operator == undefined) return;
        second = display.textContent;
        let res = operate(first, second, operator);
        first = res;
        second = undefined;
        if (target.textContent == "=" || res == "ERROR") {
            operator = undefined;
        } else {
            operator = target.textContent;
            activeOperator(target);
            justOperator = true;
        }
        display.textContent = res;
        justEqual = true;
    }
}

function activeOperator(operatorButton) {
    operatorButton.style.background = "lightgreen";
    operatorButton.style.borderColor = "lightgreen";
}

function inactiveOperator(operatorButton) {
    operatorButton.style.background = "lightgray";
    operatorButton.style.borderColor = "lightgray";
}

function keyboard(event) {
    const button = (event.key == "Enter") ? document.querySelector(".equal") : document.querySelector(`button[key="${event.key}"]`);
    if (!button) return;
    if (button.classList.contains("operator")) {
        operatorFunction(button);
    } else if (button.classList.contains("number")) {
        displayNumber(button);
    } else if (button.classList.contains("backspace")) {
        backspace(button);
    }
}

const display = document.querySelector("#display");
display.textContent = 0;

const numberArr = Array.from(document.querySelectorAll(".number"));
numberArr.forEach(button => {
    button.addEventListener('click', (event) => displayNumber(event.target));
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearDisplay);
clearButton.addEventListener("dblclick", completeClear);

const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", backspace);

const operatorArr = Array.from(document.querySelectorAll(".operator"));
operatorArr.forEach(operator => {
    operator.addEventListener("click", (event) => operatorFunction(event.target));
});

let first = undefined;
let second = undefined;
let operator = undefined;
let justEqual = false;
let justOperator = false;

window.addEventListener("keydown", keyboard);