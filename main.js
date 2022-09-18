console.log("from main.js");

const form = document.querySelector("form.search-form");
const formInput = document.querySelector("form.search-form input#location");

const onSubmit = async (event) => {
  event.preventDefault();

  let location = formInput.value;

  console.log("this is our location", location);

  try {
    const result = await fetch(`https://wttr.in/${location}?format=j1`);

    const data = await result.json();

    const nearestAreaObject = data.nearest_area[0];
    const currentConditionObject = data.current_condition[0];
    const weatherObject = data.weather;

    const nearestArea = nearestAreaObject.areaName[0].value;

    const region = nearestArea.region[0].value;

    const country = nearestArea.country[0].value;

    const feelsLikeFahrenheit = currentConditionObject.FeelsLikeF;

    const weatherToday = weatherObject[0];

    const chanceOfSunshineToday = weatherToday.hourly[0].chanceofsunshine;

    const chanceOfRainToday = weatherToday.hourly[0].chanceofrain;

    const chanceOfSnowToday = weatherToday.hourly[0].chanceofsnow;

    const averageTempFahrenheitToday = weatherToday.avgtempF

    const maxTempFahrenheitToday = weatherToday.maxtempF

    const minTempFahrenheitToday = weatherToday.mintempF

    const weatherTomorrow = weatherObject[1];

    const weatherDayAfterTomorrow = weatherObject[3];

    console.log("this is our data from api", data);

    return data;
  } catch (error) {
    console.error("There was an error in onSubmit function", error);
  }
};

form.addEventListener("submit", onSubmit);
