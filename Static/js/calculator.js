const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

// =========================
// Calculate Expression
// =========================
async function calculateExpression() {

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

    }
    else {

        display.value = data.error;

    }

}

// =========================
// Scientific Operations
// =========================
async function scientificOperation(operation) {

    if (display.value === "")
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

    }
    else {

        display.value = data.error;

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

                display.value = "";
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

                display.value += value;

        }

    });

});