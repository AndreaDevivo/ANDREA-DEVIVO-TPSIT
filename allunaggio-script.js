let fuel = 100;
let velocity = 0;
let altitude = 1000;
let thrust = 0;
let gravity = 1;

const fuelElement = document.getElementById('fuel');
const velocityElement = document.getElementById('velocity');
const altitudeElement = document.getElementById('altitude');
const thrustUpButton = document.getElementById('thrust-up');
const thrustDownButton = document.getElementById('thrust-down');

thrustUpButton.addEventListener('click', () => {
    thrust += 10;
    if (thrust > 100) thrust = 100;
});

thrustDownButton.addEventListener('click', () => {
    thrust -= 10;
    if (thrust < 0) thrust = 0;
});

setInterval(() => {
    velocity += gravity - (thrust / 10);
    altitude -= velocity;
    fuel -= thrust / 100;

    if (fuel <= 0) fuel = 0;
    if (altitude <= 0) {
        altitude = 0;
        if (velocity > 5) {
            alert('Atterraggio fallito!');
        } else {
            alert('Atterraggio riuscito!');
        }
    }

    fuelElement.textContent = `Carburante: ${fuel.toFixed(2)}%`;
    velocityElement.textContent = `Velocità: ${velocity.toFixed(2)} m/s`;
    altitudeElement.textContent = `Altitudine: ${altitude.toFixed(2)} m`;
}, 1000);

