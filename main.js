// fetch("wttr.in/Detroit?format=j1").then(data => {
//     return data.json();
// }).then(renderTriviaQs).catch(err => {
//     console.log(err);
// })


let searchParam;
let searchBox;
let currentWeather;
let futureForecast;
let pastSearches;
let future1;
let future2;
let future3;

let searchLocation;
let fetchURL;
let jsonContainer;

let conversionInput;
let convertC;
let convertF;
let convertResult;
let conversionBox;

window.onload = function i() {
    searchParam = document.querySelector('#location-search');
    searchBox = document.querySelector("#location-srchbx");
    currentWeather = document.querySelector(".current-weather");
    futureForecast = document.querySelector(".future-forecast");
    pastSearches = document.querySelector("#past-searches");

    future1 = document.querySelector("#future-one");
    future2 = document.querySelector("#future-two");
    future3 = document.querySelector("#future-three");

    conversionInput = document.querySelector('#converter');
    convertC = document.querySelector('#to-c');
    convertF = document.querySelector('#to-f');
    convertResult = document.querySelector('#result');
    conversionBox = document.querySelector('#temp-to-convert');

    searchParam.addEventListener("submit" , event => {
        event.preventDefault();

        weatherSubmit(true);
    });

    conversionInput.addEventListener("submit" , event => {
        event.preventDefault();
        if (convertC.checked) {
            convertResult.textContent = ((conversionBox.value - 32) * 5/9).toFixed(2);
        } else {
            convertResult.textContent = ((conversionBox.value * 9/5) + 32).toFixed(2);
        }
    });
};

function weatherSubmit(addToHistory) {
    currentWeather.innerHTML = '';

    searchLocation = searchBox.value;
    fetchURL = `https://wttr.in/${searchLocation}?format=j1`;
    searchBox.value = "";
    // console.log(fetchURL);

    fetch(fetchURL).then(data => {
    return data.json();
    }).then(jsonObj => {
        getWeather(jsonObj , addToHistory);
    }).catch(err => {
        console.log(err);
    });
};



