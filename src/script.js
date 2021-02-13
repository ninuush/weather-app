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

// form

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  temperatureElement.innerHTML = Math.round
  (response.data.main.temp);
  cityElement.innterHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windspeedElement.innerHTML = `Windspeed: ${Math.round(response.data.wind.speed)} km/h`
}

let apiKey = "8bc187cbfbf86ab7d6f8399ce1d178ae";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Naters&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);