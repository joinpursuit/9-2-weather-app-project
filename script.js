// url for my fetch
const BASE_URL = "https://wttr.in";

// grabbing my elements from my html
const searchForm = document.querySelector("form.event");
const convertForm = document.getElementById("convertForm");
const convertedTemp = document.getElementById("convertedTemp");
const locationInfo = document.getElementById("locationInfo");
const weatherToday = document.getElementById("weatherToday");
const weatherTomorrow = document.getElementById("weatherTomorrow");
const weatherDayAfter = document.getElementById("weatherDayAfter");
const displayPlaceHolder = document.getElementsByClassName(
  "display-placeholder"
)[0];
const previousSearchUl = document.getElementById("previousSearchUl");
const previousSearchP = document.getElementById("previousSearchP");
const input = document.querySelector("#location");
let locationSearch;

//-------------------------------------------------------------------------------------------------
// adding event listener when we submit
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  locationSearch = input.value;
  getWeatherSearch(locationSearch, true);
  input.value = "";
});

// ------------------------------------------------------------------------------------------------
// adding event listener to my conversion
convertForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const tempInput = document.getElementById("temp-to-convert");
  let value = tempInput.value;
  if (!value) {
    alert("Temperature value cannot be empty");
    return;
  }
  let radioToC = document.getElementById("to-c");
  let radioToF = document.getElementById("to-f");
  if (radioToC.checked) {
    let cel = (value - 32) * (5 / 9);
    cel = cel.toFixed(2);
    convertedTemp.innerText = cel + "°C";
  } else if (radioToF.checked) {
    let fah = (value * 9) / 5 + 32;
    fah = fah.toFixed(2);
    convertedTemp.innerText = fah + "°F";
  } else {
    alert("Select To Celsius or To Farenheit");
  }
});

// ------------------------------------------------------------------------------------------------
// function where fetch is being called
const getWeatherSearch = (locationSearch, createPrevSearch) => {
  let url = `${BASE_URL}/${locationSearch}?format=j1`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => parseNeededData(data, createPrevSearch))
    .catch((error) => console.log("Error: ", error));
};

// ------------------------------------------------------------------------------------------------
// function where i am manipulating the weather data for today, tomorrow and the day after
const parseNeededData = (jsonData, createPrevSearch) => {
  let avgTempKey = "avgtempF";
  let maxTempKey = "maxtempF";
  let minTempKey = "mintempF";
  let feelsLikeF = jsonData.current_condition[0].FeelsLikeF;
  let feelsLikeC = jsonData.current_condition[0].FeelsLikeC;
  let area = jsonData.nearest_area[0].areaName[0].value;
  let region = jsonData.nearest_area[0].region[0].value;
  let country = jsonData.nearest_area[0].country[0].value;

  let today = {
    avgTemp: jsonData.weather[0][avgTempKey],
    maxTemp: jsonData.weather[0][maxTempKey],
    minTemp: jsonData.weather[0][minTempKey],
  };
  let tomorrow = {
    avgTemp: jsonData.weather[1][avgTempKey],
    maxTemp: jsonData.weather[1][maxTempKey],
    minTemp: jsonData.weather[1][minTempKey],
  };
  let dayAfter = {
    avgTemp: jsonData.weather[2][avgTempKey],
    maxTemp: jsonData.weather[2][maxTempKey],
    minTemp: jsonData.weather[2][minTempKey],
  };
  let chanceOfRain = jsonData.weather[0].hourly[0].chanceofrain;
  let chanceOfSnow = jsonData.weather[0].hourly[0].chanceofsnow;
  let chanceOfSunshine = jsonData.weather[0].hourly[0].chanceofsunshine;

  // function that will update the html file
  updateHTML({
    feelsLikeF,
    feelsLikeC,
    area,
    region,
    country,
    today,
    tomorrow,
    dayAfter,
    chanceOfRain,
    chanceOfSnow,
    chanceOfSunshine,
    createPrevSearch,
  });
};


// function that will add our data given from the api to display for the user to see
const updateHTML = ({
  feelsLikeF,
  feelsLikeC,
  area,
  region,
  country,
  today,
  tomorrow,
  dayAfter,
  chanceOfRain,
  chanceOfSnow,
  chanceOfSunshine,
  createPrevSearch,
}) => {
  displayPlaceHolder.style.display = "none";
  locationInfo.style.display = "block";
  let notEqual = area.toLowerCase() !== locationSearch.toLowerCase();
  let locationInfoHTML = `
        ${addWeatherIcon(chanceOfRain, chanceOfSnow, chanceOfSunshine)}
        <h2>${locationSearch}</h2>
        ${createItem(notEqual ? "Nearest Area" : "Area", area)}
        ${createItem("Region", region)}
        ${createItem("Country", country)}
        ${createItem("Currently", `Feels Like ${feelsLikeF}°F`)}
        ${createItem("Chance of Sunshine", chanceOfSunshine + "%")}
        ${createItem("Chance of Rain", chanceOfRain + "%")}
        ${createItem("Chance of Snow", chanceOfSnow + "%")}
    `;
  locationInfo.innerHTML = locationInfoHTML;

  document.querySelector(".weather-info").style.display = "grid";
  let weatherTodayHTML = `
    <h3>Today</h3>
    ${createItem("Average Temperature", `${today.avgTemp}°F`)}
    ${createItem("Max Temperature", `${today.maxTemp}°F`)}
    ${createItem("Min Temperature", `${today.minTemp}°F`)}
  `;
  let weatherTomorrowHTML = `
    <h3>Tomorrow</h3>
    ${createItem("Average Temperature", `${tomorrow.avgTemp}°F`)}
    ${createItem("Max Temperature", `${tomorrow.maxTemp}°F`)}
    ${createItem("Min Temperature", `${tomorrow.minTemp}°F`)}
  `;
  let weatherDayAfterHTML = `
    <h3>Day After Tomorrow</h3>
    ${createItem("Average Temperature", `${dayAfter.avgTemp}°F`)}
    ${createItem("Max Temperature", `${dayAfter.maxTemp}°F`)}
    ${createItem("Min Temperature", `${dayAfter.minTemp}°F`)}
  `;
  weatherToday.innerHTML = weatherTodayHTML;
  weatherTomorrow.innerHTML = weatherTomorrowHTML;
  weatherDayAfter.innerHTML = weatherDayAfterHTML;

  previousSearchP.style.display = "none";
  if (createPrevSearch) {
    let prevSearchItem = document.createElement("li");

    prevSearchItem.addEventListener("click", () => {
      locationSearch = area;
      getWeatherSearch(area, false);
    });
    prevSearchItem.innerHTML = `<a class="link">${area}</a> - ${feelsLikeF}°F`;
    previousSearchUl.appendChild(prevSearchItem);
  }
};
// ------------------------------------------------------------------------------------------------
// function to make items that we will use for the display
const createItem = (key, value) => {
  return `<p class="item"><span class="head">${key}</span> : ${value}</p>`;
};
// ------------------------------------------------------------------------------------------------
// function to determine what forecast is more likely to happen
const addWeatherIcon = (rain, snow, sunshine) => {
  let maxValue = Math.max(rain, snow, sunshine);
  if (maxValue == sunshine)
    return '<img src="./assets/icons8-summer.gif" alt="sun" />';
  if (maxValue == rain)
    return '<img src="./assets/icons8-torrential-rain.gif" alt="rain" />';
  if (maxValue == snow)
    return '<img src="./assets/icons8-light-snow.gif" alt="snow" />';
};
