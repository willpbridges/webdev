(function () {
    "use strict";

    let result = 0;
    let currentValue = 0;
    let currentSign = '';

    function init() {
        let textField = document.getElementById("calcDisplay");
        textField.value = currentValue;
        let buttons = document.getElementsByTagName("button");
        buttons = Array.from(buttons);
        for (var i = 0; i < buttons.length; i++) {
            let b = buttons[i];
            b.addEventListener("click", function () {
                calculate(b);
            })
        }
    }

    function calculate(button) {
        let textField = document.getElementById("calcDisplay");
        switch (button.id) {
            /* If multiple operation buttons are pressed in succesion before pressing 
            equals (e.g. 5 - 2 * 3 - 1), the calculator automatically completes the
            operation and displays the result at each step. This was based on the
            behavior of the Windows 10 calculator.*/
            case "+=":
                if (currentValue !== 0) {
                    execute();
                }
                currentSign = '+';
                break;
            case "-":
                if (currentValue !== 0) {
                    execute();
                }
                currentSign = "-";
                break;
            case "*":
                if (currentValue !== 0) {
                    execute();
                }
                currentSign = "*";
                break;
            case "/":
                if (currentValue !== 0) {
                    execute();
                }
                currentSign = "/";
                break;
            case ".":
                if (!textField.value.includes(".")) {
                    textField.value += ".";
                }
                break;
            case "C":
                console.log(button.id);
                currentValue = 0;
                result = 0;
                textField.value = currentValue;
                break;
            default:
                if (textField.value === "0") {
                    textField.value = button.id;
                } else if (textField.value === "0.") {
                    textField.value += button.id;
                } else if (currentValue === 0){
                    textField.value = button.id;
                } else {
                    textField.value += button.id;
                }
                currentValue = parseFloat(textField.value);
                break;
        }
    }

    function execute() {
        let textField = document.getElementById("calcDisplay");
        switch (currentSign) {
            case "+":
                result += currentValue;
                break;
            case "-":
                result -= currentValue;
                break;
            case "*":
                result *= currentValue;
                break;
            case "/":
                result /= currentValue;
                break;
            default:
                result = currentValue;
        }
        currentValue = 0;
        textField.value = result;
    }

    window.addEventListener("load", init, false);
})()