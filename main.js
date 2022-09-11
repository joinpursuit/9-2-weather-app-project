

let cityHistorySearch = []
let formattedhistorysearch = []
let historyresults = []
let form = document.querySelector("form")
let historyHTML = []
let storageARRAY = []

function citySEARCH(event){
  event.preventDefault()
const sitesearch = document.querySelector('#site-search');
    cityHistorySearch.push(sitesearch.value.replace(/\s+/g, '')); 


//GETTING API URL FOR FETCH
let city1 ="https://wttr.in/"
let cityinput = cityHistorySearch[cityHistorySearch.length-1];
let city3 = "?format=j1"
let city = `${city1}${cityinput}${city3}`;


console.log(cityHistorySearch)





fetch(city)
.then((response) => response.json()).then((data) => {


//BELOW: nameofCITY WILL GET THE REGION VALUES FROM EACH SEARCH and store it intoa variable
let nameofCITY = data.nearest_area[0].region[0].value
//HERE WE PUT THE REGION VALUES FROM EACH SEARCH INTO THE historyresults ARRAY
historyresults.push(nameofCITY)

//WE CREATE A SESSION STORAGE

//**************************************************************** */
let currentCond = data.current_condition;
  let sunshinechance = data.weather[0].hourly[0].chanceofsunshine
let rainchance = data.weather[0].hourly[0].chanceofrain
  let snowchance = data.weather[0].hourly[0].chanceofsnow
//Making it part of the DOM
  let chances = document.querySelector(".rendering");
  chances.innerHTML = `<br><h2>${nameofCITY}</h2></br> <br class="sunshinechance">Chance of Sunshine: ${sunshinechance}%</br> 
  <br class="rainchance">Chance of Rain: ${rainchance}%</br>;
  <br class="snowchance">Chance of Snow: ${snowchance}%</br>`;
//**************************************************************** */

  //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER SUN
  let summerimg = "<img src='assets/icons8-summer.gif' >"
  let summerdiv = document.createElement("div")
let sunchineelement = document.querySelector(".sunshinechance") 
sunchineelement.before(summerdiv);

  if(sunshinechance>50){
    summerdiv.innerHTML = summerimg
 }
//**************************************************************** */

   //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER SNOW

let snowimg = "<img src='assets/icons8-light-snow.gif' >"
let snowdiv = document.createElement("div")
let snowelement = document.querySelector(".snowchance") 
sunchineelement.before(snowdiv);

if(snowchance>50){
    snowdiv.innerHTML = snowimg
 }
//**************************************************************** */

    //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER RAIN

let rainimg = "<img src='assets/icons8-torrential-rain.gif' >"
let raindiv = document.createElement("div")
let rainelement = document.querySelector(".rainchance") 
sunchineelement.before(raindiv);

if(rainchance>50){
    raindiv.innerHTML = rainimg
 }

 data.weather[0].hourly[1].maxtempF
 data.weather[0].hourly[1].mintempF
 data.weather[0].avgtempF



let table = document.querySelector("#rendTABLE")

table .innerHTML = `
<h3>Today</h3>
<div>Average Temperature :${data.weather[0].avgtempF}</div> 
<div>Maximum Temperature :${data.weather[0].maxtempF}</div> 
<div>Maximum Temperature :${data.weather[0].maxtempF}</div> 

<h3>Tomorrow</h3>
<div>Average Temperature :${data.weather[1].avgtempF}</div> 
<div>Maximum Temperature :${data.weather[1].maxtempF}</div> 
<div>Maximum Temperature :${data.weather[1].maxtempF}</div> 


<h3>Tomorrow</h3>
<div>Average Temperature :${data.weather[2].avgtempF}</div> 
<div>Maximum Temperature :${data.weather[2].maxtempF}</div> 
<div>Maximum Temperature :${data.weather[2].maxtempF}</div>
`




//**************************************************************** */
let history = document.querySelector(".history")
let setclass = nameofCITY.replace(/\s+/g, '')
console.log(setclass)
// sessionStorage.setItem(`${setclass}`, "Dom")  
// window.history.pushState("","",`/${setclass}`);
// storageARRAY.push(document.body.innerHTML)
// let store = storageARRAY[storageARRAY.length-1]
// onclick="${sessionStorage[sessionStorage.length-1]}"
historyHTML.push(`<li onclick="clickable('${setclass}')" class="${setclass}"> <span style="color:blue">${nameofCITY}</span> - ${currentCond[0].temp_F} ℉</li>`)
  // cityPREVIOUSsearches.push(nameofCITY)
//****************************************************************
  let formattedArrayHistory = historyHTML.join("")
  console.log(formattedArrayHistory)
  history.innerHTML = formattedArrayHistory
  //STORING SESSION BELOW
// // set
// var lastAccess = new Date().getTime();
//     sessionStorage.setItem(`${setclass}`, lastAccess.toString());
// console.log(storageunit)
let hiddenNoHistory = document.querySelector(".hidden");
hiddenNoHistory.style.display = "none"
}).catch((error) => {
    
    console.log(error)
  }) 
}