function getWeather(loc , addToHistory) {
    function getNearestArea(x) {
        return x["nearest_area"][0]["areaName"][0]["value"];
    };
    function getRegion(x) {
        return x["nearest_area"][0]["region"][0]["value"];
    }
    function getCountry(x) {
        return x["nearest_area"][0]["country"][0]["value"];
    }
    function getCurrently(x) {
        return `Feels Like ${x["current_condition"][0]["FeelsLikeF"]}°F`;
    }
    function getChanceOfSunshine(x) {
        return `${x["weather"][0]["hourly"][0]["chanceofsunshine"]}%`;
    }
    function getChanceOfRain(x) {
        return `${x["weather"][0]["hourly"][0]["chanceofrain"]}%`;
    }
    function getChanceOfSnow(x) {
        return `${x["weather"][0]["hourly"][0]["chanceofsnow"]}%`;
    }


    let locationHeader = document.createElement("h2");
    locationHeader.setAttribute("align" , "center");
    locationHeader.textContent = searchLocation;

    let currentWeatherList = document.createElement("ul");
    currentWeatherList.style.listStyleType = "none";

    let nearestArea = document.createElement("p");
    nearestArea.textContent = "Nearest Area: ";
    nearestArea.style.fontWeight = "bold";
    let nearestAreaSpan = document.createElement("span");
    nearestAreaSpan.style.fontWeight = "normal";
    nearestAreaSpan.textContent = getNearestArea(loc);
    nearestArea.append(nearestAreaSpan);

    let region = document.createElement("p");
    region.textContent = "Region: ";
    region.style.fontWeight = "bold";
    let regionSpan = document.createElement("span");
    regionSpan.style.fontWeight = "normal";
    regionSpan.textContent = getRegion(loc);
    region.append(regionSpan);

    let country = document.createElement("p");
    country.textContent = "Country: ";
    country.style.fontWeight = "bold";
    let countrySpan = document.createElement("span");
    countrySpan.style.fontWeight = "normal";
    countrySpan.textContent = getCountry(loc);
    country.append(countrySpan);

    let currently = document.createElement("p");
    currently.textContent = "Currently: ";
    currently.style.fontWeight = "bold";
    let currentlySpan = document.createElement("span");
    currentlySpan.style.fontWeight = "normal";
    currentlySpan.textContent = getCurrently(loc);
    currently.append(currentlySpan);

    let chanceOfSunshine = document.createElement("p");
    chanceOfSunshine.textContent = "Chance of Sunshine: ";
    chanceOfSunshine.style.fontWeight = "bold";
    let chanceOfSunshineSpan = document.createElement("span");
    chanceOfSunshineSpan.style.fontWeight = "normal";
    chanceOfSunshineSpan.textContent = getChanceOfSunshine(loc);
    chanceOfSunshine.append(chanceOfSunshineSpan);

    let chanceOfRain = document.createElement("p");
    chanceOfRain.textContent = "Chance of Rain: ";
    chanceOfRain.style.fontWeight = "bold";
    let chanceOfRainSpan = document.createElement("span");
    chanceOfRainSpan.style.fontWeight = "normal";
    chanceOfRainSpan.textContent = getChanceOfRain(loc);
    chanceOfRain.append(chanceOfRainSpan);

    let chanceOfSnow = document.createElement("p");
    chanceOfSnow.textContent = "Chance of Snow: ";
    chanceOfSnow.style.fontWeight = "bold";
    let chanceOfSnowSpan = document.createElement("span");
    chanceOfSnowSpan.style.fontWeight = "normal";
    chanceOfSnowSpan.textContent = getChanceOfSnow(loc);
    chanceOfSnow.append(chanceOfSnowSpan);

    let weatherImg = document.createElement('img');

    if (loc["weather"][0]["hourly"][0]["chanceofsunshine"] > 50) {
        weatherImg.setAttribute('src' , './assets/icons8-summer.gif');
        weatherImg.setAttribute('alt' , 'sun');
    }
    if (loc["weather"][0]["hourly"][0]["chanceofrain"] > 50) {
        weatherImg.setAttribute('src' , './assets/icons8-torrential-rain.gif');
        weatherImg.setAttribute('alt' , 'rain');
    }
    if (loc["weather"][0]["hourly"][0]["chanceofsnow"] > 50) {
        weatherImg.setAttribute('src' , './assets/icons8-light-snow.gif');
        weatherImg.setAttribute('alt' , 'snow');
    }

    currentWeather.prepend(weatherImg);


    function futureWeather(loc , i) {
        const forecastArr = [];
        forecastArr.push(
            loc['weather'][i]['avgtempF'],
            loc['weather'][i]['maxtempF'],
            loc['weather'][i]['mintempF'],
        )
        return forecastArr;
    };

    function createWeather(day , i) {
        document.getElementById(`${day}Avg`).innerHTML = `<b>Average Temperature: </b>${futureWeather(loc , i)[0]}°F`;
        document.getElementById(`${day}Max`).innerHTML = `<b>Max Temperature: </b>${futureWeather(loc , i)[1]}°F`;
        document.getElementById(`${day}Min`).innerHTML = `<b>Min Temperature: </b>${futureWeather(loc , i)[2]}°F`;
    }

    createWeather('today' , 0);
    createWeather('tmrw' , 1);
    createWeather('after' , 2);


    // let todayAvg = document.querySelector('#todayAvg').textContent;
    // todayAvg += futureWeather(loc , 0)[0];

    currentWeatherList.append(nearestArea, 
        region,
        country,
        currently,
        chanceOfSunshine,
        chanceOfRain,
        chanceOfSnow
    );

    currentWeather.append(locationHeader);
    currentWeather.append(currentWeatherList);

    future1.style.display = "flex";
    future2.style.display = "flex";
    future3.style.display = "flex";

    if(document.getElementById('no-searches')) {
        document.getElementById('no-searches').remove();
    };

    if (addToHistory) {
        // const currentSearch = document.createElement('p');
        // const prevSearchLink = document.createElement('button');
        // prevSearchLink.classList.add('button-link');
        // prevSearchLink.textContent = searchLocation;
        // currentSearch.append(prevSearchLink);
        // pastSearches.append(currentSearch);
        const currentSearch = document.createElement('li');
        const prevSearchLink = document.createElement('a');
        prevSearchLink.setAttribute('href' , 'javascript:void(0)');
        prevSearchLink.textContent = searchLocation;
        currentSearch.append(prevSearchLink);
        pastSearches.append(currentSearch);

        const savedTemp = document.createElement('span');
        savedTemp.innerText = ` - ${loc["current_condition"][0]["FeelsLikeF"]}°F`;
        currentSearch.append(savedTemp);
    
        prevSearchLink.addEventListener("click" , event => {
            searchBox.value = prevSearchLink.textContent;
            weatherSubmit(false);
        });
    }
    console.log(loc);
}