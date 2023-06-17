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
    return x / y;
}

function operate(x, y, op) {
    switch (op) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        default:
            return divide(x, y);
    }
}

function calculate() {
    const firstInput = document.querySelector("#first");
    const secondInput = document.querySelector("#second");
    const operator = document.querySelector("#op");
    return operate(firstInput, secondInput, operator);
}