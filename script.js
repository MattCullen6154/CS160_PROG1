const distanceInput = document.getElementById("distance");
const calculateButton = document.getElementById("calculate");
const modeButtons = document.querySelectorAll(".mode-option");
let selectedMode = null;

const transportation = {
    walking: {
        speed: 3.1,
        range: 30,
        container: document.getElementById("time_walking_container"),
        output: document.getElementById("time_walking")
    },
    evolve: {
        speed: 24,
        range: 31,
        container: document.getElementById("time_bike_container"),
        output: document.getElementById("time_evolve")
    },
    onewheel: {
        speed: 20,
        range: 32,
        container: document.getElementById("time_onewheel_container"),
        output: document.getElementById("time_onewheel")
    }, 
    razor: {
        speed: 18, 
        range: 15,
        container: document.getElementById("time_razor_container"),
        output: document.getElementById("time_razor")
    }
};

modeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const mode = button.dataset.mode;
        selectedMode = selectedMode === mode ? null : mode;

        modeButtons.forEach(function (option) {
            option.setAttribute("aria-pressed", option.dataset.mode === selectedMode);
        });
    });
});

distanceInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        calculateButton.click();
    }
});

function calculateTravelTime(distance, mode) {
    const speed = transportation[mode].speed;
    const range = transportation[mode].range;
    const container = transportation[mode].container;
    const output = transportation[mode].output;
    container.hidden = false;
    output.classList.remove("exceeds-range");

    if (distance <= range) {
        const time = distance / speed;
        const hours = Math.floor(time);
        const minutes = Math.round((time - hours) * 60);
        if (hours < 1) {
            output.value = `${minutes} minutes`;
        }
        else {
            output.value = `${hours} hours and ${minutes} minutes`;
        }
    }
    else {
        output.value = "Distance exceeds range";
        output.classList.add("exceeds-range");
    }
}

calculateButton.addEventListener("click",function () {
    const distance = parseFloat(distanceInput.value);
    if (isNaN(distance) || distance <= 0) {
        alert("Please enter a valid distance.");
        return;
    }

    const modesToCalculate = selectedMode ? [selectedMode] : Object.keys(transportation);

    for (const mode in transportation) {
        if (modesToCalculate.includes(mode)) {
            calculateTravelTime(distance, mode);
        }
        else {
            transportation[mode].container.hidden = true;
        }
    }
});
