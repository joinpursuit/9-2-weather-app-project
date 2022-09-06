const searchForm = document.getElementById("search-form");
const activeWeather = document.querySelector(".active-weather");
const upcoming = document.querySelector(".upcoming");
const articles = Array.from(document.querySelectorAll(".upcoming > article"));
const converter = document.getElementById("converter");
const prevSearches = [];

searchForm.addEventListener("submit", handleSearchSubmit);
converter.addEventListener("submit", handleConverter);

loadPrevSearches();
eventListener();

function handleSearchSubmit(e) {
  e.preventDefault();
  const inputValue = document.getElementById("city");
  initiateSearch(inputValue.value);
  inputValue.value = "";
}

async function initiateSearch(city, ref = "search") {
  activeWeather.innerHTML = `loading...`;

  if (upcoming.classList.contains("active"))
    upcoming.classList.remove("active");

  for (const article of articles) {
    article.innerHTML = "";
  }

  try {
    const weatherData = await getData(city);
    displayResult(city, weatherData);
    displayUpcomingResults(weatherData.weather);
    if (ref === "link") return;

    const tmp = weatherData.current_condition[0].FeelsLikeF;
    setSearchHistory(city, `${tmp}&deg;F`);
  } catch (err) {
    console.error(err);
  }
}

async function getData(city) {
  const url = `https://wttr.in/${city}?format=j1`;
  try {
    const res = await fetch(url);
    const resJson = await res.json();
    return resJson;
  } catch (err) {
    console.error(err);
  }
}

function displayResult(city, result) {
  const { nearest_area, current_condition, weather } = result;
  const near = nearest_area[0].areaName[0].value;
  const area = city === near ? "Area" : "Nearest Area";

  const hour = 0;
  const hourly = weather[0].hourly[hour];

  const sunshine = hourly.chanceofsunshine;
  const snow = hourly.chanceofsnow;
  const rain = hourly.chanceofrain;

  let icon;

  if (parseInt(sunshine) > 50) {
    icon = { value: "icons8-summer.gif", alt: "sun" };
  } else if (parseInt(rain) > 50) {
    icon = { value: "icons8-torrential-rain.gif", alt: "rain" };
  } else if (parseInt(snow) > 50) {
    icon = { value: "icons8-light-snow.gif", alt: "snow" };
  }

  const iconStr =
    icon && `<img src="./assets/${icon.value}" alt="${icon.alt}" />`;
  const markup = `
                  ${iconStr || ""}
                  <h2>${city}</h2>
                  <p><strong>${area}:</strong> ${near}</p>
                  <p><strong>Region:</strong> ${
                    nearest_area[0].region[0].value
                  }</p>
                  <p><strong>Country:</strong> ${
                    nearest_area[0].country[0].value
                  }</p>
                  <p><strong>Currently:</strong> Feels like ${
                    current_condition[0].FeelsLikeF
                  }&deg;F</p>
                  <p><strong>Chance of Sunshine:</strong>${sunshine}</p>
                  <p><strong>Chance of Rain:</strong>${rain}</p>
                  <p><strong>Chance of Snow:</strong>${snow}</p>
                `;

  const placeHolderTxt = document.querySelector(".placeholder-text");
  placeHolderTxt?.remove();

  activeWeather.innerHTML = markup;
}

function displayUpcomingResults(weather) {
  if (!upcoming.classList.contains("active")) {
    upcoming.classList.add("active");
  }

  const days = ["Today", "Tomorrow", "Day After Tomorrow"];

  for (const [index, item] of weather.entries()) {
    const markup = `
    <h3>${days[index]}</h3>
    <p><strong>Average Temperature:</strong> ${item.avgtempF}&deg;F</p>
    <p><strong>Max Temperature:</strong> ${item.maxtempF}&deg;F</p>
    <p><strong>Min Temperature:</strong> ${item.mintempF}&deg;F</p>
  `;

    articles[index].innerHTML = markup;
  }
}

function setSearchHistory(city, temp) {
  if (!prevSearches.find((search) => search.city === city)) {
    prevSearches.push({ city, temp });
  }
  loadPrevSearches();
}



function loadPrevSearches() {
  if (!prevSearches.length) return;

  let markup = "";
  for (const item of prevSearches) {
    markup += `<li><a href="#" onclick="clickHandler">${item.city}</a> - ${item.temp}</li>`;
  }
  const listContainer = document.querySelector(".right-aside ul");
  listContainer.innerHTML = markup;
}

function eventListener() {
  const prevSearches = document.querySelector(".right-aside ul");
  prevSearches.addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const city = e.target.textContent;
  initiateSearch(city, "link");
}

function handleConverter(e) {
  e.preventDefault();
  const input = document.getElementById("temp-to-convert");
  const units = document.getElementsByName("convert-temp");
  const selectedUnited = Array.from(units).find((unit) => unit.checked);
  let result = "";
  if (selectedUnited.value === "c") {
    result = (((input.value - 32) * 5) / 9).toFixed(2);
  } else if (selectedUnited.value === "f") {
    result = ((9 * input.value) / 5 + 32).toFixed(2);
  }

  const resultEl = document.querySelector(".tmp-convert-result");
  resultEl.textContent = result;
}
