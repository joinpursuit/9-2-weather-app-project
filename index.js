const form = document.querySelector("form");
const article = document.querySelector("article");
const placeholder = document.querySelector("p.placeholder");
const previous = document.querySelector("p.previous");
const main = document.querySelector("main");
const form2 = document.querySelector(".widget");
const searches = document.querySelector(".searches");
const arrow = document.querySelectorAll("#arrow");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  placeholder.style.setProperty("display", "none");
  previous.style.setProperty("display", "none");
  form2.style.setProperty("visibility", "visible");
  main.style.setProperty("visibility", "visible");
  searches.style.setProperty("background-color", "rgb(211, 75, 139, 0.272)");
  searches.style.setProperty("color", "black");
  arrow[0].style.setProperty("color", "black");
  arrow[1].style.setProperty("color", "black");
  const userInput = event.target.userInput.value;
  const baseUrl = `https://wttr.in/${userInput}?format=j1`;
  form.reset();

  fetch(baseUrl)
    .then((response) => response.json())
    .then((weather) => {
      pullWeather(weather, userInput);
      previousData(weather, userInput);
    })
    .catch((error) => {
      console.log(error);
    });
});

//main function used to show all articles
function pullWeather(weather, userInput) {
  //this gives the city of the search
  const h2 = document.createElement("h2");
  h2.innerHTML = userInput;

  //this will display the nearest area if the city doesn't match the users input
  const area = document.createElement("p");
  if (
    weather.nearest_area[0].areaName[0].value.toLowerCase() ===
    userInput.toLowerCase()
  ) {
    area.innerHTML = `<strong>Area: </strong>
       ${weather.nearest_area[0].areaName[0].value}`;
  } else {
    area.innerHTML = `<strong>Nearest Area: </strong> ${weather.nearest_area[0].areaName[0].value}`;
  }

  //this gives the country of the search
  const country = document.createElement("p");
  country.innerHTML = `<strong>Country: </strong> ${weather.nearest_area[0].country[0].value}`;

  //this gives the region of the search
  const region = document.createElement("p");
  region.innerHTML = `<strong>Region: </strong> ${weather.nearest_area[0].region[0].value}`;

  //this gives the currently feels like temp of the search in F
  const feels = document.createElement("p");
  feels.innerHTML = `<strong>Currently: </strong> Feels Like 
     ${weather.current_condition[0].FeelsLikeF} °F`;

  //chance of sun
  const sunny = document.createElement("p");
  sunny.innerHTML = `<strong>Chance of Sunshine: </strong>
     ${weather.weather[0].hourly[0].chanceofsunshine}%`;

  //chance of rain
  const rainy = document.createElement("p");
  rainy.innerHTML = `<strong>Chance of Rain: </strong>
     ${weather.weather[0].hourly[0].chanceofrain}%`;

  //chance of snow
  const snowy = document.createElement("p");
  snowy.innerHTML = `<strong>Chance of Snow: </strong>
     ${weather.weather[0].hourly[0].chanceofsnow}%`;

  //change from sun or rain or snow and change background
  const img = document.createElement("img");
  img.src = "./assets/200w.gif";
  img.alt = "nice day";

  if (Number(weather.weather[0].hourly[0].chanceofsunshine) > 50) {
    img.src = "./assets/icons8-summer.gif";
    img.alt = "sun";
  }
  if (Number(weather.weather[0].hourly[0].chanceofrain) > 50) {
    img.src = "./assets/icons8-torrential-rain.gif";
    img.alt = "rain";
  }
  if (Number(weather.weather[0].hourly[0].chanceofsnow) > 50) {
    img.src = "./assets/icons8-light-snow.gif";
    img.alt = "snow";
  }

  article.innerHTML = "";
  article.append(img, h2, area, region, country, feels, sunny, rainy, snowy);

  //todays weather
  const artToday = document.querySelector("article.today");
  const today = document.createElement("h2");
  const todayWeather = document.createElement("p");
  const todayMax = document.createElement("p");
  const todayMin = document.createElement("p");
  const todayDate = document.createElement("p");

  today.innerHTML = "<strong>Today</strong>";
  todayWeather.innerHTML = `<strong>Average<br> Temperature: </strong> <br>
    ${weather.weather[0].avgtempF} °F 
    <i class="fa-solid fa-temperature-half"></i>`;

  todayMax.innerHTML = `<strong>Max<br> Temperature: </strong></br>
    ${weather.weather[0].maxtempF} °F
    <i class="fa-solid fa-temperature-arrow-up"></i>`;

  todayMin.innerHTML = `<strong>Min<br> Temperature: </strong> </br> 
    ${weather.weather[0].mintempF} °F 
    <i class="fa-solid fa-temperature-arrow-down"></i>`;

  todayDate.innerHTML = `<strong>Date: </strong> ${weather.weather[0].date}`;

  artToday.innerHTML = "";
  artToday.append(today, todayDate, todayWeather, todayMax, todayMin);

  //tomorrows weather
  const artTomorrow = document.querySelector("article.tomorrow");
  const tomorrow = document.createElement("h2");
  const tomorrowWeather = document.createElement("p");
  const tomorrowMax = document.createElement("p");
  const tomorrowMin = document.createElement("p");
  const tommorowDate = document.createElement("p");

  tomorrow.innerHTML = "<strong>Tomorrow</strong>";
  tomorrowWeather.innerHTML = `<strong>Average<br> Temperature: </strong><br>
    ${weather.weather[1].avgtempF} °F 
    <i class="fa-solid fa-temperature-half"></i>`;

  tomorrowMax.innerHTML = `<strong>Max<br> Temperature: </strong></br>
    ${weather.weather[1].maxtempF} °F 
    <i class="fa-solid fa-temperature-arrow-up"></i>`;

  tomorrowMin.innerHTML = `<strong>Min<br> Temperature: </strong></br>
    ${weather.weather[1].mintempF} °F 
    <i class="fa-solid fa-temperature-arrow-down"></i>`;

  tommorowDate.innerHTML = `<strong>Date: </strong> ${weather.weather[1].date}`;

  artTomorrow.innerHTML = "";
  artTomorrow.append(
    tomorrow,
    tommorowDate,
    tomorrowWeather,
    tomorrowMax,
    tomorrowMin
  );

  //day after weather
  const artDay_after = document.querySelector("article.day_after");
  const day_after = document.createElement("h2");
  const day_afterWeather = document.createElement("p");
  const day_afterMax = document.createElement("p");
  const day_afterMin = document.createElement("p");
  const day_afterDate = document.createElement("p");

  day_after.innerHTML = "<strong>Day After Tomorrow</strong>";
  day_afterWeather.innerHTML = `<strong>Average<br> Temperature: </strong><br>
    ${weather.weather[2].avgtempF} °F 
    <i class="fa-solid fa-temperature-half"></i>`;

  day_afterMax.innerHTML = `<strong>Max<br> Temperature: </strong></br>
    ${weather.weather[2].maxtempF} °F 
    <i class="fa-solid fa-temperature-arrow-up"></i>`;

  day_afterMin.innerHTML = `<strong>Min<br> Temperature: </strong></br>
    ${weather.weather[2].mintempF} °F 
    <i class="fa-solid fa-temperature-arrow-down"></i>`;

  day_afterDate.innerHTML = `<strong>Date: </strong> ${weather.weather[2].date}`;

  artDay_after.innerHTML = "";
  artDay_after.append(
    day_after,
    day_afterDate,
    day_afterWeather,
    day_afterMax,
    day_afterMin
  );
}

//function for previous searches
function previousData(weather, userInput) {
  const li = document.createElement("li");
  document.querySelector("ul").append(li);
  const a = document.createElement("a");
  a.addEventListener("click", (_) => {
    pullWeather(weather, userInput);
  });
  a.setAttribute("href", "#");
  a.classList.add("a");
  a.innerHTML = weather.nearest_area[0].areaName[0].value;
  const aTemp = document.createElement("p");
  aTemp.textContent = ` -  ${weather.current_condition[0].FeelsLikeF} °F`;
  li.append(a, aTemp);
}

//temp converter
form2.addEventListener("submit", (event) => {
  event.preventDefault();
  if (document.querySelector("#to-c").checked) {
    document.querySelector("#temp-conv").textContent =
      ((event.target.conversion.value - 32) / 1.8).toFixed(2) + " °C";
  } else {
    document.querySelector("#temp-conv").textContent =
      (event.target.conversion.value * 1.8 + 32).toFixed(2) + " °F";
  }
  form2.reset();
});
