// EL OBJETIVO DE APLICACION ES OBTENER LA INFORMACION DEL CLIMA DE UNA CIUDAD DADA POR EL USUARIO

// 1-. Realizar el submit del formulario -- LISTO
// 2-. Capturar la CIUDAD seleccionada por el usuario ==> Obtener el valor del input de busqueda -- LISTO
// 3-. Realizar una peticion a la API de wttr.in para obtener la data del clima de la ciudad requerida (DADA POR EL USUARIO)
// 4-. Una vez obtenida la data, mostrar en el main-article la informacion del clima del dia de hoy
// 5-. Mostrar en el aside del main-container, la informacion del clima de los proximos 3 dias
// 6-. Mostrar en el aside del weather-history, los nombres de las ciudades que han sido buscadas

// Se encarga de seleccionar y manejar el icono que se debe mostrar en base al mayor radio de probabilidad
const calculateWeatherIcon = (hourlyWeather) => {
  let result 

  const keysToIconsMap = {
    chanceofsunshine: {
      name: 'Chance of Sunshine',
      alt: 'sun',
      value: './assets/icons8-summer.gif'
    },
    chanceofsnow: {
      name: 'Chance of Snow',
      alt: 'snow',
      value: './assets/icons8-light-snow.gif'
    },
    chanceofrain: {
      name: 'Chance of Rain',
      alt: 'rain',
      value: './assets/icons8-torrential-rain.gif'
    }
  }
  const weatherKeys = ['chanceofsunshine', 'chanceofsnow', 'chanceofrain']
  const weatherKeyData = weatherKeys.map(key => ({
    key,
    name: keysToIconsMap[key].name,
    ratio: hourlyWeather.reduce((acc, weather) => Number(acc) + Number(weather[key]), 0) / hourlyWeather.length
  }))

  for (keyData of weatherKeyData) {
    if (!result) {
      result = keyData
      continue
    } 

    if (keyData.ratio > result.ratio) {
      result = keyData
    }
  }

  return { icon: keysToIconsMap[result.key].value, alt: keysToIconsMap[result.key].alt, ratiosDataArr: weatherKeyData }
}

// Generamos la estructura del elemento HTML principal
const renderMainContent = (searchValue, nearestArea, region, country, feelsLikeF, hourlyData) => {
  const initMsgElement = document.querySelector('.init-msg')
  const { icon, alt, ratiosDataArr } = calculateWeatherIcon(hourlyData)


  if (initMsgElement) {
    initMsgElement.remove()
  }

  const weatherArticleElement = document.querySelector('.main-container__article')
  const weatherArticleHTML = 
  `
    <img src=${icon} alt=${alt} />
    <h2>${searchValue}</h2>
    <p><strong>Area: </strong> ${searchValue}</p>
    <p><strong>Nearest Area: </strong> ${nearestArea}</p>
    <p><strong>Region: </strong> ${region}</p>
    <p><strong>Country: </strong> ${country}</p>
    <p><strong>Currently: </strong> Feels Like ${feelsLikeF}°F </p>
    ${ratiosDataArr.map(ratioData => `<p><strong>${ratioData.name}: </strong> ${ratioData.ratio}</p> \n`).join(' ')}
  `
  weatherArticleElement.innerHTML = weatherArticleHTML  // Estamos agregando desde aqui todo esto a mi elemento en html que tiene la clase: ".main-container__article"
}

