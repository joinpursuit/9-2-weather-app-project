
const form =document.querySelector("#location-search")
const main=document.querySelector("main")
const weatherDisplay=document.querySelector("#weather-main")
const today=document.querySelector("#today")
const tommorow=document.querySelector("#tmmr")
const dayAfter=document.querySelector("#day-after")
const choose=document.querySelector("#choose-option")
const searchDefault=document.querySelector("#search-option")
const forecast= document.querySelector("#weather-forecast")


form.addEventListener("submit",(event)=>{
    event.preventDefault()
    choose.remove()
    searchDefault.remove()
const item=event.target.location.value
event.target.location.value=""
weatherDisplay.setAttribute("style","background-color:white; border: 2px solid  #5946b2; ")
forecast.setAttribute("style","display:grid")


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
        <h2>${item}</h2>
        <p><strong>Area</strong>: ${area}</p>
        <p><strong>Region</strong>: ${apiRegion}</p>
        <p><strong>Country</strong>: ${apiCountry}</p>
        <p><strong>Currently</strong>: Feels Like ${currentTemp}</p>
        <p><strong>Chance of Sunshine</strong>: ${apiChanceSs}</p>
        <p><strong>Chance of Rain</strong>: ${apiChanceR}</p>
        <p><strong>Chance of Snow</strong>: ${apiChanceSnow}</p>
        
        `

        if(item!==area){
            // const nearest=document.createElement("p")
            // const near=response.nearest_area[0].areaName[0].value
            // nearest.innerHTML=`<strong>Nearest Area</strong>:${near} `

            weatherDisplay.innerHTML=`
        <h2>${item}</h2>
        <p><strong>Nearest Area</strong>: ${area}</p>
        <p><strong>Region</strong>: ${apiRegion}</p>
        <p><strong>Country</strong>: ${apiCountry}</p>
        <p><strong>Currently</strong>: Feels Like ${currentTemp}</p>
        <p><strong>Chance of Sunshine</strong>: ${apiChanceSs}</p>
        <p><strong>Chance of Rain</strong>: ${apiChanceR}</p>
        <p><strong>Chance of Snow</strong>: ${apiChanceSnow}</p>
        
        `
        }




        today.innerHTML=`
        <p><strong>Average Temperature</strong>:</p>
                 <p>${avgTemp}°F<p>
         <p><strong>Max Temperature</strong>:</p>
                 <p>${maxTemp}°F<p>
         <p><strong>Min Temperature</strong>:</p>
                 <p>${minTemp}°F<p>
        
        `
        tommorow.innerHTML=
        `
        <p><strong>Average Temperature</strong>:</p>
                 <p>${avgTemp2}°F<p>
        <p><strong>Max Temperature</strong>:</p>
                <p>${maxTemp2}°F<p>
        <p><strong>Min Temperature</strong>:</p>
                 <p>${minTemp2}°F<p>
        
        `
        dayAfter.innerHTML=
        `
        <p><strong>Average Temperature</strong>:</p>
                 <p>${avgTemp3}°F<p>
        <p><strong>Max Temperature</strong>:</p>
                 <p>${maxTemp3}°F<p>
        <p><strong>Min Temperature</strong>:</p>
                <p>${minTemp3}°F<p>
        
        `


        if (apiChanceSs>50){
            const sunnyPic=document.createElement("img")
            sunnyPic.setAttribute("src","./assets/icons8-summer.gif")
            sunnyPic.setAttribute("alt","sun")
           weatherDisplay.prepend(sunnyPic)
        }
        if (apiChanceR>50){
            const rainyPic=document.createElement("img")
            rainyPic.setAttribute("src","./assets/icons8-torrential-rain.gif")
            rainyPic.setAttribute("alt","rain")
           weatherDisplay.prepend(rainyPic)
        }

        if (apiChanceSnow>50){
            const snowyPic=document.createElement("img")
            snowyPic.setAttribute("src","./assets/icons8-light-snow.gif")
            snowyPic.setAttribute("alt","snow")
           weatherDisplay.prepend(snowyPic)
        }

        //search lis
        const ul=document.querySelector("ul")
        const li=document.createElement("li")
        li.innerHTML=`<a href='#search'>${item} - ${currentTemp}</a>`
        ul.append(li)


        //temp converter
        
    })
})
const tempForm=document.querySelector('#temp-form')
const celsius=document.querySelector("#to-c")
const farenheit=document.querySelector("#to-f")

const span = document.querySelector("#converted")
console.log(farenheit)

tempForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    
    const temp=event.target.number.value
    if (farenheit.checked){
        const fan=(((temp)*(9/5))+32).toFixed()
        span.innerHTML= `<h4>
        ${fan}</h4> `
    }
    if (celsius.checked){
        const can=(((temp-32)*(5/9)).toFixed(2))
        span.innerHTML= `<h4>${can}</h4>
        `
    }

})