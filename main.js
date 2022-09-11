
const form = document.querySelector("form");
const header = document.querySelector("header");
const article = document.querySelector("article");
const main = document.querySelector("main");
const placeholder = document.querySelector(".placeholder");
const cSign = "℃";
const fSign = "℉";

form.addEventListener("submit", (event) => {
    event.preventDefault();
    placeholder.style.setProperty("display", "none");
    const searchInput = event.target.searchInput.value;
    const baseUrl = `https://wttr.in/${searchInput}?format=j1`;
    form.reset();
    // console.log(baseUrl);
    // console.log(searchInput);


fetch(baseUrl)
.then((response) => response.json())
.then((weatherData) => {
    getData(weatherData, searchInput)
    data3Days(weatherData)
    previousSearch(weatherData, searchInput)
})
.catch((err) => {
    console.log(err);
});
});

function getData(weatherData, searchInput){
    article.innerHTML = " ";

    //for the image tag position
    const img = document.createElement("img");
    article.append(img);

    const location = document.createElement("h2");
    article.append(location);
    location.textContent += `${searchInput}`;
// console.log(location);

// this is for location information, nearest area, region,country etc.

const areaNTemp = document.createElement("p");
const cityName = weatherData.nearest_area[0].areaName[0].value;
// console.log(cityName);
article.append(areaNTemp);
areaNTemp.textContent = "Nearest Area:" + cityName;
// console.log(areaNTemp);

const areaRegion = document.createElement("p");
const region = weatherData.nearest_area[0].region[0].value;
    // console.log(region);
    article.append(areaRegion);
    areaRegion.textContent = "Region:" + region;
    // console.log(areaRegion);
 
const countryArea = document.createElement("p");
const country = weatherData.nearest_area[0].country[0].value;
    // console.log(country);
    article.append(countryArea);
    countryArea.textContent = "Country:" + country;
    // console.log(countryArea);
   
const feelsCurrent = document.createElement("p");
const currentTemp = weatherData.current_condition[0].FeelsLikeF;
    // console.log(currentTemp);
    article.append(feelsCurrent);
    feelsCurrent.textContent = "Currently:" + currentTemp;
    // console.log(feelsCurrent);
   
const chanceSunshine = document.createElement("p");
const sunShine= weatherData.weather[0].hourly[0].chanceofsunshine;
    // console.log(sunShine);
    article.append(chanceSunshine);
    chanceSunshine.textContent = "Chance of Sunshine" + sunShine;
    // console.log(chanceSunshine);

    
const chanceRain = document.createElement("p");
const rain = weatherData.weather[0].hourly[0].chanceofrain;
    // console.log(rain);
    article.append(chanceRain);
    chanceRain.textContent = "Chance of Rain" + rain;
    // console.log(chanceRain);
    

const chanceSnow = document.createElement("p");
const snow = weatherData.weather[0].hourly[0].chanceofsnow;
    // console.log(snow);
    article.append(chanceSnow);
    chanceSnow.textContent = "Chance of Snow" + snow;
    // console.log(chanceSnow);

//add icon based on chance data   

if (Number(sunShine) > 50) {
    img.setAttribute("alt", "sun");
    img.setAttribute("src", "./assets/icons8-summer.gif");
} if (Number(rain) > 50) {
    img.setAttribute("alt", "rain");
    img.setAttribute("src", "./assets/icons8-torrential-rain.gif")
} if (Number(snow) > 50) {
    img.setAttribute("alt", "snow");
    img.setAttribute("src", "./assets/icons8-light-snow.gif")
}


const form2 = document.querySelector(".widget");
form2.addEventListener("submit", (event) => {
  event.preventDefault();
  const valNum = event.target.conversion.value;
//   console.log(valNum);

  const celsius = document.querySelector("#to-c");
  const fahrenheit = document.querySelector("#to-f");
  const h4 = document.querySelector("#temp-converter");

  if (celsius.checked) {
    const ctof = (valNum - 32) / 1.8;
    // console.log(ctof);
    h4.textContent = ctof.toFixed(2) + cSign;
  }
  if (fahrenheit.checked) {
    const ftoc = valNum * 1.8 + 32;
    // console.log(ftoc);
    h4.textContent = ftoc.toFixed(2) + fSign;
  }

  });
}

function data3Days(weatherData) {
 const today = document.querySelector(".today");
 const tomorrow = document.querySelector(".tomorrow");
 const day_after = document.querySelector(".day_after");
 
today.innerHTML = "<strong>Today</strong>"
tomorrow.innerHTML = "<strong>Tomorrow</strong>"
day_after.innerHTML = "<strong>Day After Tomorrow</strong>"

const avgTemp0 = weatherData.weather[0].avgtempF;
const temp_Avg0 = document.createElement("p");
temp_Avg0.textContent = `Average Temperature: ${avgTemp0}℉`;

const avgTemp1 = weatherData.weather[1].avgtempF;
const temp_Avg1 = document.createElement("p");
temp_Avg1.textContent = `Average Temperature: ${avgTemp1}℉`;

const avgTemp2 = weatherData.weather[2].avgtempF;
const temp_Avg2 = document.createElement("p");
temp_Avg2.textContent =`Average Temperature: ${avgTemp2}℉`;




const tempMax0 = weatherData.weather[0].maxtempF;
const max_temp0 = document.createElement("p");
max_temp0.textContent = `Max Temperature: ${tempMax0}℉`;

const tempMax1 = weatherData.weather[1].maxtempF;
const max_temp1 = document.createElement("p");
max_temp1.textContent = `Max Temperature: ${tempMax1}℉`;

const tempMax2 = weatherData.weather[2].maxtempF;
const max_temp2 = document.createElement("p");
max_temp2.textContent =`Max Temperature: ${tempMax2}℉` ;





const tempMin0 = weatherData.weather[0].mintempF;
const min_temp0 = document.createElement("p");
min_temp0.textContent = `Min Temperature: ${tempMin0}℉`;

const tempMin1 = weatherData.weather[1].mintempF;
const min_temp1 = document.createElement("p");
min_temp1.textContent =`Min Temperature: ${tempMin1}℉`;

const tempMin2 = weatherData.weather[2].mintempF; /** makes a variable and gives it the data recieved from the json information from the website */
const min_temp2 = document.createElement("p"); 
min_temp2.textContent = `Min Temperature: ${tempMin2}℉`;


today.append(temp_Avg0, max_temp0, min_temp0);
tomorrow.append(temp_Avg1, max_temp1, min_temp1);
day_after.append(temp_Avg2, max_temp2, min_temp2)
};

function previousSearch(weatherData, searchInput){
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    ul.append(li);
    
    const a = document.createElement("a");
    a.addEventListener("click", (_) => {
     getData(weatherData, searchInput);
    });
    
    a.setAttribute("href", "#");
    a.innerHTML = weatherData.nearest_area[0].areaName[0].value;
    const tempA = document.createElement("p");
    tempA.textContent = " - " + weatherData.current_condition[0].FeelsLikeF + "F";
    li.append(a, tempA);

    const deletePrevious = document.querySelector(".previous")
    deletePrevious.remove();
};