form.addEventListener("submit",citySEARCH)

  // let boody = document.querySelector("body")
// function clickable(x){
  
//   boody.innerHTML = x
// }


//-------------------------------->
function clickable(x){
      cityHistorySearch.push(x); 
  
  
  //GETTING API URL FOR FETCH
  let city1 ="https://wttr.in/"
  let cityinput = cityHistorySearch[cityHistorySearch.length-1];
  let city3 = "?format=j1"
  let city = `${city1}${cityinput}${city3}`;
  
  
  console.log(cityHistorySearch)
  
  
  
  
  
  fetch(city)
  .then((response) => response.json()).then((data) => {
  
  
  //BELOW: nameofCITY WILL GET THE REGION VALUES FROM EACH SEARCH and store it intoa variable
  let nameofCITY = data.nearest_area[0].region[0].value
  //HERE WE PUT THE REGION VALUES FROM EACH SEARCH INTO THE historyresults ARRAY
  // historyresults.push(nameofCITY)
  
  //WE CREATE A SESSION STORAGE
  
  //**************************************************************** */
  let currentCond = data.current_condition;
    let sunshinechance = data.weather[0].hourly[0].chanceofsunshine
  let rainchance = data.weather[0].hourly[0].chanceofrain
    let snowchance = data.weather[0].hourly[0].chanceofsnow
  //Making it part of the DOM
    let chances = document.querySelector(".rendering");
    chances.innerHTML = `<br><h2>${nameofCITY}</h2></br> <br class="sunshinechance">Chance of Sunshine: ${sunshinechance}%</br> 
    <br class="rainchance">Chance of Rain: ${rainchance}%</br>;
    <br class="snowchance">Chance of Snow: ${snowchance}%</br>`;
  //**************************************************************** */
  
    //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER SUN
    let summerimg = "<img src='assets/icons8-summer.gif' >"
    let summerdiv = document.createElement("div")
  let sunchineelement = document.querySelector(".sunshinechance") 
  sunchineelement.before(summerdiv);
  
    if(sunshinechance>50){
      summerdiv.innerHTML = summerimg
   }
  //**************************************************************** */
  
     //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER SNOW
  
  let snowimg = "<img src='assets/icons8-light-snow.gif' >"
  let snowdiv = document.createElement("div")
  let snowelement = document.querySelector(".snowchance") 
  sunchineelement.before(snowdiv);
  
  if(snowchance>50){
      snowdiv.innerHTML = snowimg
   }
  //**************************************************************** */
  
      //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER RAIN
  
  let rainimg = "<img src='assets/icons8-torrential-rain.gif' >"
  let raindiv = document.createElement("div")
  let rainelement = document.querySelector(".rainchance") 
  sunchineelement.before(raindiv);
  
  if(rainchance>50){
      raindiv.innerHTML = rainimg
   }


 data.weather[0].hourly[1].maxtempF
 data.weather[0].hourly[1].mintempF
 data.weather[0].avgtempF



let table = document.querySelector("#rendTABLE")

table .innerHTML = `
<h3>Today</h3>
<div>Average Temperature :${data.weather[0].avgtempF}</div> 
<div>Maximum Temperature :${data.weather[0].maxtempF}</div> 
<div>Maximum Temperature :${data.weather[0].maxtempF}</div> 

<h3>Tomorrow</h3>
<div>Average Temperature :${data.weather[1].avgtempF}</div> 
<div>Maximum Temperature :${data.weather[1].maxtempF}</div> 
<div>Maximum Temperature :${data.weather[1].maxtempF}</div> 


<h3>Tomorrow</h3>
<div>Average Temperature :${data.weather[2].avgtempF}</div> 
<div>Maximum Temperature :${data.weather[2].maxtempF}</div> 
<div>Maximum Temperature :${data.weather[2].maxtempF}</div>
`

  //**************************************************************** */
  // let history = document.querySelector(".history")
  // let setclass = nameofCITY.replace(/\s+/g, '')
  // console.log(setclass)
  // // sessionStorage.setItem(`${setclass}`, "Dom")  
  // // window.history.pushState("","",`/${setclass}`);
  // // storageARRAY.push(document.body.innerHTML)
  // // let store = storageARRAY[storageARRAY.length-1]
  // // onclick="${sessionStorage[sessionStorage.length-1]}"
  // historyHTML.push(`<li onclick="clickable()" class="${setclass}"><a href="">Location: ${nameofCITY},</a> Temperature: ${currentCond[0].temp_F} ℉</li>`)
    // cityPREVIOUSsearches.push(nameofCITY)
  //****************************************************************
    // let formattedArrayHistory = historyHTML.join("")
    // console.log(formattedArrayHistory)
    // history.innerHTML = formattedArrayHistory
    //STORING SESSION BELOW
  // // set
  // var lastAccess = new Date().getTime();
  //     sessionStorage.setItem(`${setclass}`, lastAccess.toString());
  // console.log(storageunit)
  // let hiddenNoHistory = document.querySelector(".hidden");
  // hiddenNoHistory.style.display = "none"
  }).catch((error) => {
      
      console.log(error)
    }) 
  }


  function degreeConversion(event){
    event.preventDefault();
let degrees = document.getElementById("quantity").value
let computedValue = ""
if(document.getElementById('celsius').checked) {
let divide = (5/9);

computedValue = (((degrees)-32)*(divide)).toFixed(2);

let con = document.querySelector("#concomplete")
con.innerText = computedValue + " °F"
console.log(computedValue)

} //(32°F − 32) × 5/9 = 0°C

if(document.getElementById('Faren').checked) {
  computedValue=(degrees-32*(5/9)).toFixed(2)
  let con = document.querySelector("#concomplete")
  con.innerText = computedValue + " °C"
  console.log(computedValue + " °C")
}


  }
