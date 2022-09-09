let sideBarTrigger = false; // yes, I really did just say 'I'm not even gonna figure out an elegant solution.  I just need this done.'
// also, is false when runWeather() is triggered via sidebar vs button
let previous = "";

document.getElementById("button").addEventListener("click", () => {
  event.preventDefault();
  let state = document.getElementById("userInput").value;
  let userTemp = document.querySelector(
    "input[type=radio][name=tempsel]:checked"
  ).value;

  if (previous !== state) {
    console.log(userTemp);
    runWeather(state, userTemp);
    sideBarTrigger = false;
    document.getElementById("weatherForm").reset();
    hideElements();
    previous = state;
  }
});

function prevItems() {
  document.querySelectorAll("a").forEach((item) => {
    item.addEventListener("click", () => {
      event.preventDefault();
      let place = item.getAttribute("href");
      let userTemp = document.querySelector(
        "input[type=radio][name=tempsel]:checked"
      ).value;
      sideBarTrigger = true;
      runWeather(place, userTemp);
    });
  });
}

const quikSel = (id, text) => (document.querySelector(id).innerText = text);

function runWeather(userInput, userTemp) {
  // Fetch wttr weather API.
  fetch(`https://wttr.in/${userInput}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
      // You can do what you like with the result here.
      getWeather(json, userTemp);
      prevItems();
    })
    .catch((error) => {
      // You can do what you like with the error here.
      console.log(error);
    });
}

function sideBar(callback, userTemp) {
  if (document.querySelector("#remove")) {
    document.querySelector("#remove").remove();
  }
  const basic = document.querySelector("ul");
  const newItem = document.createElement("li");
  const newLink = document.createElement("a");
  newLink.setAttribute("href", callback.name);
  newItem.append(newLink);
  newLink.innerText = `${callback.name} - ${
    userTemp === "F" ? callback.temp[0] : callback.temp[1]
  }`;
  basic.append(newItem);
}

function getWeather(weatherJSON, temp = "F") {
  const { current_condition, weather, nearest_area } = weatherJSON;
  // current_condition = Current weather in detail.
  // weather =  0 = current days forcast, 1 = tomorrow, 2 = day after tomorrow.
  // nearest_area = country, state, city

  //Descriptor for current Weather description
  console.log(current_condition[0].weatherDesc[0].value);

  //Feels like, Current Temp, ternery for temp
  temp === "F"
    ? (document.querySelector(
        "#feeltoday"
      ).innerText = `Currently: Feels like ${current_condition[0].FeelsLikeF}°F`)
    : (document.querySelector(
        "#feeltoday"
      ).innerText = `Currently: Feels like ${current_condition[0].FeelsLikeC}°C`);
  console.log("------"); // section for three days weather info.

  switch (
    temp //iterate over future weather
  ) {
    case "F":
      tempInfo(weather, "avgtempF", "Average Temp:");
      tempInfo(weather, "maxtempF", "Maximum Temp:");
      tempInfo(weather, "mintempF", "Minimum Temp:");
      break;
    case "C":
      tempInfo(weather, "avgtempC", "Average Temp:");
      tempInfo(weather, "maxtempC", "Maximum Temp:");
      tempInfo(weather, "mintempC", "Minimum Temp:");
      break;
  }
  quikSel("#country", `Country: ${nearest_area[0].country[0].value}`);
  quikSel("#region", `Region: ${nearest_area[0].region[0].value}`);
  quikSel("#area", `Area: ${nearest_area[0].areaName[0].value}`);
  weatherIcon(weather);
  sideBarTrigger === false
    ? sideBar(
        {
          name: nearest_area[0].areaName[0].value,
          temp: [
            current_condition[0].FeelsLikeF,
            current_condition[0].FeelsLikeC,
          ],
        },
        temp
      )
    : "";
}

function weatherIcon(current) {
  const keylist = Object.keys(current[0].hourly[0]).filter((key) =>
    key.includes("chance")
  );
  let chancelist = keylist.map((key) => {
    return {
      name: key,
      temp: current[0].hourly[0][key],
    };
  });
  let imgTarget = document.querySelector("#image");
  let rain = "";
  let snow = "";
  let sun = "";

  console.log(imgTarget);

  chancelist.forEach((chance) =>
    chance.name === "chanceofrain"
      ? (rain = chance.temp)
      : chance.name === "chanceofsnow"
      ? (snow = chance.temp)
      : chance.name === "chanceofsunshine"
      ? (sun = chance.temp)
      : ""
  );

  if (rain > 50) {
    imgTarget.src = "./assets/icons8-torrential-rain.gif";
    imgTarget.alt = "rain";
  } else if (snow > 50) {
    imgTarget.setAttribute("src", "./assets/icons8-light-snow.gif");
    imgTarget.setAttribute("alt", "snow");
  } else if (sun > 50) {
    imgTarget.src = "./assets/icons8-summer.gif";
    imgTarget.alt = "sun";
  } else {
    imgTarget.src = "";
    imgTarget.alt = "";
  }

  document.querySelector("#rain").innerText = rain;
  document.querySelector("#snow").innerText = snow;
  document.querySelector("#sunshine").innerText = sun;
}

function hideElements() {
  document.querySelectorAll(".hidden").forEach((element) => {
    element.setAttribute("class", "visibility: visable;");
    console.log(element);
  });
  document.querySelectorAll(".visable").forEach((element) => {
    element.remove();
  });
}

function tempInfo(json, temp = "avgtempF", desc) {
  json.forEach((day, i = 1) => {
    id = `#${temp.slice(0, -1)}${i}`;
    temp.charAt(temp.length - 1) === "F"
      ? quikSel(id, `${desc} ${day[temp]} °F`)
      : quikSel(id, `${desc} ${day[temp]} °C`);
    i++;
  });
}

document.getElementById("tempCalc").addEventListener("submit", () => {
  event.preventDefault();
  let num = document.getElementById("temp-to-convert").value;
  let userTemp = document.querySelector(
    "input[type=radio][name=tempCalc]:checked"
  ).value;
  userTemp === "F"
    ? (document.querySelector("#result").innerText = (
        (Number(num) - 32) /
        1.8
      ).toFixed(2))
    : (document.querySelector("#result").innerText = (
        Number(num) * 1.8 +
        32
      ).toFixed(2));

  //Math.round(num * 100) / 100
});
