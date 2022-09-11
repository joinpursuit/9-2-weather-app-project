const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //targeting the user's input using  the form's element properties DOM
  const location = form.elements.location.value;
  console.log(location);
  form.elements.location.value = "";

  fetch(`https://wttr.in/${location}?format=j1`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      //main section area,region,country
      const unicode = "\u00B0";
      let area = data.nearest_area[0].areaName[0].value;
      let region = data.nearest_area[0].region[0].value;
      let country = data.nearest_area[0].country[0].value;
      let currently = data.current_condition[0].FeelsLikeF;

      const weatherDetails = document.querySelector("main");
      weatherDetails.textContent = "";

      const areaHeading = document.createElement("h3");
      areaHeading.textContent = `${area}`;
      areaHeading.style.textAlign = "center";
      weatherDetails.prepend(areaHeading);

      const areaP = document.createElement("p");
      areaP.style.textAlign = "center";
      areaP.textContent = `Area: ${location}`;
      weatherDetails.append(areaP);

      const regionP = document.createElement("p");
      regionP.textContent = `Region: ${region}`;
      weatherDetails.append(regionP);

      const countryP = document.createElement("p");
      countryP.textContent = `Country: ${country}`;
      weatherDetails.append(countryP);

      const currentTempatureP = document.createElement("p");
      currentTempatureP.textContent = `Currently: Feels Like ${currently}${unicode}`;
      weatherDetails.append(currentTempatureP);

      //sidebar
      const previousSearches = document.querySelector("ul");

      const nonPrevious = document.querySelector(".non");
      nonPrevious.innerHTML = "";

      const newLi = document.createElement("li");
      previousSearches.append(newLi);
      newLi.textContent = ` - ${currently}${unicode}`;

      const a = document.createElement("a");
      a.textContent = `${location}`;
      a.href = "#";
      newLi.prepend(a);

      // a.addEventListener('click', (event) => {
      //   event.preventDefault();
      //   if(a.onclick) {
      //     event.preventDefault();
      //     weatherDetails.textContent = ""
      //     areaHeading.textContent = `${a.textContent}`;
      //     areaP.textContent = `${a.textContent}`;
      //     regionP.textContent = `${region.textContent}`;
      //     countryP.textContent = `${country.textContent}`;
      //     currently.textContent = `${currently.textContent}${unicode}`
      //     }

      //     if(a.onclick.length) {
      //       //
      //     }
      // })
      //three day
      const body = document.querySelector("body");

      const today = document.querySelector(".today");
      today.style.display = "grid";

      body.append(today);

      const avgTemp = data.weather[0].avgtempF;
      const highTemp = data.weather[0].maxtempF;
      const minTemp = data.weather[0].mintempF;

      const todayTempature = document.createElement("p");
      todayTempature.innerHTML = `Average Tempature: ${avgTemp}${unicode}`;
      today.append(todayTempature);

      const tempMaxed = document.createElement("p");
      tempMaxed.innerHTML = `Max Tempature: ${highTemp}${unicode}`;
      today.append(tempMaxed);

      const tempMin = document.createElement("p");
      tempMin.innerHTML = `Min Tempature: ${minTemp}${unicode}`;
      today.append(tempMin);

      const avgTemp1 = data.weather[1].avgtempF;
      const highTemp1 = data.weather[1].maxtempF;
      const minTemp1 = data.weather[1].mintempF;

      const tomorrow = document.querySelector(".tomorrow");

      const tomorrowTempature = document.createElement("p");
      tomorrowTempature.innerHTML = `Average Tempature: ${avgTemp1}${unicode}`;
      tomorrow.append(tomorrowTempature);

      const tomorrowMaxed = document.createElement("p");
      tomorrowMaxed.innerHTML = `Max Tempature: ${highTemp1}${unicode}`;
      tomorrow.append(tempMaxed);

      const tomorrowMin = document.createElement("p");
      tomorrowMin.innerHTML = `Min Tempature: ${minTemp1}${unicode}`;
      tomorrow.append(tomorrowMin);

      const avgTemp2 = data.weather[2].avgtempF;
      const highTemp2 = data.weather[2].maxtempF;
      const minTemp2 = data.weather[2].mintempF;

      const dayAfter = document.querySelector(".dayafter");

      const dayAfterAvg = document.createElement("p");
      dayAfterAvg.innerHTML = `Average Tempature: ${avgTemp2}${unicode}`;
      dayAfter.append(dayAfterAvg);

      const dayAfterMax = document.createElement("p");
      dayAfterMax.innerHTML = `Max Tempature: ${highTemp2}${unicode}`;
      dayAfter.append(dayAfterMax);

      const dayAfterMin = document.createElement("p");
      dayAfterMin.innerHTML = `Min Tempature: ${minTemp2}${unicode}`;
      dayAfter.append(dayAfterMin);

      const convert = document.querySelectorAll("form")[1];
      convert.addEventListener("submit", (event) => {
        event.preventDefault();
        const userNumber = form.elements.location.value;

        //  const radioF = document.querySelector("#to-f")
        //  const radioC = document.querySelector("#to-c")
        //   const button = document.querySelector("#convert")
        //   button.addEventListener("submit", (event) => {
        //     event.preventDefault()
        //      if(radioF.onclick) {
        //       let fResult = userNumber * (9/5) + 32  //equation for fahreneit
        //       const number = document.createElement("p")
        //       number.innerHTML = fResult;
        //       button.append(fResult);
        //      }
        //     })
      });
    });

  function clickLink(a) {
    a.document.querySelector("a")
    a.addEventListener("click", (event) => {
      a.
    })
  }
  let convertingTemp = document.querySelector("aside form")
   convertingTemp.addEventListener("submit", (event) => {
   event.preventDefault()
  let userInputTemp = parseInt(event.target.querySelector("input").value)
  let tempTypes = event.target.querySelectorAll(".converting-temp")
  let type = ""
  for (let tempType of tempTypes) {
  if (tempType.checked) {
  type = tempType.value
  break
  }
  }
  if (type === "c") {
  event.target.querySelector("h4").textContent = ((userInputTemp - 32) * 5/9).toFixed(2)
  }
  else if (type === "f") {
  event.target.querySelector("h4").textContent = (userInputTemp * 9/5 + 32).toFixed(2)
  }
});
