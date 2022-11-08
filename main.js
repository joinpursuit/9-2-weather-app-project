

let cityHistorySearch = []
let formattedhistorysearch = []
let historyresults = []
let historyHTML = []
let storageARRAY = []




function run(event){
    
    event.preventDefault()
    const sitesearch = document.querySelector('#textsearch');
        cityHistorySearch.push(sitesearch.value.replace(/\s+/g, ''));
    let city1 ="https://wttr.in/"
let cityinput = cityHistorySearch[cityHistorySearch.length-1];
let city3 = "?format=j1"
let city = `${city1}${cityinput}${city3}`;
    fetch(city)
    .then((response) => response.json()).then((data) => {

//EXAM:INE CODE
    // sitesearch.value.reset()


  //BELOW: nameofCITY WILL GET THE REGION VALUES FROM EACH SEARCH and store it intoa variable
  let nameofCITY = data.nearest_area[0].areaName[0].value;
  let nameofCITYregion = data.nearest_area[0].areaName[0].value;
  let country = data.nearest_area[0].country[0].value;
   let curweth = data.weather[0].hourly[7].FeelsLikeF;
   let regional = data.nearest_area[0].region[0].value;
  //HERE WE PUT THE REGION VALUES FROM EACH SEARCH INTO THE historyresults ARRAY
  // historyresults.push(nameofCITY)
  
  //WE CREATE A SESSION STORAGE
  
let s = ""
if(nameofCITYregion.toLowerCase() === cityinput){
    s=`<div>Area: ${nameofCITYregion}</div>`;
console.log(cityinput);
    console.log(nameofCITYregion);
}
else{s=`<div>Nearest Area:${nameofCITYregion}</div>`
console.log(cityinput);
    console.log(nameofCITYregion);}

// let rrendercity = cityinput.charAt(0).toUpperCase + cityinput.split(1);
// let rrendercity =
// console.log(rrendercity)
  //**************************************************************** */
  let currentCond = data.current_condition;
    let sunshinechance = data.weather[0].hourly[0].chanceofsunshine
  let rainchance = data.weather[0].hourly[0].chanceofrain
    let snowchance = data.weather[0].hourly[0].chanceofsnow
  //Making it part of the DOM
    let chances = document.getElementById("currentweather");
    chances.innerHTML = `<br><h2>${cityinput}</h2> 
    <br> ${s}
    <br> <div> Region: ${regional}</div> 
     <br><div>Country:${country}</div><br><div>Current Weather: Feels Like ${curweth}°F</div> <div class="sunshinechance">Chance of Sunshine: ${sunshinechance}%</div>
    <br> <div class="rainchance">Chance of Rain: ${rainchance}%</div> <br>
    <div class="snowchance">Chance of Snow: ${snowchance}%</div>`
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


//EXAMINE CODE






        let div5 = document.querySelector(".div5")
        let div6 = document.querySelector(".div6")
        
        let div7 = document.querySelector(".div7")
        
        
        div5.innerHTML = `<h3>Today</h3>
        <div>Average Temperature :${data.weather[0].avgtempF}°F</div> 
        <div>Maximum Temperature :${data.weather[0].maxtempF}°F</div> 
        <div>Minimum Temperature :${data.weather[0].mintempF}°F</div> `
        
        div6.innerHTML=`<h3>Tomorrow</h3>
        <div>Average Temperature :${data.weather[1].avgtempF}°F</div> 
        <div>Maximum Temperature :${data.weather[1].maxtempF}°F</div> 
        <div>Minimum Temperature :${data.weather[1].mintempF}°F</div> `
        
        
        div7.innerHTML=`<h3>Tomorrow</h3>
        <div>Average Temperature :${data.weather[2].avgtempF}°F</div> 
        <div>Maximum Temperature :${data.weather[2].maxtempF}°F</div> 
        <div>Minimum Temperature :${data.weather[2].mintempF}°F</div>`



        sitesearch.value=""

let rendamain = function rendamain(){
//     let main7 = document.querySelector("main")
//    let localS =  localStorage.setItem('url', JSON.stringify(`${main7.innerHTML}`));
// let maininnergen = localStorage.getItem(JSON.parse("url"))
// htmlContents.style.display="none"
// let dev = document.createElement("div");
// main7.before(dev)
// dev.innerHTML = maininnergen
// // main7.innerHTML = maininnergen

console.log(localS)
}



// var htmlContents = document.documentElement.innerHTML;
// localStorage.setItem(`${cityHistorySearch[cityHistorySearch.length-1]}`, JSON.stringify(htmlContents ));

let previous = document.querySelector("#weatherhistory section p")

// // let pagelink = document.getElementById("pagelinka")
// // console.log(pagelink)
// // pagelink.setAttribute("href",`${cityHistorySearch[cityHistorySearch.length-1]}`)
let setclass = nameofCITY.replace(/\s+/g, '')

previous.innerHTML += `<div onclick="clickable('${cityinput}')" id="${cityinput}">${setclass}, ${curweth}</div>`

// let loadURL3 = document.getElementById(`${cityinput}`);

// loadURL3.addEventListener("click",rendamain);
document.querySelector(".hidden").style.display="none"
// console.log(window.location.search)

    }).catch((error) => {
    
        console.log(error)
      })


}