let conclick = document.querySelector("#convert")
conclick.addEventListener("submit",degreeConversion)
  
// function clickable(){
//   document.querySelector("body").innerHTML = storageunit
// // // set
// // var lastAccess = new Date().getTime();
// // if (sessionStorage)
// //     sessionStorage.setItem(`${x}`, lastAccess.toString());
// // retrieve in another page or on a refresh
//     //  return sessionStorage.getItem(`${x}`);
// }


// //  BELOW: cityHistorySearch STORES THE SEARCH VALUES INTO AN ARRAY
// let cityHistorySearch = []
// //BELOW: historyresults STORES THE REGION VALUES FROM EACH SEARCH INTO AN ARRAY
// let historyresults = []
// //BELOW: historyHTML STORES THE INNERHTML OF CREATED PAST SEARCHES
// let historyHTML = []
// //GIVES  AN ARRAY FOR EACH CITY LINK FROM THE FIRST SUBMISSION GOING FORWARD
// let linkhistory =[]
// //function to grab data from weather API according to user input
//  let cityPREVIOUSsearches = [] 
//  //holds all the functions that must be passed into click addevent listener
//  let fetchFunctionsARRAY = []





// //GETTING API URL FOR FETCH
// let city1 ="https://wttr.in/"
// let cityinput = cityHistorySearch[cityHistorySearch.length-1];
// let city3 = "?format=j1"
// let city = `${city1}${cityinput}${city3}`;

