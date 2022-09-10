/* Add event listener to search bar */
const form = document.querySelector("form");
const format = "?format=j1";
const base_url = "https://wttr.in/";

// build html
const h2 = document.createElement("h2");
const p1 = document.createElement("p");
const p2 = document.createElement("p");
const p3 = document.createElement("p");
const p4 = document.createElement("p");
const mainArticle = document.querySelector("main article");

// array of objects?
const searches = [];

function getWeatherData() {}

function fetchWeatherData() {}

function getForecast(weatherInfo) {
  const array = [];
  for (let i = 0; i < 3; i++) {}
}

form.addEventListener("submit", (event) => {
  // Create 3 sections below main section to show information for the next few days
  // add link to the search to the sidebar (ul -> li)
  event.preventDefault();

  const city = event.target.search.value; // to get value inputted
  fetch(base_url + city + format)
    .then((response) => response.json())
    // Now population main -> article with info
    .then((weatherInfo) => {
      const areaName = weatherInfo.nearest_area[0].areaName[0].value;

      if (areaName === city) {
        p1.innerHTML = "<strong>Area: </strong>" + areaName;
        h2.innerText = areaName;
      } else {
        p1.innerHTML = "<strong>Nearest Area: </strong>" + areaName;
        h2.innerText = city;
      }
      const region = weatherInfo.nearest_area[0].region[0].value;
      p2.innerHTML = "<strong>Region: </strong>" + region;
      mainArticle.append(h2, p1, p2, p3, p4);
      const country = weatherInfo.nearest_area[0].country[0].value;
      p3.innerHTML = "<strong>Country: </strong>" + country;
      const feelsLikeF = weatherInfo.current_condition[0].FeelsLikeF;
      p4.innerHTML =
        "<strong>Currently:</strong> Feels Like " + feelsLikeF + "degF";

      // Add chance of sunshine, rain, and snow to main article
      // Get weather key value which is an array of objects, go into first array obj
      const { chanceofrain, chanceofsunshine, chanceofsnow } =
        weatherInfo.weather[0].hourly[0];

      const pRain = document.createElement("p");
      const pSunshine = document.createElement("p");
      const pSnow = document.createElement("p");

      pSunshine.innerHTML =
        "<strong>Chance of Sunshine: </strong>" + chanceofsunshine;
      pRain.innerHTML = "<strong>Chance of Rain: </strong>" + chanceofrain;
      pSnow.innerHTML = "<strong>Chance of Snow: </strong>" + chanceofsnow;
      mainArticle.append(pSunshine, pRain, pSnow);

      // Prepend an icon based on weather logic
      const img = document.createElement("img");
      if (chanceofsunshine > 50) {
        // display summer icon
        // img = '<img src="./assets/icons8-summer.gif" alt="sun" />';
        img.setAttribute("src", "./assets/icons8-summer.gif");
        img.setAttribute("alt", "sun");
      } else if (chanceofrain > 50) {
        // img = '<img src="./assets/icons8-torrential-rain.gif" alt="rain" />';
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        img.setAttribute("alt", "rain");
      } else if (chanceofsnow > 50) {
        // img = '<img src="./assets/icons8-light-snow.gif" alt="snow" />';
        img.setAttribute("src", "./assets/icons8-light-snow.gif");
        img.setAttribute("alt", "snow");
      }
      mainArticle.prepend(img);

      // Add 3 article elements under main aside to get today, tomorrow, etc data
      const article1 = document.createElement("article");
      const article2 = document.createElement("article");
      const article3 = document.createElement("article");
      function addDaysInfo(article, dayName, dayNum) {
        const h3 = document.createElement("h3");
        h3.innerText = dayName;
        const p5 = document.createElement("p");
        const p6 = document.createElement("p");
        const p7 = document.createElement("p");

        const avgTemp = weatherInfo.weather[dayNum].avgtempF;
        p5.innerHTML =
          "<strong>Average Temperature: </strong>" + avgTemp + "degF";
        const maxTemp = weatherInfo.weather[dayNum].maxtempF;
        p6.innerHTML =
          "<strong>Average Temperature: </strong>" + maxTemp + "degF";
        const minTemp = weatherInfo.weather[dayNum].mintempF;
        p7.innerHTML =
          "<strong>Average Temperature: </strong>" + minTemp + "degF";

        article.append(h3, p5, p6, p7);
        // append article to main aside
        const mainAside = document.querySelector("main aside");
        mainAside.append(article);
      }
      // do for reach to increment 0 to 1 to 2 for each different day
      addDaysInfo(article1, "Today", 0);
      addDaysInfo(article2, "Tomorrow", 1);
      addDaysInfo(article3, "Day After Tomorrow", 2);

      // add to previous searches list
      const previousSearchList = document.querySelector(".previous-searches");
      const newLi = document.createElement("li");
      previousSearchList.append(newLi);
      // newLi.innerText = `${areaName} - ${feelsLikeF} degF`
      const a = document.createElement("a");
      a.setAttribute("href", "#");
      a.innerText = areaName;
      newLi.append(a);
      newLi.innerHTML += ` - ${feelsLikeF} degF`;
      previousSearchList.append(newLi);

      a.addEventListener("click", (click) => {
        click.preventDefault();
        // reload page with this data
        h2.innerText = areaName;
        p1.innerHTML = "<strong>Area: </strong>" + areaName;
        p2.innerHTML = "<strong>Region: </strong>" + region;
        p3.innerHTML = "<strong>Country: </strong>" + country;
        p4.innerHTML =
          "<strong>Currently:</strong> Feels Like " + feelsLikeF + "degF";
      });

      // remove no previous searches from ul - does not work
      //   document.querySelector(".hide").setAttribute("style", "display: none");

      // make inputted text disappear
      event.target.search.value = "";

      // Make an array to hold the data to the reload the page
    })
    .catch(console.log);
});

// event listener for temp conversion widget
const tempConversionForm = document.querySelector("#tempConversionForm");
const h4 = document.createElement("h4");
tempConversionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get inputted number
  let temp = event.target["temp-to-convert"].value;

  // Convert to C
  console.log(event.target["convert-temp"].value);
  if (event.target["convert-temp"].value === "c") {
    let tempToC = (temp - 32) / 1.8;
    h4.innerText = tempToC.toFixed(2);
    console.log(`temp to C: ${tempToC}`);
  }
  // Convert to F
  else if (event.target["convert-temp"].value === "f") {
    let tempToF = temp * (9 / 5) + 32;
    h4.innerText = tempToF.toFixed(2);
    console.log(`temp to F: ${tempToF}`);
  }
  tempConversionForm.after(h4);
});
