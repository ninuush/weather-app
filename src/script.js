// time

let time = document.querySelector("#time");

let now = new Date();
let hours = now.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

time.innerHTML = `${day}, ${hours}:${minutes}`;

function formatHours(timestamp) {
let now = new Date(timestamp);
let hours = now.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
}
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round
  (celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windspeedElement.innerHTML = `Windspeed: ${Math.round(response.data.wind.speed)} km/h`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
                <div class="col">
                    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                    alt=""
                    />
                    <br />
                    ${formatHours(forecast.dt * 1000)}
                    <br />
                    ${Math.round(forecast.main.temp_max)}° | ${Math.round(forecast.main.temp_min)}°
                </div>`;
  }

}

function search(city) {
  let apiKey = "8bc187cbfbf86ab7d6f8399ce1d178ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#text-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Naters");