// let cityPREVIOUSsearchesINPUT = cityPREVIOUSsearches[cityPREVIOUSsearches.length-1];
// //**************************************************************** */

// // linkhistory.push(city)//linkhistory array will contain complete city search
// //SETS FORM ATTRIBUTE FOR PAGE RENAVIGATION FROM HISTORY
// // document.querySelector("form").setAttribute("action",`/${cityinput.replace(/\s+/g, '')}` )
// let formbutton = document.querySelector(".citybutton")
// let form = document.querySelector(".citySearch")

// formbutton.addEventListener("click",function(event){
//   event.preventDefault();
//   const sitesearch = document.querySelector('#site-search');
//       cityHistorySearch.push(sitesearch.value);   
//       //CODE ABOVE FOR SEARCHING CITIES
// //**************************************************************** */
// fetch(cityPREVIOUSsearchesINPUT)
// .then((response) => response.json()).then((data) => {
  
// //**************************************************************** */

// //BELOW: nameofCITY WILL GET THE REGION VALUES FROM EACH SEARCH and store it intoa variable
// let nameofCITY = data.nearest_area[0].region[0].value
// //HERE WE PUT THE REGION VALUES FROM EACH SEARCH INTO THE historyresults ARRAY
// historyresults.push(nameofCITY)
// //**************************************************************** */
// let currentCond = data.current_condition;
//   let sunshinechance = data.weather[0].hourly[0].chanceofsunshine
// let rainchance = data.weather[0].hourly[0].chanceofrain
//   let snowchance = data.weather[0].hourly[0].chanceofsnow
// //Making it part of the DOM
//   let chances = document.querySelector(".rendering");
//   chances.innerHTML = `<br><h2>${nameofCITY}</h2></br> <br class="sunshinechance">Chance of Sunshine: ${sunshinechance}%</br> 
//   <br class="rainchance">Chance of Rain: ${rainchance}%</br>;
//   <br class="snowchance">Chance of Snow: ${snowchance}%</br>`;
// //**************************************************************** */

//   //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER SUN
//   let summerimg = "<img src='assets/icons8-summer.gif' >"
//   let summerdiv = document.createElement("div")
// let sunchineelement = document.querySelector(".sunshinechance") 
// sunchineelement.before(summerdiv);

//   if(sunshinechance>50){
//     summerdiv.innerHTML = summerimg
//  }
// //**************************************************************** */

//    //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER SNOW

// let snowimg = "<img src='assets/icons8-light-snow.gif' >"
// let snowdiv = document.createElement("div")
// let snowelement = document.querySelector(".snowchance") 
// sunchineelement.before(snowdiv);

// if(snowchance>50){
//     snowdiv.innerHTML = snowimg
//  }
// //**************************************************************** */

//     //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER RAIN

// let rainimg = "<img src='assets/icons8-torrential-rain.gif' >"
// let raindiv = document.createElement("div")
// let rainelement = document.querySelector(".rainchance") 
// sunchineelement.before(raindiv);

// if(rainchance>50){
//     raindiv.innerHTML = rainimg
//  }
// //**************************************************************** */


// }).catch((error) => {
    
//     console.log(error)
//   }) 

// })









