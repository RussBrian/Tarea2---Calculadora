const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const historyList = document.querySelector("#history-list");
const btnClear = document.querySelector("#btn-clear-history");

let history = JSON.parse(localStorage.getItem("history")) || [];

function updateHistory(operation) {
    history.push(operation);
    localStorage.setItem("history", JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";
    history.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

btnClear.addEventListener("click", () => {
    history = [];
    localStorage.setItem("history", JSON.stringify(history));
    renderHistory();
});

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.id === "=") {
            try {
                if (display.value.includes("/0")) {
                    display.value = "NoDivideZero";
                } else {
                    const result = eval(display.value);
                    updateHistory(`${display.value} = ${result}`);
                    display.value = result;
                }
            } catch (error) {
                display.value = "Error";
            }
        } else if (btn.id === "ac") {
            display.value = "";
        } else if (btn.id === "de") {
            display.value = display.value.slice(0, -1);
        } else if (btn.id !== "btn-clear-history") {
            display.value += btn.id;
        }
    });
});

renderHistory();