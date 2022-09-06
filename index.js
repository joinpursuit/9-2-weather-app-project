






// querey select articles/form tag
const form = document.querySelector("form");
const article = document.querySelector("article");
const today = document.querySelector(".today");
const tomorrow = document.querySelector(".tomorrow");
const dayAfter = document.querySelector(".day_after");
const phistory = document.querySelector(".history");
const formTConversion = document.querySelector(".conversion");
const asideDegConv = document.querySelector(".degConverter");
const ulHistory = document.querySelector(".previous");




formTConversion.addEventListener('submit', (temp) => {
    temp.preventDefault();
    const Input = temp.target.degreeNum.value;
    formTConversion.reset();
    const newDegrees = document.createElement("h4");
    newDegrees.textContent = celsiusToF(Input);
    newDegrees.append(asideDegConv);
    console.log(Input);
    const fradio = document.querySelector("#fahrenheit");
    const cradio = document.querySelector("#celsius");
    if (fradio.checked) {
        
    }
})


function celsiusToF(degInput) {
    return (degInput * 9 / 5) + 32;
}


// adds event listener to ask tony weather button form tag
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userInput = event.target.userInput.value
    const weatherAPI = `https://wttr.in/${userInput}?format=j1`;
    form.reset();

    // fetch data and convert response into Json format object
    fetch(weatherAPI)
        .then((response) => response.json())

        // create all variables & html p elements that hold data from json

        .then((json) => {
            submitEvent(json, userInput);
            previousSearch(json, userInput)
        })

        .catch((error) => {
            console.log(error);
        })

});


//previous search functionality
function previousSearch(json, userInput) {
    const feelsLikeTemp = json.current_condition[0].FeelsLikeF;
    phistory.textContent = '';
    const newLi = document.createElement("li");
    ulHistory.append(newLi);
    const a = document.createElement("a");
    a.innerHTML = userInput;
    a.setAttribute("href", "#");
    const pTagSearch = document.createElement("p");
    pTagSearch.textContent = feelsLikeTemp + "°F"
    newLi.append(a);
    newLi.after(pTagSearch)
    a.addEventListener("click", () => {
        submitEvent(json, userInput);
    })
}

//function for submit even, creates pelements and defines variables with json data.
function submitEvent(json, userInput) {
    const city = json.nearest_area[0].areaName[0].value;
    const pregion = json.nearest_area[0].region[0].value;
    const pcountry = json.nearest_area[0].country[0].value;
    const feelsLikeTemp = json.current_condition[0].FeelsLikeF;
    const rainChance = json.weather[0].hourly[0].chanceofrain;
    const sunChance = json.weather[0].hourly[0].chanceofsunshine;
    const snowChance = json.weather[0].hourly[0].chanceofsnow;
    const todayMin = json.weather[0].mintempF;
    const todayMax = json.weather[0].maxtempF;
    const todayAvge = json.weather[0].avgtempF;
    const tomMin = json.weather[1].mintempF;
    const tomMax = json.weather[1].maxtempF;
    const tomAvge = json.weather[1].avgtempF;
    const afterMin = json.weather[2].mintempF;
    const afterMax = json.weather[2].maxtempF;
    const afterAvge = json.weather[2].avgtempF;
    const h2 = document.createElement("h2");
    const pelement1 = document.createElement("p");
    const pelement2 = document.createElement("p");
    const pelement3 = document.createElement("p");
    const pelement4 = document.createElement("p");
    const pelement5 = document.createElement("p");
    const pelement6 = document.createElement("p");
    const pelement7 = document.createElement("p");
    const pelement8 = document.createElement("p");
    const pelement9 = document.createElement("p");
    const pelement10 = document.createElement("p");
    const pelement11 = document.createElement("p");
    const pelement12 = document.createElement("p");
    const pelement13 = document.createElement("p");
    const pelement14 = document.createElement("p");
    const pelement15 = document.createElement("p");
    const pelement16 = document.createElement("p");

    //create the text content displayed on page with the variables interpolated

    pelement1.textContent = "Nearest Area: " + city;
    pelement2.textContent = "Region: " + pregion;
    pelement3.textContent = "Country: " + pcountry;
    pelement4.textContent = `Currently: Feels Like ${feelsLikeTemp}°F`;
    pelement6.textContent = `Chance of Sunshine: ${sunChance}%`;
    pelement5.textContent = `Chance of Rain: ${rainChance}%`;
    pelement7.textContent = `Chance of Snow: ${snowChance}%`;
    pelement8.textContent = `Average Temp: ${todayAvge}°F`;
    pelement9.textContent = `Max Temp: ${todayMax}°F`;
    pelement10.textContent = `Min Temp: ${todayMin}°F`;
    pelement11.textContent = `Average Temp: ${tomAvge}°F`;
    pelement12.textContent = `Max Temp: ${tomMax}°F`;
    pelement13.textContent = `Min Temp: ${tomMin}°F`;
    pelement14.textContent = `Average Temp: ${afterAvge}°F`;
    pelement15.textContent = `Max Temp: ${afterMax}°F`;
    pelement16.textContent = `Min Temp: ${afterMin}°F`;



 // takes the search attempt userinput city and puts it on the main(capitalizes 1st letter) and previous searches
    h2.textContent = userInput;


    // only needed to console log json object and see where to pull data
    console.log(json);
    console.log(city);
    console.log(userInput);

    //gif image funcitonality based on snow,rain,sun chance
    const weatherImg = document.createElement("img");
    if (Number(sunChance) > 50) {
        weatherImg.setAttribute("src", "./assets/icons8-summer.gif");
        weatherImg.setAttribute("alt", "sun")
    }
    if (Number(rainChance > 50)) {
        weatherImg.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        weatherImg.setAttribute("alt", "rain");
    }
    if (Number(snowChance) > 50) {
        weatherImg.setAttribute("src", "./assets/icons8-light-snow.gif");
        weatherImg.setAttribute("alt", "snow");
    }




    //ensures the previous search data doesnt stay on the page
    article.innerHTML = '';

    // appends the pelements to their corresponding data section based on the day 

    article.append(weatherImg, h2, pelement1, pelement2, pelement3, pelement4, pelement5, pelement6, pelement7);
    today.append(pelement8, pelement9, pelement10);
    tomorrow.append(pelement11, pelement12, pelement13);
    dayAfter.append(pelement14, pelement15, pelement16);
}