// // //**************************************************************** */
// // //BELOW: cityHistorySearch STORES THE SEARCH VALUES INTO AN ARRAY
// // let cityHistorySearch = []
// // //BELOW: historyresults STORES THE REGION VALUES FROM EACH SEARCH INTO AN ARRAY
// // let historyresults = []
// // //BELOW: historyHTML STORES THE INNERHTML OF CREATED PAST SEARCHES
// // let historyHTML = []
// // //GIVES  AN ARRAY FOR EACH CITY LINK FROM THE FIRST SUBMISSION GOING FORWARD
// // let linkhistory =[]
// // //function to grab data from weather API according to user input
// //  let cityPREVIOUSsearches = [] 
// //  //holds all the functions that must be passed into click addevent listener
// //  let fetchFunctionsARRAY = []

// // //**************************************************************** */
// // // BELOW IS THE citySEARCH() FUNCTION WITH THE FETCH PROMISE THAT WILL BE CALLED WHEN THE SEARCH BUTTON IS CLICKED
// // //**************************************************************** */
// // // /END OF CitySearch FUNCTION
// //    //CODE BELOW FOR SEARCHING CITIES WHEN BUTTON IS CLICKED
// //    const citySearch = document.querySelector(".citySearch")
// //    const buttonSearch = document.querySelector(".citybutton")
// //    buttonSearch.addEventListener("submit",function(event){
// // //**************************************************************** */
// // event.preventDefault();

// //     const sitesearch = document.querySelector('#site-search');
// //     cityHistorySearch.push(sitesearch.value);   
// //     //CODE ABOVE FOR SEARCHING CITIES

// // //**************************************************************** */
// // //GETTING API URL FOR FETCH
// //    let city1 ="https://wttr.in/"
// // let cityinput = cityHistorySearch[cityHistorySearch.length-1];
// // let city3 = "?format=j1"
// // let city = `${city1}${cityinput}${city3}`;

// // cityPREVIOUSsearches.push(city)
// // let cityPREVIOUSsearchesINPUT = cityPREVIOUSsearches[cityPREVIOUSsearches.length-1];
// // //**************************************************************** */

// // linkhistory.push(city)//linkhistory array will contain complete city search
// // //SETS FORM ATTRIBUTE FOR PAGE RENAVIGATION FROM HISTORY
// // // document.querySelector("form").setAttribute("action",`/${cityinput.replace(/\s+/g, '')}` )

// // //**************************************************************** */
// // fetch(cityPREVIOUSsearchesINPUT)
// // .then((response) => response.json()).then((data) => {
  
// // //**************************************************************** */

// // //BELOW: nameofCITY WILL GET THE REGION VALUES FROM EACH SEARCH and store it intoa variable
// // let nameofCITY = data.nearest_area[0].region[0].value
// // //HERE WE PUT THE REGION VALUES FROM EACH SEARCH INTO THE historyresults ARRAY
// // historyresults.push(nameofCITY)
// // //**************************************************************** */
// // let currentCond = data.current_condition;
// //   let sunshinechance = data.weather[0].hourly[0].chanceofsunshine
// // let rainchance = data.weather[0].hourly[0].chanceofrain
// //   let snowchance = data.weather[0].hourly[0].chanceofsnow
// // //Making it part of the DOM
// //   let chances = document.querySelector(".rendering");
// //   chances.innerHTML = `<br><h2>${nameofCITY}</h2></br> <br class="sunshinechance">Chance of Sunshine: ${sunshinechance}%</br> 
// //   <br class="rainchance">Chance of Rain: ${rainchance}%</br>;
// //   <br class="snowchance">Chance of Snow: ${snowchance}%</br>`;
// // //**************************************************************** */

// //   //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER SUN
// //   let summerimg = "<img src='assets/icons8-summer.gif' >"
// //   let summerdiv = document.createElement("div")
// // let sunchineelement = document.querySelector(".sunshinechance") 
// // sunchineelement.before(summerdiv);

