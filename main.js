/* Add event listener to search bar */
const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    // Create 3 sections below main section to show information for the next few days
    // add link to the search to the sidebar (ul -> li)
    event.preventDefault();
    const base_url = "https://wttr.in/"
    const format = "?format=j1"
    const city = event.target.search.value; // to get value inputted
    console.log(city)
    fetch(base_url + city + format)
        .then(response => response.json())
        // Now population main -> article with info
        .then(weatherInfo => {
            const h2 = document.createElement("h2");
            const p1 = document.createElement("p");
            const p2 = document.createElement("p");
            const p3 = document.createElement("p");
            const p4 = document.createElement("p");
            const mainArticle = document.querySelector("main article");
            console.log(weatherInfo.nearest_area)
            const areaName = weatherInfo.nearest_area[0].areaName[0].value;
            h2.innerText = areaName;
            p1.innerHTML = "<strong>Area: </strong>" + areaName;
            const region = weatherInfo.nearest_area[0].region[0].value;
            p2.innerHTML = "<strong>Region: </strong>" + region;
            mainArticle.append(h2, p1, p2, p3, p4);
            const country = weatherInfo.nearest_area[0].country[0].value;
            p3.innerHTML = "<strong>Country: </strong>" + country;
            const feelsLikeF = weatherInfo.current_condition[0].FeelsLikeF;
            p4.innerHTML = "<strong>Currently:</strong> Feels Like " + feelsLikeF + "degF";

            // Add 3 article elements under main aside to get today, tomorrow, etc data
            const article1 = document.createElement("article");
            const article2 = document.createElement("article");
            const article3 = document.createElement("article");
            function addDaysInfo(article, dayName, dayNum) {
                const h3 = document.createElement("h3")
                h3.innerText = dayName;
                const p5 = document.createElement("p");
                const p6 = document.createElement("p");
                const p7 = document.createElement("p");

                const avgTemp = weatherInfo.weather[dayNum].avgtempF;
                p5.innerHTML = "<strong>Average Temperature: </strong>" + avgTemp + "degF";
                const maxTemp = weatherInfo.weather[dayNum].maxtempF;
                p6.innerHTML = "<strong>Average Temperature: </strong>" + maxTemp + "degF";
                const minTemp = weatherInfo.weather[dayNum].mintempF;
                p7.innerHTML = "<strong>Average Temperature: </strong>" + minTemp + "degF";

                article.append(h3, p5, p6, p7);
                // append article to main aside
                const mainAside = document.querySelector("main aside");
                mainAside.append(article)

            }
            // do for reach to increment 0 to 1 to 2 for each different day
            addDaysInfo(article1, "Today", 0)
            addDaysInfo(article2, "Tomorrow", 1)
            addDaysInfo(article3, "Day After Tomorrow", 2)

            // add to previous searches list
            const previousSearchList = document.querySelector(".previous-searches")
            const newLi = document.createElement("li")
            previousSearchList.append(newLi)
            newLi.innerText = `${areaName} - ${feelsLikeF} degF`
            const a = document.createElement("a")
            a.setAttribute("href", base_url + city + format) // what is meant by link to the search?
        })
        .catch(console.log)
}) 