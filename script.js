const BASE_URL = "https://wttr.in/";
const form = document.querySelector("form");
const main = document.querySelector("main");
const displayWeather = document.querySelector("#display-weather");
const right = document.querySelector(".right-history");
const forecastEl = document.querySelector(".forecast");
const daysEl = document.querySelectorAll(".forecast article");
const today = document.querySelector("#today");
const tomorrow = document.querySelector("#tomorrow");
const dayAfterTom = document.querySelector("#day-after-tomorrow");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = e.target.location.value;
  form.reset();

  const url = generateURL(BASE_URL, location);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      addToMain(data);
      addForecast(data);
    })
    .catch(console.log);
});

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

function addToMain(data) {
  const { area, region, country } = getGeoInfo(data.nearest_area[0]);
  const feelsLikeF =
    "Feels like " + data.current_condition[0]["FeelsLikeF"] + " °F";

  displayWeather.innerHTML = `
      <h3>${area}</h3>
      <p><strong>Area:</strong> ${area}</p>
      <p><strong>Region:</strong> ${region}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Currently:</strong> ${feelsLikeF}</p>
      `;
}

function getForecast(data) {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    const { avgtempF, mintempF, maxtempF } = data.weather[i];
    arr.push({ avgtempF, mintempF, maxtempF });
  }
  console.log(arr);
  return arr;
}

function addForecast(data) {
  forecastEl.classList.remove("hide");
  const threeDays = ["Today", "Tomorrow", "Day after Tomorrow"];
  const stats = [
    "Average Temperature: ",
    "Min Temperature: ",
    "Max Temperature: ",
  ];

  const threeDayData = getForecast(data);

  for (let i = 0; i < 3; i++) {
    let html = `
        <article>   
          <h4>${threeDays[i]}</h4>
          <p><strong>Average Temperature: </strong> ${threeDayData[i].avgtempF} °F</p>
          <p><strong>Min Temperature: </strong> ${threeDayData[i].mintempF} °F</p>
          <p><strong>Max Temperature: </strong> ${threeDayData[i].maxtempF} °F</p>
        </article>
    `;
    daysEl[i].innerHTML = html;
  }
}
