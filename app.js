// const btn = document.querySelector("button");

// btn.addEventListener("click", function () {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((currentPosistion) => {
//             const lat = currentPosistion.coords.latitude;
//             const lng = currentPosistion.coords.longitude;

//             const coords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=721a956f72738d6959dce2e545fb8d44`;

//             fetch(coords)
//                 .then((data) => data.json())
//                 .then((json) => {
//                     console.log(json);
//                 });
//         });
//     }
// });

const btnNew = document.querySelector(".spk");
const cityName = "warsaw";

btnNew.addEventListener("click", function () {
    fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=721a956f72738d6959dce2e545fb8d44`
    )
        .then((data) => data.json())
        .then((json) => {
            console.log(json[0]);
        });
});

// ask user for location permission

// if not, user can input manually

// if city not found display error manually

// display sunrise, sunset, weather, cityname
