const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", handleSearchSubmit);
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
    displayResult(weatherData);
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

function displayResult(result) {
  const { nearest_area, current_condition } = result;
  const markup = `
                  <h2>${nearest_area[0].areaName[0].value}</h2>
                  <p><strong>Area:</strong> ${nearest_area[0].areaName[0].value}</p>
                  <p><strong>Region:</strong> ${nearest_area[0].region[0].value}</p>
                  <p><strong>Country:</strong> ${nearest_area[0].country[0].value}</p>
                  <p><strong>Currently:</strong> Feels like ${current_condition[0].FeelsLikeF}&deg;F</p>
                `;

  const placeHolderTxt = document.querySelector(".placeholder-text");
  placeHolderTxt.remove();

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
