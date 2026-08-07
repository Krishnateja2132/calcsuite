const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

buttons.forEach(button => {

    button.addEventListener("click", async () => {

        const value = button.innerText;

        if (value === "=") {

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

            return;
        }

        if (value === "C") {

            display.value = "";

            return;
        }

        display.value += value;

    });

});