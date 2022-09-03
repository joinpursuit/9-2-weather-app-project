const form = document.querySelector("form");
const article = document.querySelector("article");
const placeholder = document.querySelector("p.placeholder");
const previous = document.querySelector("p.previous");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  placeholder.style.setProperty("display", "none");
  previous.style.setProperty("display", "none");
  const userInput = event.target.userInput.value;
  const baseUrl = `https://wttr.in/${userInput}?format=j1`;
  form.reset();
  // console.log(baseUrl)
  // console.log(userInput)

  fetch(baseUrl)
    .then((response) => response.json())
    .then((weather) => {
      //set image. need to alternate image depending on data. need to set alt
      const img = document.createElement("img");
      img.setAttribute("src", "/assets/icons8-night.gif");
      // article.append(img);

      //this gives the city of the search
      const city = weather.nearest_area[0].areaName[0].value;
      const h2 = document.createElement("h2");
      h2.textContent = city;
      // article.append(h2);

      //this will display the nearest area if the city doesn't match the users input
      const area = document.createElement("p");
      if (city !== userInput) {
        area.innerHTML = "<strong>Nearest Area: </strong>" + city;
      } else {
        area.innerHTML = "<strong>Area: </strong>" + city;
      }
      // article.append(area);
      // console.log(city);

      const ul = document.querySelector("ul");
      const li = document.createElement("li");
      ul.append(li);
      //should reload to same page
      const a = document.createElement("a");
      a.setAttribute("href", baseUrl);
      // a.setAttribute("target", "_blank");
      a.textContent = city;
      li.after(a);
      // li.textContent = city;

      //this gives the country of the search
      const country = weather.nearest_area[0].country[0].value;
      const pcountry = document.createElement("span");
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
        "<strong>Chance of Sunshine: </strong>" + chanceOfSunshsine;
      // console.log(chanceOfSunshsine);

      //chance of rain
      const chanceOfRain = weather.weather[0].hourly[0].chanceofrain;
      const rainy = document.createElement("p");
      rainy.innerHTML = "<strong>Chance of Rain: </strong>" + chanceOfRain;

      //chance of snow
      const chanceOfSnow = weather.weather[0].hourly[0].chanceofsnow;
      const snowy = document.createElement("p");
      snowy.innerHTML = "<strong>Chance of Snow: </strong>" + chanceOfSnow;
      // console.log(chanceOfRain);
      // console.log(chanceOfSnow);
      article.append(
        img,
        h2,
        area,
        pregion,
        pcountry,
        pfeels,
        sunny,
        rainy,
        snowy
      );

      // See detailed information for the current day and the next two days below the `main` element.
      const artToday = document.querySelector("article.today");
      //todays weather
      const todayWeather = weather.weather[0].avgtempF;
      const todayMax = weather.weather[0].maxtempF;
      const todayMin = weather.weather[0].mintempF;
      const today = document.createElement("h2");
      today.textContent = `Today `;
      
      // artToday.append(todayWeather, todayMax, todayMin)
      // ${todayWeather}
      // ${todayMax}
      // ${todayMin}

      //tomorrows weather
      const artTomorrow = document.querySelector("article.tomorrow");
      const tomorrowWeather = weather.weather[0].avgtempF;
      const tomorrowMax = weather.weather[0].maxtempF;
      const tomorrowMin = weather.weather[0].mintempF;
      const tomorrow = document.createElement("h2");
      tomorrow.textContent = "Tomorrow";
      artTomorrow.append(tomorrow, tomorrowWeather, tomorrowMax, tomorrowMin);
      

      //day after weather
      const artDay_after = document.querySelector("article.day_after");
      const day_afterWeather = weather.weather[0].avgtempF;
      const day_afterMax = weather.weather[0].maxtempF;
      const day_afterMin = weather.weather[0].mintempF;
      const day_after = document.createElement("h2");
      day_after.textContent = "Day After Tomorrow";
      artDay_after.append(day_after, day_afterWeather, day_afterMax, day_afterMin);

      
      // console.log(todayMin);
      // console.log(tomorrowMin);
      // console.log(day_afterMin);
    })
    .catch((error) => {
      console.log(error);
    });
});

// console.log(current_condition[0]);
// console.log("------");
// console.log(weather[0]);
// switch (temp) {
//   case "F":
//     document.querySelector(".testing").innerText =
//       nearest_area[0].country[0].value;
// }
// console.log(weather[0]);
// console.log("------");
// console.log(nearest_area[0]);
// console.log(nearest_area[0].country[0]);
// console.log(nearest_area[0].region[0]);
// console.log(nearest_area[0].areaName[0]);
// console.log(current_condition[0]);
// console.log(current_condition[0].weatherDesc[0].value);
// const threeDay = weather.forEach((day) => console.log(day));
// console.log(threeDay[0]);
// console.log(threeDay[1]);
// console.log(threeDay[2]);

//   .catch((error) => {
//     // You can do what you like with the error here.
//     console.log(error);
// });

// See the name of the city that was searched as well as
//the area,
//region,
//country, and
//currently "feels like" temperature for that location.

// function getWeather(weatherJSON)