// if (city !== userInput) {
            //     pelement1.textContent = "Nearest Area: " + city;
            //     pelement2.textContent = "Region: " + pregion;
            //     pelement3.textContent = "Country: " + pcountry;
            //     pelement4.textContent = `Currently: Feels Like ${feelsLikeTemp}°`;
            //     pelement6.textContent = `Chance Of Sunshine: ${sunChance}%`;
            //     pelement5.textContent = `Chance Of Rain: ${rainChance}%`;
            //     pelement7.textContent = `Chance Of Snow: ${snowChance}%`;

            //     pelement8.textContent = `Average Temp: ${todayAvge}°F`;
            //     pelement9.textContent = `Max Temp: ${todayMax}°F`;
            //     pelement10.textContent = `Min Temp: ${todayMin}°F`;
            //     pelement11.textContent = `Average Temp: ${tomAvge}°F`;
            //     pelement12.textContent = `Max Temp: ${tomMax}°F`;
            //     pelement13.textContent = `Min Temp: ${tomMin}°F`;
            //     pelement14.textContent = `Average Temp: ${afterAvge}°F`;
            //     pelement15.textContent = `Max Temp: ${afterMax}°F`;
            //     pelement16.textContent = `Min Temp: ${afterMin}°F`;

            // } else {
            //     pelement1.textContent = "Area: " + city;
            //     pelement2.textContent = "Region: " + pregion;
            //     pelement3.textContent = "Country: " + pcountry;
            //     pelement4.textContent = `Currently: Feels Like ${feelsLikeTemp}°`
            //     pelement6.textContent = `Chance Of Sunshine: ${sunChance}%`;
            //     pelement5.textContent = `Chance Of Rain: ${rainChance}%`;
            //     pelement7.textContent = `Chance Of Snow: ${snowChance}%`;
            //     pelement8.textContent = `Average Temp: ${todayAvge}°F`;
            //     pelement9.textContent = `Max Temp: ${todayMax}°F`;
            //     pelement10.textContent = `Min Temp: ${todayMin}°F`;
            //     pelement11.textContent = `Average Temp: ${tomAvge}°F`;
            //     pelement12.textContent = `Max Temp: ${tomMax}°F`;
            //     pelement13.textContent = `Min Temp: ${tomMin}°F`;
            //     pelement14.textContent = `Average Temp: ${afterAvge}°F`;
            //     pelement15.textContent = `Max Temp: ${afterMax}°F`;
            //     pelement16.textContent = `Min Temp: ${afterMin}°F`;
            // }








