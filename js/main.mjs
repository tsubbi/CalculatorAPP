const calculatorData = {
    displayValue: '0',
    result: ' ',
    isAtSecondValue: false,
    isValueDecimal: false,
}

let buttons = Array.from(document.getElementById("calculator-buttons").querySelectorAll("button"));
buttons.forEach(btn => {
    btn.addEventListener('click', buttonPressed);
})

// enum types for buttons
// maybe I'll merge the equal into operator
const calculatorTypes = {
	DIGIT: "digit",
	OPERATOR: "operator",
	DECIMAL: "decimal",
	CLEAR: "clear",
    EQUAL: "equal",
}

function buttonPressed(event) {
    const type = event.srcElement.className;
    const value = event.srcElement.value;
    // className will be corresponding to the types above
    // innerText will be the value that appears on the button
    switch (type) {
        case calculatorTypes.DIGIT:
            addDigit(value);
            break;
        case calculatorTypes.OPERATOR:
            addOperator(value);
            break;
        case calculatorTypes.DECIMAL:
            addDecimal();
            break;
        case calculatorTypes.EQUAL:
            calcuateResult();
            break;
        default:
            reset();
    }
}

function calcuateResult() {
    // check if there is values to evaluate if there isn't, display 0
    calculatorData.result = calculatorData.displayValue === "" ? "0" : eval(calculatorData.displayValue);
    calculatorData.isAtSecondValue = false;
    calculatorData.isValueDecimal = false;

    updateDisplay()
}

function addDecimal() {
    if (!calculatorData.isValueDecimal) {
        // to avoid bug for unable to do eval with "."
        calculatorData.displayValue += calculatorData.displayValue === "" ? "0." : ".";
        calculatorData.isValueDecimal = true;
    }
    updateDisplay();
}

function addDigit(digit) {
    // reset everything when there is result
    if (calculatorData.result !== "") {
        reset();
    }

    if (calculatorData.displayValue === "0") {
        calculatorData.displayValue = digit;
    } else {
        calculatorData.displayValue += digit;
    }
    updateDisplay();
}

function addOperator(operator) {
    // to prevent have operator at beginning
    if (calculatorData.displayValue === "") return;
    // if is at second value, calculate result
    if (calculatorData.isAtSecondValue) {
        calcuateResult();
    }
    // if there is result, reset everything and display the answer as the first number
    if (calculatorData.result !== "") {
        let result = calculatorData.result;
        reset();
        calculatorData.displayValue = result;
    } 
    // add operator 
    if (!calculatorData.isAtSecondValue) {
        calculatorData.displayValue += operator
        calculatorData.isAtSecondValue = true;
        calculatorData.isValueDecimal = false;
    }

    updateDisplay();
}

function updateDisplay() {
    const calculating = document.querySelector("#calculator-string");
    const result = document.querySelector("#calculator-result");

    calculating.innerText = calculatorData.displayValue;
    result.innerText = calculatorData.result;
}

// reset the object to origional state and update view
function reset() {
    calculatorData.isAtSecondValue = false;
    calculatorData.displayValue = '';
    calculatorData.result = '';
    calculatorData.isValueDecimal = false;
    updateDisplay();
}