const renderForecastContent = (data) => {
  const incomingForecastElement = document.querySelector('.incoming-forecast')
  incomingForecastElement.innerHTML = ''
  
  data.weather.forEach((forecast, index) => {
    const daysNames = ['Today', 'Tomorrow', 'Day after tomorrow']
    const day = daysNames[index]

     // Creando el elemento
    const forecastCardElement = document.createElement('article')

    forecastCardElement.classList.add('forecast-card')

    // Definiendo el CONTENIDO del elemento
    const forecastCardHTML = 
    `
      <h4>${day}</h4>
      <p><strong>Average Temperature: </strong> ${forecast.avgtempF}</p>
      <p><strong>Max Temperature: </strong> ${forecast.maxtempF}</p>
      <p><strong>Min Temperature: </strong> ${forecast.mintempF}</p>
    `
    
    // INSERTANDO el contenido del elemento al elemento "article" como tal
    forecastCardElement.innerHTML = forecastCardHTML  // esto no es suficiente hay que anexarlo como hijo 

    // // INSERTANDO el elemento generado en el DOM----agregar el elemento al index en el elemento dado por la clase "incomingForecastElement"
    incomingForecastElement.appendChild(forecastCardElement)
  })
}

const renderPreviousSearches = (searchInputValue, feelsLikeF) => {
  const addingPreviousSearches = document.querySelector('.previous-searches')

  const alreadyExistsValue = addingPreviousSearches.querySelector(`#${searchInputValue}`)

  if (alreadyExistsValue) {
    return
  }

  const creatingLiElement= document.createElement('li') 
  //,<a> es para links..
  creatingLiElement.innerHTML = `<a href="#" id="${searchInputValue}">${searchInputValue}: Feels like ${feelsLikeF}F </a>`

  creatingLiElement.addEventListener('click', event => {
    event.preventDefault()

    fetch(`https://wttr.in/${searchInputValue}?format=j1`)
      .then(response => response.json())
      .then(data => {

        // Listando los diferentes campos a mostrar
        const nearestArea = data.nearest_area[0].areaName[0].value
        const country = data.nearest_area[0].country[0].value
        const region = data.nearest_area[0].region[0].value
        const feelsLikeF = data.current_condition[0].FeelsLikeF
        const hourlyData = data.weather[0].hourly

        // searchValue, nearestArea, region, country, feelsLikeF, hourlyData
        renderMainContent(searchInputValue, nearestArea, region, country, feelsLikeF, hourlyData)
        renderForecastContent(data)
      })
      .catch(err => console.log(err))
  })

  addingPreviousSearches.appendChild(creatingLiElement)

  const erasePreviousSearchesMsg = document.querySelector('.no-previous-searches')
  erasePreviousSearchesMsg.remove()
}

const searchFormElement = document.querySelector(".search-form")
searchFormElement.addEventListener('submit', (event) => {
  event.preventDefault()
  
  // Ciudad cuyo clima queremos obtener
  const searchInputElement = document.querySelector('#location')
  const searchInputValue = searchInputElement.value

  fetch(`https://wttr.in/${searchInputValue}?format=j1`)
    .then(response => response.json())
    .then(data => {

      // Listando los diferentes campos a mostrar
      const nearestArea = data.nearest_area[0].areaName[0].value
      const country = data.nearest_area[0].country[0].value
      const region = data.nearest_area[0].region[0].value
      const feelsLikeF = data.current_condition[0].FeelsLikeF
      const hourlyData = data.weather[0].hourly


      // Ocultar el mensaje de inicializacion.
      renderMainContent(searchInputValue, nearestArea, region, country, feelsLikeF, hourlyData)
      renderForecastContent(data)
      renderPreviousSearches(searchInputValue, feelsLikeF)
      

    })
    .catch(err => console.log(err))

    searchInputElement.value = ''
})

// CALCULATOR FORM ====> REVISAR
const calculatorFormElement = document.querySelector('.calculator-form')

calculatorFormElement.addEventListener('submit', (event) => {
  event.preventDefault()
  let result

  const tempResultElement = document.querySelector('#convert-temp-result')
  const tempToConvertInput = document.querySelector('#temp-to-convert')
  const conversionType = document.querySelector('input[name="convert-temp"]:checked').value

  const tempToConvertValue = tempToConvertInput.value

  if (conversionType === 'c') {
    result = (tempToConvertValue - 32) * (5/9)
  } else {
    result = (tempToConvertValue * 9/5) + 32
  }

  tempResultElement.textContent = result.toFixed(2)

  tempToConvertInput.value = ''
})

