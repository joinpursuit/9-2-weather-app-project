const base_url = "https://wttr.in/";
const in_json = "?format=j1";
const locationValue = document.getElementById("enter-location");
const currentWeather = document.getElementById("current-weather");

const form = document.querySelector("form");
const article = document.querySelector("article");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchLocation = locationValue.value;

  const url = `${base_url}${searchLocation}${in_json}`;
  form.reset();

  fetch(url)
    .then((response) => response.json())
    .then((weatherData) => {
      getWeather(weatherData, searchLocation),
        threeDays(weatherData),
        searchHistory(weatherData, searchLocation);
    })
    .catch((error) => {
      console.log(error);
    });
});

function getWeather(weatherData, searchLocation) {
  article.innerHTML = " ";

  const location = document.createElement("h2");
  location.textContent += `${searchLocation}`;

  const img = document.createElement("img");

  const nearest = document.createElement("p");
  const nearestName = weatherData.nearest_area[0].areaName[0].value;
  nearest.textContent = "Nearest Area: " + nearestName;

  const region = document.createElement("p");
  const regionName = weatherData.nearest_area[0].region[0].value;
  region.textContent = "Region: " + regionName;

  const country = document.createElement("p");
  const countryName = weatherData.nearest_area[0].country[0].value;
  country.textContent = "Country: " + countryName;

  const temp = document.createElement("p");
  const tempFeels = weatherData.current_condition[0].FeelsLikeF;
  temp.textContent = "Currently: " + tempFeels + "°";

  const sunshine = document.createElement("p");
  const sunChance = weatherData.weather[0].hourly[0].chanceofsunshine;
  sunshine.textContent = "Chance of Sunshine: " + sunChance;

  const rain = document.createElement("p");
  const rainChance = weatherData.weather[0].hourly[0].chanceofrain;
  rain.textContent = "Chance of Rain: " + rainChance;

  const snow = document.createElement("p");
  const snowChance = weatherData.weather[0].hourly[0].chanceofsnow;
  snow.textContent = "Chance of Snow: " + snowChance;

  if (Number(sunChance) > 50) {
    img.setAttribute("alt", "sun");
    img.setAttribute("src", "./assets/icons8-summer.gif");
  }
  if (Number(rainChance) > 50) {
    img.setAttribute("alt", "rain");
    img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
  }
  if (Number(snowChance) > 50) {
    img.setAttribute("alt", "snow");
    img.setAttribute("src", "./assets/icons8-light-snow.gif");
  }

  article.append(
    location,
    img,
    nearest,
    region,
    country,
    temp,
    sunshine,
    rain,
    snow
  );
}

function threeDays(weatherData) {
  const today = document.getElementById("today");
  const tomorrow = document.getElementById("tomorrow");
  const dayAfter = document.getElementById("day-after");

  today.innerHTML = "<strong>Today</strong>";
  tomorrow.innerHTML = "<strong>Tomorrow</strong>";
  dayAfter.innerHTML = "<strong>Day After Tomorrow</strong>";

  const avgTemp0 = weatherData.weather[0].avgtempF;
  const temp_Avg0 = document.createElement("p");
  temp_Avg0.textContent = `Average Temperature: ${avgTemp0}℉`;

  const avgTemp1 = weatherData.weather[1].avgtempF;
  const temp_Avg1 = document.createElement("p");
  temp_Avg1.textContent = `Average Temperature: ${avgTemp1}℉`;

  const avgTemp2 = weatherData.weather[2].avgtempF;
  const temp_Avg2 = document.createElement("p");
  temp_Avg2.textContent = `Average Temperature: ${avgTemp2}℉`;

  const tempMax0 = weatherData.weather[0].maxtempF;
  const max_temp0 = document.createElement("p");
  max_temp0.textContent = `Max Temperature: ${tempMax0}℉`;

  const tempMax1 = weatherData.weather[1].maxtempF;
  const max_temp1 = document.createElement("p");
  max_temp1.textContent = `Max Temperature: ${tempMax1}℉`;

  const tempMax2 = weatherData.weather[2].maxtempF;
  const max_temp2 = document.createElement("p");
  max_temp2.textContent = `Max Temperature: ${tempMax2}℉`;

  const tempMin0 = weatherData.weather[0].mintempF;
  const min_temp0 = document.createElement("p");
  min_temp0.textContent = `Min Temperature: ${tempMin0}℉`;

  const tempMin1 = weatherData.weather[1].mintempF;
  const min_temp1 = document.createElement("p");
  min_temp1.textContent = `Min Temperature: ${tempMin1}℉`;

  const tempMin2 = weatherData.weather[2].mintempF;
  const min_temp2 = document.createElement("p");
  min_temp2.textContent = `Min Temperature: ${tempMin2}℉`;

  today.append(temp_Avg0, max_temp0, min_temp0);
  tomorrow.append(temp_Avg1, max_temp1, min_temp1);
  dayAfter.append(temp_Avg2, max_temp2, min_temp2);
}
