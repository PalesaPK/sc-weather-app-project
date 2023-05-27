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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecastWeather = response.data.daily;

  forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecastWeather.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
           <div class="forecast-day">${formatDay(forecastDay.dt)}</div> 
            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              width="50"
            />
            <div class="forecast-temps">
           <span class="forecast-max-temp">${Math.round(
             forecastDay.temp.max
           )}°</span> 
           <span class="forecast-min-temp">${Math.round(
             forecastDay.temp.min
           )}°</span>
          </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  let description = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherIcon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  description.innerHTML = `${response.data.weather[0].description}`;
  h1.innerHTML = Math.round(celsiusTemperature);
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let cityName = document.querySelector("#city");
  let description = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherIcon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  h1.innerHTML = Math.round(celsiusTemperature);
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
