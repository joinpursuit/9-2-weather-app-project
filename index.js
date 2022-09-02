// const header = document.createElement('h1');
// header.textContent = ""

function temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    document.getElementById("outputCelsius").innerHTML = (valNum-32) / 1.8;
  }

  
  const form = document.querySelector("form");
  const article = document.querySelector("article");



  form.addEventListener('submit',(event) => {
    event.preventDefault();
    const userInput = event.target.cityPick.value
    const urlWeatherAPI = `https://wttr.in/${userInput}?format=j1`;

    fetch(urlWeatherAPI) 
    .then((response) => response.json())
    
    .then((weather) => {
    const nearestCityWeather = weather.nearest_area[0].areaName[0].value;
    const h2Header = document.createElement("h2");
    h2Header.textContent = nearestCityWeather;
    article.append(h2Header);
    const area = document.createElement("p");
    article.append(area)

    if (nearestCityWeather !== userInput) {
        area.textContent = "Nearest Area: " + nearestCityWeather;
    } else {
        area.textContent = "Area: " +  nearestCityWeather
    }
    console.log(nearestCityWeather);
    const previous = doucment.querySelector(".previous");
    previous.textContent = nearestCityWeather;
    })
    .catch((error) => {
        console.log(error);
    })
  });

  


 





  

