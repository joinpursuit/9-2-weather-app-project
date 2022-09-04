
const form = document.querySelector("form");
const header = document.querySelector("header");
const article = document.querySelector("article");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInput = event.target.searchInput.value;
    const baseUrl = `https://wttr.in/${searchInput}?format=j1`;
    // console.log(baseUrl);
    // console.log(searchInput);


fetch(baseUrl)
.then((response) => response.json())
.then((weatherData) => {
    getData(weatherData)
})
.catch((err) => {
    console.log(err);
});
});

function getData(weatherData){
    const cityName = weatherData.nearest_area[0].areaName[0].value;
    // console.log(cityName);
   const nearest = document.querySelector(".nearest");
   nearest.textContent += cityName;

    const region = weatherData.nearest_area[0].region[0].value;
    // console.log(region);
    const areaRegion = document.querySelector(".areaRegion");
   
    const country = weatherData.nearest_area[0].country[0].value;
    console.log(country);
   
    const currentTemp = weatherData.current_condition[0].FeelsLikeF;
    console.log(currentTemp);
   
    const sunShine= weatherData.weather[0].hourly[0].chanceofsunshine;
    console.log(sunShine);
    
    const rain = weatherData.weather[0].hourly[0].chanceofrain;
    console.log(rain);
    
    const snow = weatherData.weather[0].hourly[0].chanceofsnow;

//add icon based on chance data   
const img = document.createElement("img");
article.innerHTML = ";"
article.append(img);
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











}



// const header = document.querySelector("header")
// header.createElement("p")








// function temperatureConverter(valNum) {
//     valNum = parseFloat(valNum);
//     document.getElementById("outputCelsius").innerHTML = (valNum-32) / 1.8;
//   }
// const h1 = document.createElement("h1");
// h1.textContent = 'Weather App';
