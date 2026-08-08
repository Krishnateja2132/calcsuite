const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let hasError = false;

// =========================
// Calculate Expression
// =========================
async function calculateExpression() {

    if (display.value.trim() === "")
        return;

    const response = await fetch("/calculate", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            expression: display.value
        })

    });

    const data = await response.json();

    if (data.success) {

        display.value = data.result;
        hasError = false;

    } else {

        display.value = data.error;
        hasError = true;

    }

}

// =========================
// Scientific Operations
// =========================
async function scientificOperation(operation) {

    if (display.value.trim() === "" || hasError)
        return;

    const response = await fetch("/scientific", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            operation: operation,
            value: display.value

        })

    });

    const data = await response.json();

    if (data.success) {

        display.value = data.result;
        hasError = false;

    } else {

        display.value = data.error;
        hasError = true;

    }

}

// =========================
// Button Click Dispatcher
// =========================
buttons.forEach(button => {

    button.addEventListener("click", async () => {

        const value = button.innerText;

        switch (value) {

            case "=":

                await calculateExpression();
                break;

            case "C":

            case "AC":

                display.value = "";
                hasError = false;
                break;

            case "√":

                await scientificOperation("sqrt");
                break;

            case "x²":

                await scientificOperation("square");
                break;

            case "%":

                await scientificOperation("percent");
                break;

            default:

                if (hasError) {

                    display.value = "";
                    hasError = false;

                }

                display.value += value;

        }

    });

});

// =========================
// Keyboard Support
// =========================
document.addEventListener("keydown", async (event) => {

    const key = event.key;

    // Enter → Calculate
    if (key === "Enter") {

        event.preventDefault();
        await calculateExpression();
        return;

    }

    // Escape → Clear
    if (key === "Escape") {

        display.value = "";
        hasError = false;
        return;

    }

    // Backspace
    if (key === "Backspace") {

        if (hasError) {

            display.value = "";
            hasError = false;

        } else {

            display.value = display.value.slice(0, -1);

        }

        event.preventDefault();
        return;

    }

    // Allowed keys
    const allowedKeys = "0123456789+-*/().";

    if (allowedKeys.includes(key)) {

        if (hasError) {

            display.value = "";
            hasError = false;

        }

        display.value += key;

        event.preventDefault();

    }

});