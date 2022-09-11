






// querey select articles/form tag
const form = document.querySelector("form");
const article = document.querySelector("article");
const today = document.createElement("article");
const tomorrow = document.createElement("article");
const dayAfter = document.createElement("article");
const divToday = document.createElement("div");
const divTomorrow = document.createElement("div");
const divDayAfter = document.createElement("div");
const divCurrent = document.createElement("div");
divCurrent.classList.add("current-info");
divToday.classList.add("today");
divTomorrow.classList.add("tomorrow");
divDayAfter.classList.add("day-after");
today.classList.add("today");
tomorrow.classList.add("tomorrow");
dayAfter.classList.add("day-after");
const asideMain = document.querySelector(".main-Aside");
const phistory = document.querySelector(".history");
const formTConversion = document.querySelector(".conversion");
const asideDegConv = document.querySelector(".degConverter");
const ulHistory = document.querySelector(".previous");



// temperature widget 
formTConversion.addEventListener('submit', (temp) => {
    temp.preventDefault();
    const degInput = temp.target.degreeNum.value;
    const newDegrees = document.querySelector(".emptyNum");
    const fradio = document.querySelector("#to-f");
    const cradio = document.querySelector("#to-c");
    if (fradio.checked) {
    const ftemp = ((degInput *9/5)+32).toFixed(2);
       newDegrees.textContent = ftemp + "°F";
   
    }
    if (cradio.checked) {
        const ctemp = ((degInput - 32) * 5/9).toFixed(2);
        newDegrees.textContent = ctemp + "°C";
    }
    formTConversion.reset();
})



// adds event listener to ask tony weather button form tag
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userInput = event.target.userInput.value;
    const weatherAPI = `https://wttr.in/${userInput}?format=j1`;
    form.reset();

    // fetch data and convert response into Json format object
    fetch(weatherAPI)
        .then((response) => response.json())

        // create all variables & html p elements that hold data from json

        .then((json) => {
            submitEvent(json, userInput);
            previousSearch(json, userInput);
        })

        .catch((error) => {
            console.log(error);
        })

});


//previous search functionality
function previousSearch(json, userInput) {
    const feelsLikeTemp = json.current_condition[0].FeelsLikeF;
    console.log(`${feelsLikeTemp} weather test`);
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
    });
}

//function for submit event, create pelements and define variables with json data.
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
    divCurrent.innerHTML = '';


    // takes the search attempt userinput city and puts it on the main(capitalizes 1st letter) and previous searches
    h2.textContent = userInput;

    // appends the pelements to their corresponding data section based on the day 

    divCurrent.append(weatherImg, h2, pelement1, pelement2, pelement3, pelement4, pelement5, pelement6, pelement7);
    article.append(divCurrent);
    today.innerHTML = '';
    today.textContent = "Today";
    tomorrow.textContent = "Tomorrow";
    dayAfter.textContent = "Day After Tomorrow";
    asideMain.append(divToday,divTomorrow,divDayAfter);
    divToday.append(today);
    divTomorrow.append(tomorrow);
    divDayAfter.append(dayAfter);
    today.append(pelement8, pelement9, pelement10);
    tomorrow.append(pelement11, pelement12, pelement13);
    dayAfter.append(pelement14, pelement15, pelement16);
    }



    // function option to create 3 day max,min,avge temps. 

//     function threeDay (obj) {
//         const asideMain = document.querySelector(".main-Aside");
//         const labels = ["Today", "Tomorrow", "Day After Tomorrow"];
//         for (i=0; i<3; i++) {
//             let {mintempF, maxtempF, avgtempF} = obj.weather[i];
//             const tempAvge = document.createElement("p");
//             const tempMax = document.createElement("p");
//             const tempMin = document.createElement("p");
//             tempAvge.textContent = `Average Temp: ${avgtempF}°F`;
//             tempMax.textContent = `Max Temp: ${maxtempF}°F`;
//             tempMin.textContent = `Min Temp: ${mintempF}°F`;
//             const article = document.createElement("article");
//             const divTemp = document.createElement("div");
//             divTemp.classList.add(`${labels[i]}`);
//             divTemp.append(article);
//             article.textContent = labels[i];
//             article.classList.add(`${labels[i]}`);
//             article.append(tempAvge,tempMax,tempMin);
//             asideMain.append(divTemp);
//     };
// }








