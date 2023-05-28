"use strict";

// selecting elements
const input = document.querySelector(".app__search--input");
const searchBtn = document.querySelector(".app__search__btn--search-icon");
const weather = document.querySelector(".app__main");

const weatherImg = document.querySelector(".app__main__weather--icon");
const weatherTemp = document.querySelector(".app__main__weather--temp");
const weatherName = document.querySelector(".app__main__weather--name");
const sunriseTime = document.querySelector(".app__main__sunrise--time");
const sunsetTime = document.querySelector(".app__main__sunset--time");

const errorContainer = document.querySelector(".app__error");
const errorImg = document.querySelector(".app__error--img");
const errorMessage = document.querySelector(".app__error--text");

// main app
class App {
    constructor() {
        this.#getUserLocation();
        window.addEventListener("beforeunload", this.#clearInput);

        // call api by given name
        // searchBtn.addEventListener("click", this.#displayData);
        searchBtn.addEventListener("click", this.#apiCallByCity);
    }

    #clearInput() {
        input.value = "";
    }

    #locationRejectError() {
        alert(
            "You blocked your location, please click allow or input city name manually"
        );
    }

    #displayError(errorMsg) {
        errorContainer.style.marginTop = "5rem";
        errorContainer.style.height = "30rem";

        setTimeout(() => {
            errorContainer.style.opacity = 1;
            errorContainer.style.visibility = "visible";
        }, 200);

        // errorMessage.value = errorMsg;
        errorMessage.innerText = errorMsg;
    }

    #callApiByLatLng = async function (lat, lng) {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=721a956f72738d6959dce2e545fb8d44&units=metric`
            );

            // all error cases
            // if (!res.ok) {
            //     throw new Error(
            //         "Unable to reach your coords, please try again"
            //     );
            // }

            if (res.status === 400) {
                throw new Error("400 error");
            }

            if (res.status === 401) {
                throw new Error("401 error");
            }

            if (res.status === 403) {
                throw new Error("403 error");
            }

            if (res.status === 404) {
                throw new Error("404 error");
            }

            const data = await res.json();
            weatherApp.#displayData(data);
        } catch (err) {
            console.log(`💥💥${err.message}💥💥`);
            weatherApp.#displayError(err.message);
        }
    };

    #getUserLatLng(position) {
        // get users lat and lng
        // const lat = 752985982112212;
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // make api call with that
        weatherApp.#callApiByLatLng(lat, lng);
    }

    #getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // user accepts -> get location
                this.#getUserLatLng,

                // user rejects permission -> display info about that
                this.#locationRejectError
            );
        }
    }

    #apiCallByCity = async function () {
        errorContainer.style.marginTop = "0rem";
        errorContainer.style.height = "0rem";
        errorContainer.style.opacity = "0";
        errorContainer.style.visibility = "hidden";

        weather.style.marginTop = "0rem";
        weather.style.height = "0rem";
        weather.style.opacity = 0;
        weather.style.visibility = "hidden";
        // some error that input is empty
        if (input.value === "") return;

        try {
            const res = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=5&appid=721a956f72738d6959dce2e545fb8d44`
            );

            // custom errors
            if (!res.ok) {
                if (res.status === 400) {
                    throw new Error("400 error");
                }

                if (res.status === 401) {
                    throw new Error("401 error");
                }

                if (res.status === 403) {
                    throw new Error("403 error");
                }

                if (res.status === 404) {
                    throw new Error("404 error");
                }
            }

            const data = await res.json();

            // check if city exists
            if (data.length === 0) {
                weatherApp.#displayError("Couldn't find your city");
                return;
            }

            const inputLat = data[0].lat;
            const inputLng = data[0].lon;
            weatherApp.#callApiByLatLng(inputLat, inputLng);
        } catch (err) {
            console.error(`💥💥${err.message}💥💥`);
            weatherApp.#displayError(err.message);
        }
    };

    #displayData(data) {
        // errorContainer.style.display = "none";

        // city doesn't exist -> display info about that
        // if (input.value !== data.name) {
        //     alert("Looks like you misspeled city name, please try again");
        // }

        // city exists -> display data for current coords
        input.value = data.name;

        weather.style.marginTop = "5rem";
        weather.style.height = "50rem";
        setTimeout(() => {
            weather.style.opacity = 1;
            weather.style.visibility = "visible";
        }, 200);

        weatherTemp.innerText = `${Math.trunc(data.main.temp)}℃`;
        weatherName.innerText = data.weather[0].description;

        const sunriseUnix = data.sys.sunrise;
        const sunriseUnixDate = new Date(sunriseUnix * 1000);
        const sunriseTimeVal = sunriseUnixDate.toLocaleTimeString("it-IT");
        sunriseTime.innerText = sunriseTimeVal.slice(0, 5);

        const sunsetUnix = data.sys.sunset;
        const sunsetUnixDate = new Date(sunsetUnix * 1000);
        const sunsetTimeVal = sunsetUnixDate.toLocaleTimeString("it-IT");
        sunsetTime.innerText = sunsetTimeVal.slice(0, 5);

        const nowUnix = new Date().getTime();
        const nowUnixDate = new Date(nowUnix);
        const nowTimeVal = nowUnixDate.toLocaleTimeString("it-IT");

        // day img
        if (nowTimeVal <= sunsetTimeVal && nowTimeVal >= sunriseTimeVal) {
            if (data.weather[0].description === "clear sky") {
                weatherImg.src = "/svg/clear sky DAY.svg";
            }
        }

        // night img
        if (nowTimeVal >= sunsetTimeVal && nowTimeVal <= sunriseTimeVal) {
            if (data.weather[0].description === "clear sky") {
                weatherImg.src = "/svg/clear sky NIGHT.svg";
            }
        }
    }
}

const weatherApp = new App();
