const BASE_URL = "https://wttr.in/";
const form = document.querySelector("form");
const main = document.querySelector("main");
const displayWeather = document.querySelector("#display-weather");
const right = document.querySelector(".right-history");
const forecastEl = document.querySelector(".forecast");
const searchHistory = document.querySelector(".search-history");
const noHistory = document.querySelector(".no-history");
const cache = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (noHistory) {
    noHistory.remove();
  }

  const input = formatInput(e.target.location.value);
  form.reset();
  const url = generateURL(BASE_URL, input);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      saveSearch(data, input);
      addToMain(data, input);
      addForecast(data);
      //   addToHistory();
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

  displayWeather.innerHTML = `
      <h2>${input}</h2>
      <p>${nearest}: ${area}</p>
      <p>Region: ${region}</p>
      <p>Country: ${country}</p>
      <p>Currently: ${feelsLikeF}</p>
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
