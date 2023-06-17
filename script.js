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

function displayNumber(event) {
    if (display.textContent == "ERROR" || (display.textContent == "0" && event.target.textContent != ".") || justOperator || justEqual) {
        display.textContent = (event.target.textContent == ".") ? "0." : event.target.textContent;
    } else {
        if (display.textContent.includes(".") && event.target.textContent == ".") return; 
        display.textContent += event.target.textContent;
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

function operatorFunction(event) {
    if (first == undefined || first == "ERROR") {
        if (event.target.textContent != "=") {
            first = display.textContent;
            operator = event.target.textContent;
            activeOperator(event.target);
            justOperator = true;
        } else {
            justEqual = true;
        }
    } else if (justEqual) {
        if (event.target.textContent != "=") {
            operator = event.target.textContent;
            activeOperator(event.target);
            justOperator = true;
        }
    } else {
        if (event.target.textContent == "=" && operator == undefined) return;
        second = display.textContent;
        let res = operate(first, second, operator);
        first = res;
        second = undefined;
        operatorArr.forEach(button => inactiveOperator(button));
        if (event.target.textContent == "=") {
            operator = undefined;
        } else {
            operator = event.target.textContent;
            activeOperator(event.target);
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

const display = document.querySelector("#display");
display.textContent = 0;

const numberArr = Array.from(document.querySelectorAll(".number"));
numberArr.forEach(button => {
    button.addEventListener('click', displayNumber);
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearDisplay);
clearButton.addEventListener("dblclick", completeClear);

const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", backspace);

const operatorArr = Array.from(document.querySelectorAll(".operator"));
operatorArr.forEach(operator => {
    operator.addEventListener("click", operatorFunction);
});

let first = undefined;
let second = undefined;
let operator = undefined;
let justEqual = false;
let justOperator = false;