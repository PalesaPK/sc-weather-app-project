let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = weekDays[now.getDay()];

let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let city = document.querySelector("#city");

  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);

  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
  } else {
    city.innerHTML = null;
    alert("Please enter a city");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  let description = document.querySelector(".fair");
  let secondTemperature = document.querySelector(".temperature");
  let minimumTemperature = document.querySelector("#min-temp");
  let feelTemp = document.querySelector("#feels-like");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherIcon = document.querySelector("#icon");
  description.innerHTML = `${response.data.weather[0].description}`;
  h1.innerHTML = Math.round(`${response.data.main.temp}`);
  secondTemperature.innerHTML = Math.round(`${response.data.main.temp_max}`);
  minimumTemperature.innerHTML = Math.round(`${response.data.main.temp_min}`);
  feelTemp.innerHTML = Math.round(`${response.data.main.feels_like}`);
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//function convertToFahrenheit(event) {
// event.preventDefault();
// let h1 = document.querySelector("h1");
//h1.innerHTML = `79`;
//}

//let fahrenheit = document.querySelector("#fahrenheit-unit");
//fahrenheit.addEventListener("click", convertToFahrenheit);

//function convertToCelsius(event) {
//event.preventDefault();
//let h1 = document.querySelector("h1");
//h1.innerHTML = `26`;
//}

//let celsius = document.querySelector("#celsius-unit");
//celsius.addEventListener("click", convertToCelsius);

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let secondTemperature = document.querySelector(".temperature");
  let minimumTemperature = document.querySelector("#min-temp");
  let feelTemp = document.querySelector("#feels-like");
  let cityName = document.querySelector("#city");
  let description = document.querySelector(".fair");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherIcon = document.querySelector("#icon");
  h1.innerHTML = Math.round(`${response.data.main.temp}`);
  secondTemperature.innerHTML = Math.round(`${response.data.main.temp_max}`);
  minimumTemperature.innerHTML = Math.round(`${response.data.main.temp_min}`);
  feelTemp.innerHTML = Math.round(`${response.data.main.feels_like}`);
  cityName.innerHTML = `${response.data.name}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showPosition(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiKey2 = "311f1f45fee82242ab4086372ab360f5";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey2}&units=metric`;
  axios.get(apiUrl2).then(showWeather);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", showCurrentLocation);
