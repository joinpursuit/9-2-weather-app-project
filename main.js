// let rendering = document.querySelector(".rendering")
// let historyarray = []
// let search = document.querySelector("#site-search")
// let submitbutton = document.querySelector('button.button');

// let citytrue = ""
    // var city = 'wttr.in'+citytrue+"?format=j1"

// submitbutton.addEventListener("click",(event)=>{
//     event.preventDefault()
//   citytrue =  `${search.value}`

// })
let cityHistorySearch = []


//function to grab data from weather API according to user input
 

  


//    var intervalId = window.document.setInterval(function getData(){

function citySEARCH(event){
    event.preventDefault();
    const sitesearch = document.querySelector('#site-search');
    cityHistorySearch.push(sitesearch.value);
   //CODE ABOVE FOR SEARCHING CITIES
   let city1 ="https://wttr.in/"
let cityinput = cityHistorySearch[cityHistorySearch.length-1];
let city3 = "?format=j1"
let city = `${city1}${cityinput}${city3}`


console.log(sitesearch.value)
fetch(city)
.then((response) => response.json()).then((data) => {
    // rendering.innerText = data
  console.log(data)
  console.log(city)
  

//MAIN STUFF IN RENDERING

  let currentCond = data.current_condition
  currentCond[0].temp_F


  let sunshinechance = data.weather[0].hourly[0].chanceofsunshine
let rainchance = data.weather[0].hourly[0].chanceofrain
  let snowchance = data.weather[0].hourly[0].chanceofsnow
//Making it part of the DOM
  let chances = document.querySelector(".rendering");
  chances.innerHTML = `<br class="sunshinechance">Chance of Sunshine: ${sunshinechance}%</br> 
  <br class="rainchance">Chance of Rain: ${rainchance}%</br>
  <br class="snowchance">Chance of Snow: ${snowchance}%</br>`;

  //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER SUN
  let summerimg = "<img src='assets/icons8-summer.gif' >"
  let summerdiv = document.createElement("div")
let sunchineelement = document.querySelector(".sunshinechance") 
sunchineelement.before(summerdiv);

  if(sunshinechance>50){
    summerdiv.innerHTML = summerimg
 }

   //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER SNOW

let snowimg = "<img src='assets/icons8-light-snow.gif' >"
let snowdiv = document.createElement("div")
let snowelement = document.querySelector(".snowchance") 
sunchineelement.before(snowdiv);

if(snowchance>50){
    snowdiv.innerHTML = snowimg
 }

    //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER RAIN

let rainimg = "<img src='assets/icons8-light-snow.gif' >"
let raindiv = document.createElement("div")
let rainelement = document.querySelector(".rainchance") 
sunchineelement.before(raindiv);

if(rainchance>50){
    raindiv.innerHTML = rainimg
 }


  //TESTING CODE BELOW
console.log(rainchance)

  console.log(sunshinechance)

console.log(snowchance)
  console.log(currentCond[0].temp_F)
  
//ERROR HANDLING

  }).catch((error) => {
  console.log(error)

})
//ERROR HANDLING
}
// },3000)//reload function every 1 second


//Celsius from Farenheit Conversion: (32°F − 32) × 5/9 = 0°C
// let conversionSearch = document.querySelector(".site-degree")
const convertTRUE = document.querySelector('.convertTRUE')
let conversionSearch = document.querySelector("#site-degree")
function degreeConversion(event){
    event.preventDefault();
    let divide = (5/9);
  
 let computedValue = ((conversionSearch.value)-32)*(divide);

 convertTRUE.textContent = computedValue.toFixed(2);
 event.preventDefault();
}
//ENFD OF CONVERT TEMPERATURE FUNCTION


//Code Below will Ad functionality for conversion using form and button
let submissionConvert = document.querySelector(".conversion")
submissionConvert.addEventListener("submit",degreeConversion)

 
// setTimeout(function(){
//     window.location.reload(1);
//  }, 1000);




 //END OF CitySearch FUNCTION
   //CODE BELOW FOR SEARCHING CITIES WHEN BUTTON IS CLICKED
   const citySearch = document.querySelector(".citySearch")
   const buttonSearch = document.querySelector(".citybutton")
   buttonSearch.addEventListener("click",citySEARCH)
   //code below is for searching cities
 

   console.log(cityHistorySearch)
 