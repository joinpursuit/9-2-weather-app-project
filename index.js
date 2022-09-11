const main = document.querySelector("main");
const form = document.querySelector("form");
const noSearches = document.querySelector(".no_searches");
const chooseLocation = document.querySelector(".choose_location");

// temp converter
const form2 = document.querySelector(".widget");
form2.addEventListener("submit", (event) => {
  event.preventDefault();
  noSearches.style.setProperty("display", "none");
  chooseLocation.style.setProperty("display", "none");
  const valNum = event.target.conversion.value;
  //   console.log(valNum);

  const celsius = document.querySelector("#to-c");
  const fahrenheit = document.querySelector("#to-f");
  const h4 = document.querySelector("#temp-conv");

  if (celsius.checked) {
    const ctof = (valNum - 32) / 1.8;
    // console.log(ctof);
    h4.textContent = ctof.toFixed(2);
  }
  if (fahrenheit.checked) {
    const ftoc = valNum * 1.8 + 32;
    // console.log(ftoc);
    h4.textContent = ftoc.toFixed(2);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = event.target.cityPick.value;
  const urlWeatherAPI = `https://wttr.in/${userInput}?format=j1`;
  form.reset();

  fetch(urlWeatherAPI)
    .then((response) => response.json())
    .then((json) => {
      allData(json, userInput);
      previousData(json);
    })
    .catch((error) => {
      console.log(error);
    });
});

function allData(json, userInput) {
  const area = json.nearest_area[0].areaName[0].value;
  const region = json.nearest_area[0].region[0].value;
  const country = json.nearest_area[0].country[0].value;
  const feelsLikeF = json.current_condition[0].FeelsLikeF;
  const chanceOfSun = json.weather[0].hourly[0].chanceofsunshine;
  const chanceOfRain = json.weather[0].hourly[0].chanceofrain;
  const chanceOfSnow = json.weather[0].hourly[0].chanceofsnow;

  const article = document.querySelector("article");
  const pArea = document.createElement("p");
  const pregion = document.createElement("p");
  const pcountry = document.createElement("p");
  const pfeelsLikeF = document.createElement("p");
  const pchanceOfSun = document.createElement("p");
  const pchanceOfRain = document.createElement("p");
  const pchanceOfSnow = document.createElement("p");

  // if statement to show the Area if there is one or Nearest Area if not.
  if (area === userInput) {
    pArea.innerHTML = "<strong>Area: </strong>" + area;
  } else {
    pArea.innerHTML = "<strong>Nearest Area: </strong>" + area;
  }

  pregion.innerHTML = "<strong>Region: </strong>" + region;
  pcountry.innerHTML = "<strong>Country: </strong>" + country;
  pfeelsLikeF.innerHTML =
    "<strong>Currently: </strong>" + "Feels Like " + feelsLikeF + "°F";
  pchanceOfSun.innerHTML =
    "<strong>Chance of Sunshine: </strong>" + chanceOfSun + "%";
  pchanceOfRain.innerHTML =
    "<strong>Chance of Rain: </strong>" + chanceOfRain + "%";
  pchanceOfSnow.innerHTML =
    "<strong>Chance of Snow: </strong>" + chanceOfSnow + "%";

  const h2 = document.createElement("h2");
  h2.textContent = userInput;

  article.innerHTML = " ";

  article.append(
    h2,
    pArea,
    pregion,
    pcountry,
    pfeelsLikeF,
    pchanceOfSun,
    pchanceOfRain,
    pchanceOfSnow
  );

  // 3 day forecast variables below:
  // Today
  // today average Temp
  const today = document.createElement("h2");
  today.innerHTML = "<strong>Today</strong>";

  const todayAvgT = json.weather[0].avgtempF;
  const todayAvgTVar = document.createElement("p");
  todayAvgTVar.innerHTML =
    "<strong>Average Temperature: </strong>" + todayAvgT + "°F";
  //today Max Temp
  const todayMaxT = json.weather[0].maxtempF;
  const todayMaxTVar = document.createElement("p");
  todayMaxTVar.innerHTML =
    "<strong>Maximum Temperature: </strong>" + todayMaxT + "°F";
  //today Min Temp
  const todayMinT = json.weather[0].mintempF;
  const todayMinTVar = document.createElement("p");
  todayMinTVar.innerHTML =
    "<strong>Minimum Temperature: </strong>" + todayMinT + "°F";
  document.querySelector(".today").innerHTML = "";
  // appended variables for Today Forecast
  document
    .querySelector(".today")
    .append(today, todayAvgTVar, todayMaxTVar, todayMinTVar);

  //Tomorrow
  const tomorrow = document.createElement("h2");
  tomorrow.innerHTML = "<strong>Tomorrow</strong>";
  // tomorrows avgerage Temp
  const tomorrowAvgT = json.weather[1].avgtempF;
  const tomAvgTVar = document.createElement("p");
  tomAvgTVar.innerHTML =
    "<strong>Average Temperature: </strong>" + tomorrowAvgT + "°F";
  // tomorrows Max Temp
  const tomorrowMaxT = json.weather[1].maxtempF;
  const tomMaxTVar = document.createElement("p");
  tomMaxTVar.innerHTML =
    "<strong>Maximum Temperature: </strong>" + tomorrowMaxT + "°F";
  // tomorrows Min Temp
  const tomorrowMinT = json.weather[1].mintempF;
  const tomMinTVar = document.createElement("p");
  tomMinTVar.innerHTML =
    "<strong>Minimum Temperature: </strong>" + tomorrowMinT + "°F";
  document.querySelector(".tomorrow").innerHTML = "";
  // appended variables for tomorrow
  document
    .querySelector(".tomorrow")
    .append(tomorrow, tomAvgTVar, tomMaxTVar, tomMinTVar);

  //Day After Tomorrow
  const afterTomorrow = document.createElement("h2");
  afterTomorrow.innerHTML = "<strong>Day After Tomorrow</strong>";
  // Day After Avg Temp
  const dayAfterAvgT = json.weather[2].avgtempF;
  const dayAfterAvgTVar = document.createElement("p");
  dayAfterAvgTVar.innerHTML =
    "<strong>Average Temperature: </strong>" + dayAfterAvgT + "°F";
  // Day After Max Temp
  const dayAfterMaxT = json.weather[2].maxtempF;
  const dayAfterMaxTVar = document.createElement("p");
  dayAfterMaxTVar.innerHTML =
    "<strong>Maximum Temperature: </strong>" + dayAfterMaxT + "°F";
  // Day After Min Temp
  const dayAfterMinT = json.weather[2].mintempF;
  const dayAfterMinTVar = document.createElement("p");
  dayAfterMinTVar.innerHTML =
    "<strong>Minimum Temperature: </strong>" + dayAfterMinT + "°F";
  document.querySelector(".day_after").innerHTML = "";
  // appended variables for after tomorrow
  document
    .querySelector(".day_after")
    .append(afterTomorrow, dayAfterAvgTVar, dayAfterMaxTVar, dayAfterMinTVar);

  // add icons based on chance data
  const myAppImg = document.createElement("img");
  //icon for sun
  article.prepend(myAppImg);
  if (Number(chanceOfSun) > 50) {
    myAppImg.setAttribute("alt", "sun");
    myAppImg.setAttribute("src", "./assets/icons8-summer.gif");
  } //icon for rain
  if (Number(chanceOfRain) > 50) {
    myAppImg.setAttribute("alt", "rain");
    myAppImg.setAttribute("src", "./assets/icons8-torrential-rain.gif");
  } //icon for snow
  if (Number(chanceOfSnow) > 50) {
    myAppImg.setAttribute("alt", "snow");
    myAppImg.setAttribute("src", "./assets/icons8-light-snow.gif");
  }
  console.log(chanceOfSun);
  // console.log(city);
  // console.log(country);
  // console.log(region)
}

function previousData(json) {
  const history = document.querySelector("ul");
  const historyLi = document.createElement("li");
  history.append(historyLi);

  const historyPTag = document.createElement("p");
  historyPTag.textContent = "- " + json.current_condition[0].FeelsLikeF + "°F";

  const linkForHistory = document.createElement("a");
  linkForHistory.setAttribute("href", "#");
  historyLi.append(linkForHistory, historyPTag);

  linkForHistory.innerHTML = json.nearest_area[0].areaName[0].value;

  linkForHistory.addEventListener("click", () => {
    allData(json);
  });
}
