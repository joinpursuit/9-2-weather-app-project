const form = document.querySelector("form");
const article = document.querySelector("article");
const placeholder = document.querySelector("p.placeholder");
const previous = document.querySelector("p.previous");
const header = document.querySelector("header");
const main = document.querySelector("main");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  placeholder.style.setProperty("display", "none");
  previous.style.setProperty("display", "none");
  const userInput = event.target.userInput.value;
  // console.log(userInput)
  const baseUrl = `https://wttr.in/${userInput}?format=j1`;
  form.reset();
  // console.log(baseUrl)
  // console.log(userInput)

  fetch(baseUrl)
    .then((response) => response.json())
    .then((weather) => {
      pullWeather(weather);

      // See detailed information for the current day and the next two days below the `main` element.
      const artToday = document.querySelector("article.today");
      //todays weather
      const todayWeather = weather.weather[0].avgtempF;
      const todayMax = weather.weather[0].maxtempF;
      const todayMin = weather.weather[0].mintempF;
      const today = document.createElement("h2");
      const ptodayWeather = document.createElement("p");
      const ptodayMax = document.createElement("p");
      const ptodayMin = document.createElement("p");
      today.innerHTML = "<strong>Today</strong>";
      ptodayWeather.innerHTML =
        "<strong>Average<br> Temperature: </strong>" +
        "<br>" +
        todayWeather +
        "°F";
      ptodayMax.innerHTML =
        "<strong>Max<br> Temperature: </strong>" + "</br>" + todayMax + "°F";
      ptodayMin.innerHTML =
        "<strong>Min<br> Temperature: </strong>" + "</br>" + todayMin + "°F";
      artToday.append(today, ptodayWeather, ptodayMax, ptodayMin);

      // artToday.append(todayWeather, todayMax, todayMin)
      // ${todayWeather}
      // ${todayMax}
      // ${todayMin}

      //tomorrows weather
      const artTomorrow = document.querySelector("article.tomorrow");
      const tomorrowWeather = weather.weather[1].avgtempF;
      const tomorrowMax = weather.weather[1].maxtempF;
      const tomorrowMin = weather.weather[1].mintempF;
      const tomorrow = document.createElement("h2");
      const ptomorrowWeather = document.createElement("p");
      const ptomorrowMax = document.createElement("p");
      const ptomorrowMin = document.createElement("p");
      tomorrow.innerHTML = "<strong>Tomorrow</strong>";
      ptomorrowWeather.innerHTML =
        "<strong>Average<br> Temperature: </strong>" +
        "<br>" +
        tomorrowWeather +
        "°F";
      ptomorrowMax.innerHTML =
        "<strong>Max<br> Temperature: </strong>" +
        "</br> " +
        tomorrowMax +
        "°F";
      ptomorrowMin.innerHTML =
        "<strong>Min<br> Temperature: </strong>" + "</br>" + tomorrowMin + "°F";

      artTomorrow.append(
        tomorrow,
        ptomorrowWeather,
        ptomorrowMax,
        ptomorrowMin
      );

      //day after weather
      const artDay_after = document.querySelector("article.day_after");
      const day_afterWeather = weather.weather[2].avgtempF;
      const day_afterMax = weather.weather[2].maxtempF;
      const day_afterMin = weather.weather[2].mintempF;
      const day_after = document.createElement("h2");
      const pday_afterWeather = document.createElement("p");
      const pday_afterMax = document.createElement("p");
      const pday_afterMin = document.createElement("p");

      day_after.innerHTML = "<strong>Day After Tomorrow</strong>";
      pday_afterWeather.innerHTML =
        "<strong>Average<br> Temperature: </strong>" +
        "<br>" +
        day_afterWeather +
        "°F";
      pday_afterMax.innerHTML =
        "<strong>Max<br> Temperature: </strong>" +
        "</br> " +
        day_afterMax +
        "°F";
      pday_afterMin.innerHTML =
        "<strong>Min<br> Temperature: </strong>" +
        "</br>" +
        day_afterMin +
        "°F";

      artDay_after.append(
        day_after,
        pday_afterWeather,
        pday_afterMax,
        pday_afterMin
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

function pullWeather(weather) {
  //this gives the city of the search
  const city = weather.nearest_area[0].areaName[0].value;
  const h2 = document.createElement("h2");
  h2.textContent = city;

  //this will display the nearest area if the city doesn't match the users input
  const area = document.createElement("p");
  if (city !== userInput) {
    area.innerHTML = "<strong>Nearest Area: </strong>" + city;
  } else {
    area.innerHTML = "<strong>Area: </strong>" + city;
  }

  //this gives the country of the search
  const country = weather.nearest_area[0].country[0].value;
  const pcountry = document.createElement("p");
  pcountry.innerHTML = "<strong>Country: </strong>" + country;

  //this gives the region of the search
  const region = weather.nearest_area[0].region[0].value;
  const pregion = document.createElement("p");
  pregion.innerHTML = "<strong>Region: </strong>" + region;

  //this gives the currently feels like temp of the search in F
  const feelsLikeF = weather.current_condition[0].FeelsLikeF;
  const pfeels = document.createElement("p");
  pfeels.innerHTML =
    "<strong>Currently: </strong>" + "Feels Like " + feelsLikeF + "°F";

  //chance of sun
  const chanceOfSunshsine = weather.weather[0].hourly[0].chanceofsunshine;
  const sunny = document.createElement("p");
  sunny.innerHTML =
    "<strong>Chance of Sunshine: </strong>" + chanceOfSunshsine + "%";
  // console.log(chanceOfSunshsine);

  //chance of rain
  const chanceOfRain = weather.weather[0].hourly[0].chanceofrain;
  const rainy = document.createElement("p");
  rainy.innerHTML = "<strong>Chance of Rain: </strong>" + chanceOfRain + "%";

  //chance of snow
  const chanceOfSnow = weather.weather[0].hourly[0].chanceofsnow;
  const snowy = document.createElement("p");
  snowy.innerHTML = "<strong>Chance of Snow: </strong>" + chanceOfSnow + "%";
  // console.log(chanceOfRain);
  // console.log(chanceOfSnow);

  //the weather icon should change depending on this info
  //  - if there is more than a 50% chance of sunshine, show the `summer` icon with `alt` text `sun`
  //  - if there is more than a 50% chance of rain, show the `torrential-rain` icon with `alt` text `rain`
  //  - if there is more than a 50% chance of snow, show the `light-snow` icon with `alt` text `snow`

  //test is not changing from sun to rain or snow
  const img = document.createElement("img");

  if (Number(chanceOfSunshsine) > 50) {
    img.src = "./assets/icons8-summer.gif";
    img.alt = "sun";
  }
  if (Number(chanceOfRain) > 50) {
    img.src = "./assets/icons8-torrential-rain.gif";
    img.alt = "rain";
  }
  if (Number(chanceOfSnow) > 50) {
    img.src =  "./assets/icons8-light-snow.gif";
    img.alt = "snow";
  }

  //       console.log(chanceOfSunshsine)

  //       console.log(typeof chanceOfSunshsine)
  // console.log(Number(chanceOfSunshsine))

  //previous section
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  ul.append(li);
  //should reload to same page
  const a = document.createElement("a");
  a.setAttribute("href", "");
  // a.setAttribute("target", "_blank");
  a.innerHTML = city;
  const aTemp = document.createElement("p");
  aTemp.textContent = " - " + feelsLikeF + "°F";
  li.after(a, aTemp);
  // li.textContent = city;

  //style article
  // article.style.border.

  article.append(img, h2, area, pregion, pcountry, pfeels, sunny, rainy, snowy);
}

//temp converter working
const form2 = document.querySelector(".widget");
form2.addEventListener("submit", (event) => {
  event.preventDefault();
  const valNum = event.target.conversion.value;
  console.log(valNum);

  const celsius = document.querySelector("#to-c");
  const fahrenheit = document.querySelector("#to-f");
  const h4 = document.querySelector("#temp-conv");

      if (celsius.checked) {
        const ctof = (valNum - 32) / 1.8
        console.log(ctof)
    h4.textContent = ctof.toFixed(2)
  }
      if (fahrenheit.checked) {
        const ftoc = (valNum * 1.8) + 32
        console.log(ftoc)
        h4.textContent = ftoc.toFixed(2)
      }
});
