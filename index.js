const searchForm = document.getElementById("search-form");
const converter = document.getElementById("converter")

searchForm.addEventListener("submit", handleSearchSubmit);
converter.addEventListener("submit", handleConverter)
loadPrevSearches();
eventListener();

function handleSearchSubmit(e) {
  e.preventDefault();
  const inputValue = document.getElementById("city");
  initiateSearch(inputValue.value);
  inputValue.value = "";
}

async function initiateSearch(city) {
  try {
    const weatherData = await getData(city);
    displayResult(city, weatherData);
    displayUpcomingResults(weatherData.weather);
    const tmp = weatherData.current_condition[0].FeelsLikeF;
    setSearchHistory(city, `${tmp}&deg;F`);
  } catch (err) {
    console.error(err);
  }
}

async function getData(city) {
  const url = `http://wttr.in/${city}?format=j1`;
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
  const cloud = current_condition[0].cloudcover;
  const snow = weather[0].totalSnow_cm;
  const rain = current_condition[0].precipMM;
  let icon = { value: "icons8-summer.gif", alt: "sun" };

  if (cloud < 50) {
    icon = { value: "icons8-summer.gif", alt: "sun" };
  } else if (rain > 50) {
    icon = { value: "icons8-torrential-rain.gif", alt: "rain" };
  } else if (snow > 50) {
    icon = { value: "icons8-light-snow.gif", alt: "snow" };
  }

  const markup = `
                  <img src="/assets/${icon.value}" alt="${icon.alt}" />
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
                  <p><strong>Chance of Sunshine:</strong>${100 - cloud}</p>
                  <p><strong>Chance of Rain:</strong>${rain}</p>
                  <p><strong>Chance of Snow:</strong>${snow}</p>
                `;

  const placeHolderTxt = document.querySelector(".placeholder-text");
  placeHolderTxt?.remove();

  const activeWeather = document.querySelector(".active-weather");
  activeWeather.innerHTML = markup;
}

function displayUpcomingResults(weather) {
  const articles = Array.from(document.querySelectorAll(".upcoming > article"));
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
  const prevSearches = JSON.parse(localStorage.getItem("searchHistory")) || [];
  prevSearches.push({ city, temp });
  localStorage.setItem("searchHistory", JSON.stringify(prevSearches));
  loadPrevSearches();
}

function loadPrevSearches() {
  const prevSearches = JSON.parse(localStorage.getItem("searchHistory"));
  if (!prevSearches) return;

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
  initiateSearch(city);
}


function handleConverter(e) {
  e.preventDefault();
  const input = document.getElementById("temp-to-convert");
  const units = document.getElementsByName("convert-temp");
  const selectedUnited = Array.from(units).find(unit => unit.checked)
  let result = "";
  if (selectedUnited.value === "c") {
      result = (((input.value - 32) * 5) / 9).toFixed(1);
  } else if (selectedUnited.value === "f") {
      result = ((9 * input.value) / 5 + 32).toFixed(1)
  }

  const resultEl = document.querySelector(".tmp-convert-result");
  resultEl.textContent = result;

  console.log(resultEl, result);
}