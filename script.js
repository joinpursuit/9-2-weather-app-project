const BASE_URL = "https://wttr.in/";
const form = document.querySelector("form");
const main = document.querySelector("main");
const displayWeather = document.querySelector("#display-weather");
const right = document.querySelector(".right-history");
const forecastEl = document.querySelector(".forecast");
const searchHistory = document.querySelector(".search-history");
const noHistory = document.querySelector(".no-history");
const leftForm = document.querySelector(".left-aside form");
const convertedResult = document.querySelector(".left-aside .result");
const loader = document.querySelector("#loader");
const cache = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (noHistory) {
    noHistory.remove();
  }

  loader.classList.add("hide");
  const input = formatInput(e.target.location.value);
  form.reset();
  const url = generateURL(BASE_URL, input);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      saveSearch(data, input);
      addToMain(data, input);
      addForecast(data);
    })
    .catch(console.log);
});

function formatInput(location) {
  return location
    .trim()
    .split(" ")
    .map((word) => word[0] + word.slice(1).toLowerCase())
    .join(" ");
}

function generateURL(base, location) {
  location = location.trim();
  location = location.replaceAll(" ", "+");
  return (base += location + "?format=j1");
}

function getGeoInfo(obj) {
  const area = obj.areaName[0].value;
  const region = obj.region[0].value;
  const country = obj.country[0].value;
  return { area, region, country };
}

function addToMain(data, input) {
  const { area, region, country } = getGeoInfo(data.nearest_area[0]);
  let nearest = "Area";
  if (input !== area) {
    nearest = "Nearest Area";
  }
  const feelsLikeF =
    "Feels like " + data.current_condition[0]["FeelsLikeF"] + " °F";

  const { chanceofrain, chanceofsnow, chanceofsunshine } =
    data.weather[0].hourly[0];

  let icon = "";
  if (chanceofsunshine > 50) {
    icon = "<img src='./assets/icons8-summer.gif' alt='sun' class='logo'/>";
  } else if (chanceofrain > 50) {
    icon =
      "<img src='./assets/icons8-torrential-rain.gif' alt='rain' class='logo'/>";
  } else if (chanceofsnow > 50) {
    icon =
      "<img src='./assets/icons8-light-snow.gif' alt='snow' class='logo'/>";
  }

  displayWeather.innerHTML = `
      ${icon}
      <h2>${input}</h2>
      <p>${nearest}: ${area}</p>
      <p>Region: ${region}</p>
      <p>Country: ${country}</p>
      <p>Currently: ${feelsLikeF}</p>
      <p>Chance of Sunshine: ${chanceofsunshine} </p>
      <p>Chance of Rain: ${chanceofrain}</p>
      <p>Chance of Snow: ${chanceofsnow}</p>
      `;
}

function getForecast(data) {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    const { avgtempF, mintempF, maxtempF } = data.weather[i];
    arr.push({ avgtempF, mintempF, maxtempF });
  }
  return arr;
}

function addForecast(data) {
  forecastEl.classList.remove("hide");
  const threeDays = ["Today", "Tomorrow", "Day after Tomorrow"];
  const threeDayData = getForecast(data);

  for (let i = 0; i < 3; i++) {
    let html = `
          <h4>${threeDays[i]}</h4>
          <p><strong>Average Temperature: </strong> ${threeDayData[i].avgtempF} °F</p>
          <p><strong>Min Temperature: </strong> ${threeDayData[i].mintempF} °F</p>
          <p><strong>Max Temperature: </strong> ${threeDayData[i].maxtempF} °F</p>
    `;

    forecastEl.children[i].innerHTML = html;
  }
}

function saveSearch(data, input) {
  const feelsLikeF =
    " Feels like " + data.current_condition[0]["FeelsLikeF"] + " °F";
  cache.push(data);
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.textContent = input;
  a.addEventListener("click", (e) => {
    addToMain(data, input);
    addForecast(data);
  });
  li.textContent = feelsLikeF;
  li.prepend(a);
  searchHistory.append(li);
}

// left aside temperature conversion
leftForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = e.target.input.value;
  const toConvert = e.target.toconvert.value;
  if (toConvert == "c") {
    input = ((input - 32) * 5) / 9;
  } else {
    input = (input * 9) / 5 + 32;
  }
  convertedResult.textContent = +input.toFixed(2).toString();
  e.target.input.value = "";
});