let form = document.querySelector("form")
form.addEventListener("submit",run)




previous = ""






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
  let nameofCITY = data.nearest_area[0].areaName[0].value;
  let nameofCITYregion = data.nearest_area[0].areaName[0].value;
  let country = data.nearest_area[0].country[0].value;
   let curweth = data.weather[0].hourly[7].FeelsLikeF;
   let regional = data.nearest_area[0].region[0].value;

   console.log(regional)
  //HERE WE PUT THE REGION VALUES FROM EACH SEARCH INTO THE historyresults ARRAY
  // historyresults.push(nameofCITY)
  
  //WE CREATE A SESSION STORAGE
  let s = ""
if(nameofCITYregion.toLowerCase() === cityinput){
    s=`<div>Area: ${nameofCITYregion}</div>`;
console.log(cityinput);
    console.log(nameofCITYregion);
}
else{s=`<div>Nearest Area:${nameofCITYregion}</div>`
console.log(cityinput);
    console.log(nameofCITYregion);}
  //**************************************************************** */
  let currentCond = data.current_condition;
    let sunshinechance = data.weather[0].hourly[0].chanceofsunshine
  let rainchance = data.weather[0].hourly[0].chanceofrain
    let snowchance = data.weather[0].hourly[0].chanceofsnow
  //Making it part of the DOM
    let chances = document.getElementById("currentweather");
    chances.innerHTML = `<br><h2>${cityinput}</h2> 
    <br> ${s}
    <br> <div> Region: ${nameofCITY}</div> 
     <br><div>Country:${country}</div><br><div>Current Weather: Feels Like ${curweth}°F</div> <div class="sunshinechance">Chance of Sunshine: ${sunshinechance}%</div>
    <br> <div class="rainchance">Chance of Rain: ${rainchance}%</div> <br>
    <div class="snowchance">Chance of Snow: ${snowchance}%</div>`
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


//EXAMINE CODE






        let div5 = document.querySelector(".div5")
        let div6 = document.querySelector(".div6")
        
        let div7 = document.querySelector(".div7")
        
        
        div5.innerHTML = `<h3>Today</h3>
        <div>Average Temperature :${data.weather[0].avgtempF}°F</div> 
        <div>Maximum Temperature :${data.weather[0].maxtempF}°F</div> 
        <div>Minimum Temperature :${data.weather[0].mintempF}°F</div> `
        
        div6.innerHTML=`<h3>Tomorrow</h3>
        <div>Average Temperature :${data.weather[1].avgtempF}°F</div> 
        <div>Maximum Temperature :${data.weather[1].maxtempF}°F</div> 
        <div>Minimum Temperature :${data.weather[1].mintempF}°F</div> `
        
        
        div7.innerHTML=`<h3>Tomorrow</h3>
        <div>Average Temperature :${data.weather[2].avgtempF}°F</div> 
        <div>Maximum Temperature :${data.weather[2].maxtempF}°F</div> 
        <div>Minimum Temperature :${data.weather[2].mintempF}°F</div>`


        sitesearch.value=""
// 
// 
// 
// 


}).catch((error) => {
    
    console.log(error)
  })

}















// //////////////////////////////CONVERIOSN TEM

document.createElement
function degreeConversion(event){
    event.preventDefault();
let degrees = document.getElementById("quantity").value
let computedValue = ""
//(0°C × 9/5) + 32 = 32°F

if(document.getElementById('celsius').checked) {
let divide = (5/9);

computedValue = (((degrees)*9/5)+32).toFixed(2);

let con = document.querySelector("#concomplete")
con.innerText = computedValue + " °F"
console.log(computedValue)

} 
//(32°F − 32) × 5/9 = 0°C
if(document.getElementById('Faren').checked) {
  computedValue=(((degrees-32)*5)/9).toFixed(2)
  let con = document.querySelector("#concomplete")
  con.innerText = computedValue + " °C"
  console.log(computedValue + " °C")
}


  }


let conclick = document.querySelector("#convert")
conclick.addEventListener("submit",degreeConversion);



for (let i=0;i<cityHistorySearch.length;i++){
let clicker = document.querySelector(`${cityHistorySearch[i]}`)

    clicker.addEventListener("click",rendamain)
}