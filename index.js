const form = document.querySelector("form");
const article = document.querySelector("article");
const locations = document.querySelector("#location");
const leftWidget = document.querySelector('#leftSideWidget');
const noSearches = document.querySelector('#previous-search');
const currentWeather = document.querySelector(".current-weather");
const threeDay = document.querySelector(".threeDays")



form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = event.target.location.value
    // console.log(location)
    currentWeather.classList.add("border");
    threeDay.classList.add("border");
    
    const placeholder = document.querySelector(".placeholder");

    if (placeholder) {
        placeholder.remove();
    }
    // 

    const BASE_URL = `https://wttr.in/${location}?format=j1`
    // console.log(location.value)
    
    form.reset()
    fetch(BASE_URL)  
    .then((response) => response.json())
    .then((weatherInfo) => {
        getData(weatherInfo, location)
        threeDaysData(weatherInfo)
        displayPrevious(weatherInfo, location)

    })
    .catch((error) => {
        console.log(error)
    })
  });

  // Get weather data for the various cities
function getData(weatherInfo, location) {
    const h2 = document.createElement("h2");
    // h2.style = "text-transform: capitalize"
    h2.setAttribute("style", "text-transform: capitalize")
    h2.innerHTML = `${location}`;
    

    const cityName = weatherInfo.nearest_area[0].areaName[0].value;
        console.log(cityName);
    const region = weatherInfo.nearest_area[0].region[0].value;
        console.log(region);
    const country = weatherInfo.nearest_area[0].country[0].value;
        console.log(country);
    const currently = weatherInfo.current_condition[0].FeelsLikeF;
        console.log(currently);
    const sunChance = weatherInfo.weather[0].hourly[0].chanceofsunshine;
        console.log(sunChance);
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
    const boldCountry = document.createElement("strong")
    boldCountry.textContent = "Country: "
    countryName.append(boldCountry)
    countryName.append(country)
    // countryName.textContent = country
    
    const currWeather = document.createElement("p");
    const boldWeather = document.createElement("strong")
    boldWeather.textContent = "Currently: "
    currWeather.append(boldWeather)
    currWeather.append(`Feels like ${currently}°F`)
    // currWeather.textContent = currently;

    const sunnyDay = document.createElement("p");
    const boldSunny = document.createElement("strong")
    boldSunny.textContent = "Chance of Sunshine:"
    sunnyDay.append(boldSunny)
    sunnyDay.append(sunChance)
    // sunnyDay.textContent = sunChance;
    
    const rainyDay = document.createElement("p");
    const boldRain = document.createElement("strong")
    boldRain.textContent = "Chance of Rain: ";
    rainyDay.append(boldRain)
    rainyDay.append(rainChance)
    
    const snowyDay = document.createElement("p");
    const boldSnow = document.createElement("strong")
    boldSnow.textContent = "Chance of Snow: ";
    snowyDay.append(boldSnow)
    snowyDay.append(snowChance)

    const img = document.createElement("img");
    currentWeather.innerHTML = " "
    
    currentWeather.append(img, h2, city, regions, countryName, currWeather, sunnyDay, rainyDay, snowyDay);

    // The images for the pictures of the weather
    if (sunChance > 50) {
        img.setAttribute("src", "./assets/icons8-summer.gif");
        img.setAttribute("alt", "sun")
    } 
    if (rainChance > 50) {
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif")
        img.setAttribute("alt", "rain")
    } 
    if (snowChance > 50) {
        img.setAttribute("src", "./assets/icons8-light-snow.gif")
        img.setAttribute("alt", "snow")
    }
    
    
}


// Three days data 
function threeDaysData(data) {
    const todayTemp = document.querySelector(".today")
    const tmrwTemp = document.querySelector(".tomorrow")
    const dayAfterTemp = document.querySelector(".dayafter")

    const todayAvgTemp = data.weather[0].avgtempF;
        console.log(todayAvgTemp);
    const todayMaxTemp = data.weather[0].maxtempF;
        console.log(todayMaxTemp);
    const todayMinTemp = data.weather[0].mintempF;
        console.log(todayMinTemp);
    const tmrwAvgTemp = data.weather[1].avgtempF;
        console.log(tmrwAvgTemp);
    const tmrwMaxTemp = data.weather[1].maxtempF;
        console.log(tmrwMaxTemp)
    const tmrwMinTemp = data.weather[1].mintempF;
        console.log(tmrwMinTemp);
    const dayAfterAvg = data.weather[2].avgtempF;
        console.log(dayAfterAvg)
    const dayAfterMax = data.weather[2].maxtempF;
        console.log(dayAfterMax);
    const dayAfterMin = data.weather[2].mintempF;
        console.log(dayAfterMin)

    const todayAvg = document.createElement("p");
    const todayMax = document.createElement("p")
    const todayMin = document.createElement("p")
    const tmrwAvg = document.createElement("p");
    const tmrwMax = document.createElement("p");
    const tmrwMin = document.createElement("p");
    const day3Avg = document.createElement("p");
    const day3Max = document.createElement("p");
    const day3Min = document.createElement("p");

    todayAvg.innerHTML = `<strong>Average <br>Temperature:</strong> <br>${todayAvgTemp}°F`;
    todayMax.innerHTML = `<strong>Max <br>Temperature:</strong> <br>${todayMaxTemp}°F`;
    todayMin.innerHTML = `<strong>Min <br>Temperature:</strong> <br>${todayMinTemp}°F`;
    tmrwAvg.innerHTML = `<strong>Average <br>Temperature:</strong> <br>${tmrwAvgTemp}°F`;
    tmrwMax.innerHTML = `<strong>Max <br>Temperature:</strong> <br>${tmrwMaxTemp}°F`;
    tmrwMin.innerHTML = `<strong>Min <br>Temperature:</strong> <br>${tmrwMinTemp}°F`;
    day3Avg.innerHTML = `<strong>Average <br>Temperature:</strong> <br>${dayAfterAvg}°F`;
    day3Max.innerHTML = `<strong>Max <br>Temperature:</strong> <br>${dayAfterMax}°F`;
    day3Min.innerHTML = `<strong>Min <br>Temperature:</strong> <br>${dayAfterMin}°F`;

    todayTemp.innerHTML= "<strong>Today</strong>"
    tmrwTemp.innerHTML = "<strong>Tomorrow</strong>"
    dayAfterTemp.innerHTML = "<strong>Day After Tomorrow</strong>"

    todayTemp.append(todayAvg, todayMax, todayMin)
    tmrwTemp.append(tmrwAvg, tmrwMax, tmrwMin)
    dayAfterTemp.append(day3Avg, day3Max, day3Min)
    

}
// Previous data column
function displayPrevious(weatherInfo, location) {
    console.log(weatherInfo, location);
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

// Temperature converter form

const convertForm = document.querySelector("#left-form")
const tempConvert = document.querySelector("#temp-to-convert");
const celsiusToF = document.querySelector("#to-f");
const fahrenheitToC = document.querySelector("#to-c");
const convertAnswer = document.querySelector("#result")
const headerH4 = document.querySelector("h4")

convertForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const userInput = event.target.query.value

if (celsiusToF.checked) {
  const cToFahr = userInput * 1.8 + 32;
  headerH4.textContent = `${cToFahr.toFixed(2)} °F` ;
}
if (fahrenheitToC.checked) {
 
  const fToCel = (userInput - 32) / 1.8;
  headerH4.innerHTML = `${fToCel.toFixed(2)} °C`;
}
  convertForm.reset ()
})