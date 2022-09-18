const aside = document.querySelector("aside");
  const asideParagraph = document.querySelector("p");

  const textBox = document.querySelector("input[type='text']")
  const form = document.querySelector("form");
  
  const globalSearchArr = []

  const span = document.createElement("h2");
  span.textContent = "Choose a location to view the weather"

  document.querySelector("div .searchedLocations").prepend(span);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if(document.querySelector("#defaultMessage")){
      document.querySelector("#defaultMessage").remove()
      }
      getApi(textBox.value)
      textBox.value = "";
    })
    let temp = document.querySelector("#temp-to-convert");
    const submit = document.querySelector("aside form")
    submit.addEventListener("submit", (event) => {
        event.preventDefault();
        const number = document.querySelector("#conversion");
        const celsius = document.querySelector("#to-c")

        if(celsius.checked){
          number.textContent = (( temp.value - 32) * 5/9).toFixed(2);
      }
      else {
          number.textContent = (32 + (temp.value / (5/9))).toFixed(2);
      }
  })

  convertTemp(temp);
  function convertTemp(temperature){
  }
  async function getApi(keyword) {
    span.textContent = keyword;
    span.style = "text-transform: capitalize";
    document.querySelectorAll("main p").forEach(p => p.style.display = "")
    const fetchApi = await fetch(`https://wttr.in/${keyword}?format=j1`)
      const response = await fetchApi.json()
      console.log(response);
      let location = response.nearest_area[0].areaName[0].value;
      const main = document.querySelector("main");
      let region = response.nearest_area[0].region[0].value;
      let country = response.nearest_area[0].country[0].value;
      let currently = response.current_condition[0].FeelsLikeF;
      let sunshine = response.weather[0].hourly[0].chanceofsunshine;
      let rain = response.weather[0].hourly[0].chanceofrain;
      let snow = response.weather[0].hourly[0].chanceofsnow;
      document.querySelector("#area").innerHTML = location;

      document.querySelector("#region").innerText = region;

      document.querySelector("#country").innerText = country;

      document.querySelector("#currently").innerText = `Feels like ${currently}℉`;

      document.querySelector("#sunshine").innerText = sunshine;

      document.querySelector("#rain").innerText = rain;

      document.querySelector("#snow").innerText = snow;

      const img = document.querySelector("img");
      if(sunshine > 50){
          img.setAttribute("src","./assets/icons8-summer.gif")
          img.setAttribute("alt","sun") 
      }
      else if(rain > 50){
          img.setAttribute("src", "./assets/icons8-torrential-rain.gif")
          img.setAttribute("alt","rain")
      }
      else if(snow > 50){
          img.setAttribute("src", "./assets/icons8-light-snow.gif")
          img.setAttribute("alt","snow")
      }
      else {
          img.setAttribute("src","")
          img.setAttribute("alt","")
      }

      const tmp = response.weather.map(el => [el.hourly[0].FeelsLikeF,el.avgtempF,el.maxtempF,el.mintempF])

      document.querySelectorAll(".today span1").forEach((span, idx) => span.textContent = tmp[0][idx])
      document.querySelectorAll(".tomorrow span1").forEach((span, idx) => span.textContent = tmp[1][idx])
      document.querySelectorAll(".afterTomorrow span1").forEach((span,idx) => span.textContent = tmp[2][idx])

      const ul = document.querySelector("ul");

      let bool = false;
      const searches = document.querySelectorAll("ul li a");
      for(let search of searches){
          if(search.innerHTML === keyword){
             bool = true; 
          }
      }
      if(bool === false){
          ul.innerHTML+=`<li><a onclick="liOnClick('${keyword}')">${keyword}</a> - <span>${currently}</span>℉</li>`;
      }
  }


  function liOnClick(key) {
      getApi(key);
  }