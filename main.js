const form =document.querySelector("form")

const main=document.querySelector("main")

const directions=document.querySelector(".directions")

const aside= document.querySelector("aside")


form.addEventListener("submit",(event)=>{
    // console.log(event.target.value)
    event.preventDefault()
// main.append(region)
// main.append(country)
// main.append(currently)
// main.append(cos)
// main.append(cor)
// main.append(coSnow)
directions.remove()
const ul=document.createElement("ul")
 aside.append(ul)

    const li=document.createElement("li")
    const item=event.target.location.value
    li.innerHTML=`<a href='#search'>${item}</a>`
    ul.append(li)
   
   li.setAttribute("style","padding:-20px")
    forecasts.setAttribute("style","display:grid")
    const tempConvert=document.querySelector('.temp-converter')
    tempConvert.setAttribute("style","display:grid")

    fetch(`http://wttr.in/${item}?format=j1`)
    .then((response)=>response.json())
    .then(response=>{
        const currentTemp= response.current_condition[0].temp_F
        const apiCountry=response.nearest_area[0].country[0].value
        const apiChanceR= response.weather[0].hourly[0].chanceofrain
        const apiChanceSs=response.weather[0].hourly[0].chanceofsunshine
        const apiChanceSnow=response.weather[0].hourly[0].chanceofsnow
        const apiRegion=response.nearest_area[0].areaName[0].value
        
        const region= document.createElement("p")
region.innerHTML=`<strong>Region:</strong> ${apiRegion}`

const country= document.createElement("p")
country.innerHTML=`<strong>Country:</strong> ${apiCountry}`

const currently= document.createElement("p")
currently.innerHTML=`<strong>Currently:</strong> ${currentTemp}°F`

const cos= document.createElement("p")
cos.innerHTML=`<strong>Chance of Sunshine:</strong> ${apiChanceSs}%`

const cor= document.createElement("p")
cor.innerHTML=`<strong>Chance of Rain:</strong> ${apiChanceR}%`

const coSnow= document.createElement("p")
coSnow.innerHTML=`<strong>Chance of Snow:</strong> ${apiChanceSnow}%`
    console.log(response)
    
    
        const maxTemp=response.weather[0].maxtempF
        const minTemp=response.weather[0].mintempF
        const avgTemp=response.weather[0].avgtempF

        const avgInfo=document.querySelector(".avg-info")
        avgInfo.textContent=avgTemp+"°F"

        const maxInfo=document.querySelector(".max-info")
        maxInfo.textContent=maxTemp+"°F"

        const minInfo=document.querySelector(".min-info")
        minInfo.textContent=minTemp+"°F"


            const maxTemp2=response.weather[1].maxtempF
        const minTemp2=response.weather[1].mintempF
        const avgTemp2=response.weather[1].avgtempF


        const avgInfo2=document.querySelector(".avg-info2")
        avgInfo2.textContent=avgTemp2+"°F"

        const maxInfo2=document.querySelector(".max-info2")
        maxInfo2.textContent=maxTemp2+"°F"

        const minInfo2=document.querySelector(".min-info2")
        minInfo2.textContent=minTemp2+"°F"
   

            const maxTemp3=response.weather[2].maxtempF
        const minTemp3=response.weather[2].mintempF
        const avgTemp3=response.weather[2].avgtempF


        const avgInfo3=document.querySelector(".avg-info3")
        avgInfo3.textContent=avgTemp3+"°F"

        const maxInfo3=document.querySelector(".max-info3")
        maxInfo3.textContent=maxTemp3+"°F"

        const minInfo3=document.querySelector(".min-info3")
        minInfo3.textContent=minTemp3+"°F"

    main.innerHTML=""
console.log("hello")
    main.append(region)
main.append(country)
main.append(currently)
main.append(cos)
main.append(cor)
main.append(coSnow)
    })
   


})
// const region= document.createElement("p")
// region.innerHTML="<strong>Region:</strong>"

// const country= document.createElement("p")
// country.innerHTML="<strong>Country:</strong>"

// const currently= document.createElement("p")
// currently.innerHTML="<strong>Currently:</strong>"

// const cos= document.createElement("p")
// cos.innerHTML="<strong>Chance of Sunshine:</strong>"

// const cor= document.createElement("p")
// cor.innerHTML="<strong>Chance of Rain:</strong>"

// const coSnow= document.createElement("p")
// coSnow.innerHTML="<strong>Chance of Snow:</strong>"

const forecasts=document.querySelector("div.forecasts")

//Temp coversion
const tempForm=document.querySelector('.temp-form')
const celsius=document.querySelector("#Celsius")
const farenheit=document.querySelector("#farenheit")

const span = document.querySelector("#converted")

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

fetch 

// const test = document.querySelector(".test")
// form.addEventListener("click",()=>{
//     main.append(region)
//     main.append(a)
//     main.append(b)
//     main.append(c)
//     main.append(d)
// directions.remove()
// })

/*// ask for help making numbers increment
 for (let li of ol){
    const li=document.createElement("li")
    li.textContent=event.target.location.value
    ol.append(li)
// }*/

// li.textContent=event.target.location.value for line 24