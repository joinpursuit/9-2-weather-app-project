


// various selectors for the results section
const form = document.querySelector("form")
const inputVal = document.querySelector(`#cityinput`)
const btn = document.querySelector(`#add`)
const city = document.querySelector(`#cityOutput`)
const area = document.querySelector(`#area`)
const region = document.querySelector(`#region`)
const country = document.querySelector(`#country`)
const feelsLike = document.querySelector(`#feelsLike`)


// Convert Temperature
function convertTemp(val){
    return (val - 273).toFixed(2)
}

// Listens for the click even on the button to submit the form
  form.addEventListener("submit", (event) => {

    // stops the form from refreshing on submit
event.preventDefault();
  
// const location = document.querySelector("#cityinput")

// api 
    fetch(`http://wttr.in/${location}?format=j1`)
    .then((response) => response.json())
    .then(mainData).catch((error) => {
        console.log(error)
    })
  })

  function mainData(json){

    const location = document.querySelector("#cityinput");
    console.log(json)
    const nearest = json.nearest_area
    const temp = json.current_condition
    const weather = json.weather
  // loop to send values to elements in article class 'current weather'

city.innerHTML = location.value
area.innerHTML = `<strong>Area: </strong>${nearest[0].areaName[0].value}`
region.innerHTML = `<strong>Region: </strong>${nearest[0].region[0].value}`
country.innerHTML  = `<strong>Country: </strong>${nearest[0].country[0].value}`
feelsLike.innerHTML = `<strong>Currently: </strong>${temp[0].FeelsLikeF}`

const todaysTemp = document.querySelector(".todays-temp")
const tomorrowsTemp = document.querySelector(".tomorrows-temp")
const dayAfterTemp = document.querySelector(".day-after-temp")

// todaysTemp.innerHTML = `
// <h3>Today</h3>

// <strong>Average Temperature:</strong> ${weather.avgtempF}

// <strong>Max Temperature:</strong> ${weather.maxtempF}

// <strong>Min Temperature:</strong> ${weather.mintempF}

// `



for(let i = 0; i < 3; i ++) {
    const savedTemps = `
    <strong>Average Temperature:</strong> ${weather[i].avgtempF}
        <strong>Max Temperature:</strong> ${weather[i].maxtempF}
         <strong>Min Temperature:</strong> ${weather[i].mintempF}
         `    
    if (i === 0) {
        todaysTemp.innerHTML = '<h3>Today</h3>' + savedTemps
    }  
    if (i === 1){
        tomorrowsTemp.innerHTML = "<h3>Tomorrow</h3>" + savedTemps
    } 
    else if (i === 2){
        dayAfterTemp.innerHTML = "<h3>Day After Tomorrow</h3>" + savedTemps
    }
   
  

}




}

  const pastSearches = [
    
  ]


  
  