// //   if(sunshinechance>50){
// //     summerdiv.innerHTML = summerimg
// //  }
// // //**************************************************************** */

// //    //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER SNOW

// // let snowimg = "<img src='assets/icons8-light-snow.gif' >"
// // let snowdiv = document.createElement("div")
// // let snowelement = document.querySelector(".snowchance") 
// // sunchineelement.before(snowdiv);

// // if(snowchance>50){
// //     snowdiv.innerHTML = snowimg
// //  }
// // //**************************************************************** */

// //     //RENDERING IMG OF SUMMER IF 50% Chance OR HIGHER RAIN

// // let rainimg = "<img src='assets/icons8-torrential-rain.gif' >"
// // let raindiv = document.createElement("div")
// // let rainelement = document.querySelector(".rainchance") 
// // sunchineelement.before(raindiv);

// // if(rainchance>50){
// //     raindiv.innerHTML = rainimg
// //  }
// // //**************************************************************** */
// // // THE BELOW CODE SHOULD RENDER PREVIOUS SEARCHES 
// // //**************************************************************** */

// //   let history = document.querySelector(".history")
// // let setclass = nameofCITY.replace(/\s+/g, '')
// // console.log(nameofCITY)
// // console.log(setclass)



// // // onclick="clickable('${setclass}')"

// //   historyHTML.push(`<li  class="${setclass}"><a href="/${setclass}">Location: ${nameofCITY},</a> Temperature: ${currentCond[0].temp_F} ℉</li>`)
// //   cityPREVIOUSsearches.push(nameofCITY)
// // //****************************************************************
// //   let formattedArrayHistory = historyHTML.join("")
// //   console.log(formattedArrayHistory)
// //   history.innerHTML = formattedArrayHistory
// //   //****************************************************************
// //   //ADDING EVENT LISTENER TO CLICK PREVIOUSSEARCH AND RENDER PAGE GRAVEYARD
// // //   //****************************************************************
// // // // document.getElementsByClassName(`.${nameofCITY}`)
// // // let allTagnames = getElementsByTagName("li")
// // //   //****************************************************************



// // // let doccurrent = document.querySelector("#theContainer")

// // // sessionStorage.setItem(`${setclass}`,JSON.stringify(doccurrent) )
// // //ERROR HANDLING

// //   }).catch((error) => {
    
// //   console.log(error)
// // }) 
// // //****************************************************************
 
// // })

// // //  //END OF CitySearch FUNCTION
// // //    //CODE BELOW FOR SEARCHING CITIES WHEN BUTTON IS CLICKED
// // //    const citySearch = document.querySelector(".citySearch")
// // //    const buttonSearch = document.querySelector(".citybutton")
// // //    buttonSearch.addEventListener("submit",citySEARCH())

 
// //    //code below is for searching cities
 

// //    console.log(cityHistorySearch)
// //  console.log(historyresults)
// // //****************************************************************
// // // TEMPERATURE CONVERSION
// // //****************************************************************
// // //Celsius from Farenheit Conversion: (32°F − 32) × 5/9 = 0°C
// // // let conversionSearch = document.querySelector(".site-degree")
// // const convertTRUE = document.querySelector('.convertTRUE')
// // let conversionSearch = document.querySelector("#site-degree")
// // function degreeConversion(event){
// //     event.preventDefault();
// //     let divide = (5/9);
  
// //  let computedValue = ((conversionSearch.value)-32)*(divide);

// //  convertTRUE.textContent = computedValue.toFixed(2);
// //  event.preventDefault();
// // }
// // //END OF CONVERT TEMPERATURE FUNCTION
// // //****************************************************************
// // //Code Below will Ad functionality for conversion using form and button
// // //****************************************************************
// // let submissionConvert = document.querySelector(".conversion")
// // submissionConvert.addEventListener("submit",degreeConversion)
// // //****************************************************************


// // //  function clickable(x){
// // //   cityHistorySearch.push(x)
  
// // //   }