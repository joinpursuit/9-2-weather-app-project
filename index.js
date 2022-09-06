const form = document.querySelector("form");
const article = document.querySelector("article");
const locations = document.querySelector("#location");
const leftWidget = document.querySelector('#leftSideWidget');
const noSearches = document.querySelector('#previous-search');
const currentWeather = document.querySelector(".current-weather");


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = event.target.location.value
    const BASE_URL = `https://wttr.in/${location}?format=j1`
    // console.log(location.value)
    
    fetch(BASE_URL)  
    .then((response) => response.json())
    .then((weatherInfo) => {
        getData(weatherInfo)
        threeDaysData(weatherInfo)
        displayPrevious(weatherInfo, location)

    })
    .catch((error) => {
        console.log(error)
    })
  });

function getData(weatherInfo) {
    const cityName = weatherInfo.nearest_area[0].areaName[0].value;
        console.log(cityName);
    const region = weatherInfo.nearest_area[0].region[0].value;
        console.log(region);
    const country = weatherInfo.nearest_area[0].country[0].value;
        console.log(country);
    const currently = weatherInfo.current_condition[0].FeelsLikeF;
        console.log(currently);
    const sunshineChance = weatherInfo.weather[0].hourly[0].chanceofsunshine;
        console.log(sunshineChance);
    const rainChance = weatherInfo.weather[0].hourly[0].chanceofrain;
        console.log(rainChance);
    const snowChance = weatherInfo.weather[0].hourly[0].chanceofsnow;
        console.log(snowChance);

    const city = document.createElement("p");
    const boldCity = document.createElement("strong");
    boldCity.textContent = "Nearest Area "
    city.append(boldCity)
    city.append(cityName)
    
    const regions = document.createElement("p");
    const boldRegion = document.createElement("strong")
    boldRegion.textContent = "Region: "
    regions.append(boldRegion)
    regions.append(region)
    
    const countryName = document.createElement("p");
    // const boldCountry
    countryName.textContent = country
    
    const currWeather = document.createElement("p");
    currWeather.textContent = currently;
    
    const sunnyDay = document.createElement("p");
    sunnyDay.textContent = sunshineChance;
    
    const rainyDay = document.createElement("p");
    rainyDay.textContent = rainChance;
    
    const snowyDay = document.createElement("p");
    snowyDay.textContent = snowChance;

    currentWeather.append(city, regions, countryName, currWeather, sunnyDay, rainyDay, snowyDay);
    
}

function threeDaysData(data) {
    // const city = document.createElement("p");
    // const boldCity = document.createElement("strong");
    // boldCity.textContent = "Nearest Area "
    // city.append(boldCity)
    // city.append(cityName)

    
    const todayAvgTemp = data.weather[0].avgtempF;
        console.log(todayAvgTemp);
    const todayMaxTemp = data.weather[0].maxtempF;
        console.log(todayMaxTemp);
    const todayMinTemp = data.weather[0].mintempF;
        console.log(todayMinTemp);
    
    
    // Do the similar coding 

}

function displayPrevious(weatherInfo, location) {
    console.log(weatherInfo, location)
    const currently = ` - ${weatherInfo.current_condition[0].FeelsLikeF}°F`;
        console.log(currently);
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.setAttribute("href", "#")   //this displays output as a link
    a.textContent = location;
    li.append(a);
    li.append(currently)
    // adds data to display to the DOM
    const oldSearches = document.querySelector(".old-searches")
    oldSearches.append(li)
    


    const deletePrevious = document.querySelector(".previous")
    deletePrevious.remove();
    
}




// shift-option-8 °

