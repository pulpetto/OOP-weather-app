// selecting elements

// app functionality
class App {
    constructor() {
        window.addEventListener("load", this.#getUserLocation);
    }

    #getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((currentPosistion) => {
                const lat = currentPosistion.coords.latitude;
                const lng = currentPosistion.coords.longitude;

                const coords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=721a956f72738d6959dce2e545fb8d44`;

                fetch(coords)
                    .then((json) => json.json())
                    .then((data) => {
                        console.log(data.name);
                    });
            });
        }
    }
}

const weatherApp = new App();

const qrde = document.querySelector(".app__search__btn--search-icon");
const ap = document.querySelector(".app__main");
qrde.addEventListener("click", function () {
    ap.style.marginTop = "5rem";
    ap.style.height = "50rem";

    setTimeout(() => {
        ap.style.opacity = 1;
        ap.style.visibility = "visible";
    }, 200);
});

// ---------------------------------------------------------//
// ask user for location permission

// if not, user can input manually

// if city not found display error manually

// display sunrise, sunset, weather, cityname

// ---------------- check it later --------------------- //
// const btnNew = document.querySelector(".spk");
// const cityName = "warsaw";

// btnNew.addEventListener("click", function () {
//     fetch(
//         `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=721a956f72738d6959dce2e545fb8d44`
//     )
//         .then((data) => data.json())
//         .then((json) => {
//             console.log(json[0]);
//         });
// });
