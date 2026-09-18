const distanceInput = document.getElementById("distance");
const calculateButton = document.getElementById("calculate");

const transportation = {
    walking: {
        speed: 3.1,
        range: 30,
        output: document.getElementById("time_walking")
    },
    evolve: {
        speed: 24,
        range: 31,
        output: document.getElementById("time_evolve")
    },
    onewheel: {
        speed: 20,
        range: 32,
        output: document.getElementById("time_onewheel")
    }, 
    razor: {
        speed: 18, 
        range: 15,
        output: document.getElementById("time_razor")
    }
};

calculateButton.addEventListener("click",function () {
    const distance = parseFloat(distanceInput.value);
    if (isNaN(distance) || distance <= 0) {
        alert("Please enter a valid distance.");
        return;
    }

    for (const mode in transportation) {
        const speed = transportation[mode].speed;
        const range = transportation[mode].range;
        const output = transportation[mode].output;

        if (distance <= range) {
            const time = distance / speed;
            const hours = Math.floor(time);
            const minutes = Math.round((time - hours) * 60);
            output.value = `${hours} hours and ${minutes} minutes`;
        }
        else {
            output.value = "Distance exceeds range";
        }
    }
});