// selecting elements
const input = document.querySelector(".app__search--input");
const searchBtn = document.querySelector(".app__search__btn--search-icon");
const weather = document.querySelector(".app__main");

const weatherImg = document.querySelector(".app__main__weather--icon");
const weatherTemp = document.querySelector(".app__main__weather--temp");
const weatherName = document.querySelector(".app__main__weather--name");
const sunriseTime = document.querySelector(".app__main__sunrise--time");
const sunsetTime = document.querySelector(".app__main__sunset--time");
// app functionality
class App {
    constructor() {
        window.addEventListener("beforeunload", this.#reset);
        window.addEventListener("load", this.#getUserLocation);
        searchBtn.addEventListener("click", this._showWeather);
    }

    #reset() {
        input.value = "";
    }

    _showWeather() {
        if (input.value === "") return;

        weather.style.marginTop = "5rem";
        weather.style.height = "50rem";

        setTimeout(() => {
            weather.style.opacity = 1;
            weather.style.visibility = "visible";
        }, 200);
    }

    #getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((currentPosistion) => {
                const lat = currentPosistion.coords.latitude;
                const lng = currentPosistion.coords.longitude;

                const coords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=721a956f72738d6959dce2e545fb8d44&units=metric`;

                fetch(coords)
                    .then((json) => json.json())
                    .then((data) => {
                        console.log(data);
                        input.value = data.name;

                        // show weather function----------------------
                        weather.style.marginTop = "5rem";
                        weather.style.height = "50rem";
                        setTimeout(() => {
                            weather.style.opacity = 1;
                            weather.style.visibility = "visible";
                        }, 200);

                        // display data function ------------------

                        // weather temp
                        weatherTemp.innerText = `${Math.trunc(
                            data.main.temp
                        )}℃`;

                        // weather name
                        weatherName.innerText = data.weather[0].description;

                        // sunrise time
                        const sunriseUnix = data.sys.sunrise;
                        const sunriseUnixDate = new Date(sunriseUnix * 1000);
                        const sunriseTimeVal =
                            sunriseUnixDate.toLocaleTimeString("it-IT");

                        sunriseTime.innerText = sunriseTimeVal.slice(0, 5);

                        // sunset time
                        const sunsetUnix = data.sys.sunset;
                        const sunsetUnixDate = new Date(sunsetUnix * 1000);
                        const sunsetTimeVal =
                            sunsetUnixDate.toLocaleTimeString("it-IT");

                        sunsetTime.innerText = sunsetTimeVal.slice(0, 5);

                        // weather img
                        const nowUnix = new Date().getTime();
                        const nowUnixDate = new Date(nowUnix);
                        const nowTimeVal =
                            nowUnixDate.toLocaleTimeString("it-IT");

                        // night img
                        if (
                            nowTimeVal >= sunsetTimeVal &&
                            nowTimeVal <= sunriseTimeVal
                        ) {
                            console.log("it's night");

                            if (data.weather[0].description === "") {
                                //
                            }
                        }

                        // day img
                        if (
                            nowTimeVal <= sunsetTimeVal &&
                            nowTimeVal >= sunriseTimeVal
                        ) {
                            console.log("it's day");

                            if (data.weather[0].description === "") {
                                //
                            }
                        }
                    });
            });
        }
    }
}

const weatherApp = new App();

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
