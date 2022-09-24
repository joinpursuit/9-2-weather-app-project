const form =document.querySelector("#location-search")
const main=document.querySelector("main")
const weatherDisplay=document.querySelector("#weather-main")
const today=document.querySelector("#today")
const tommorow=document.querySelector("#tmmr")
const dayAfter=document.querySelector("#day-after")
form.addEventListener("submit",(event)=>{
    event.preventDefault()
const item=event.target.location.value
fetch(`http://wttr.in/${item}?format=j1`)
    .then((response)=>response.json())
    .then(response=>{
        console.log(response)
        const area=response.nearest_area[0].areaName[0].value
        const currentTemp= response.current_condition[0].FeelsLikeF
        const apiCountry=response.nearest_area[0].country[0].value
        const apiChanceR= response.weather[0].hourly[0].chanceofrain
        const apiChanceSs=response.weather[0].hourly[0].chanceofsunshine
        const apiChanceSnow=response.weather[0].hourly[0].chanceofsnow
        const apiRegion=response.nearest_area[0].region[0].value

        const maxTemp=response.weather[0].maxtempF
        const minTemp=response.weather[0].mintempF
        const avgTemp=response.weather[0].avgtempF

        const maxTemp2=response.weather[1].maxtempF
        const minTemp2=response.weather[1].mintempF
        const avgTemp2=response.weather[1].avgtempF

        const maxTemp3=response.weather[2].maxtempF
        const minTemp3=response.weather[2].mintempF
        const avgTemp3=response.weather[2].avgtempF

        weatherDisplay.innerHTML=`
        <h4>${item}</h4>
        <p><strong>Area:</strong>:${area}
        <p><strong>Region</strong>: ${apiRegion}</p>
        <p><strong>Country</strong>: ${apiCountry}</p>
        <p><strong>Currently</strong>: Feels Like ${currentTemp}</p>
        <p><strong>Chance of Sunshine</strong>: ${apiChanceSs}</p>
        <p><strong>Chance of Rain</strong>: ${apiChanceR}</p>
        <p><strong>Chance of Snow</strong>: ${apiChanceSnow}</p>
        
        `
        today.innerHTML=`
        <p>Average Temperature:</p>
                 <p>${avgTemp}°F<p>
         <p>Max Temperature:</p>
                 <p>${maxTemp}°F<p>
         <p>Min Temperature:</p>
                 <p>${minTemp}°F<p>
        
        `
        tommorow.innerHTML=
        `
        <p>Average Temperature:</p>
                 <p>${avgTemp2}<p>
        <p>Max Temperature:</p>
                <p>${maxTemp2}<p>
        <p>Min Temperature:</p>
                 <p>${minTemp2}<p>
        
        `
        dayAfter.innerHTML=
        `
        <p>Average Temperature:</p>
                 <p>${avgTemp3}<p>
        <p>Max Temperature:</p>
                 <p>${maxTemp3}<p>
        <p>Min Temperature:</p>
                <p>${minTemp3}<p>
        
        `
        //search lis
        const ul=document.querySelector("ul")
        const li=document.createElement("li")
        li.innerHTML=`<a href='#search'>${item} - ${currentTemp}</a>`
        ul.append(li)


        //temp converter
        const tempForm=document.querySelector('#temp-form')
        const celsius=document.querySelector("#to-c")
        const farenheit=document.querySelector("#to-f")
        
        const span = document.querySelector("#converted")
        console.log(farenheit)

tempForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    const temp=event.target.number.value
    if (farenheit.checked){
        span.textContent= "Approximately " +
        Math.floor(((temp)*(9/5))+32) + " degrees Farenheit."
    }
    if (celsius.checked){
        span.textContent= "Approximately " +
        Math.floor(((temp-32)*(5/9))) + " degrees Celsius."
    }

})
    })
})
