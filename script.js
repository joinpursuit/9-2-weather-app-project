const BASE_URL = "https://wttr.in/";
const form = document.querySelector("form");
const right = document.querySelector(".right-history");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.reset();
  const location = e.target.location.value;
  const url = generateURL(BASE_URL, location);
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const { area, region, country } = getGeoInfo(data.nearest_area[0]);
      console.log(area, region, country);
      let feelsLikeF =
        "Feels like " + data.current_condition[0]["FeelsLikeF"] + " &deg;F";
      let p = document.createElement("p");
      p.innerHTML = feelsLikeF;
      right.append(p);
      console.log(feelsLikeF);
    })
    .catch(console.log);
});

function generateURL(base, location) {
  location = location.trim();
  location = location.replaceAll(" ", "+");
  return (base += location + "?format=j1");
}

function getGeoInfo(obj) {
  const area = obj.areaName[0].value;
  const region = obj.region[0].value;
  const country = obj.country[0].value;
  return { area, region, country };
}
